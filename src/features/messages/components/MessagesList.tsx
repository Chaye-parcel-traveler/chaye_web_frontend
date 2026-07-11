import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getStoredMember, onAuthChange } from '../../auth/api/auth.api';
import { getMember } from '../../members/api/members.api';
import type { MemberIdentity } from '../../members/api/member.types';
import { getDiscussions } from '../api/messages.api';
import type { TchatDiscussion, TchatMessage } from '../api/messages.types';
import {
  getPeerProfileFromDiscussion,
  normalizeMemberIdentity,
} from './tchatIdentity';

type DiscussionPreview = {
  discussion: TchatDiscussion;
  lastMessage: TchatMessage | null;
  peerId: number;
  peerProfile: MemberIdentity | null;
};

const MessagesList = () => {
  const navigate = useNavigate();
  const [currentMember, setCurrentMember] = useState(() => getStoredMember());
  const [previews, setPreviews] = useState<DiscussionPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadDiscussions = useCallback(
    async ({ showLoading = false } = {}) => {
      if (!currentMember) {
        navigate('/login');
        return;
      }

      if (showLoading) {
        setIsLoading(true);
      }

      setErrorMessage('');

      try {
        const discussions = await getDiscussions();
        const nextPreviews = await Promise.all(
          discussions.map(async (discussion) => {
            const peerId = getPeerId(discussion, currentMember.id);
            const discussionPeerProfile = getPeerProfileFromDiscussion(
              discussion,
              currentMember.id,
            );
            const fetchedPeerProfile = discussionPeerProfile
              ? null
              : await getMember(peerId)
                  .then((member) => normalizeMemberIdentity(member))
                  .catch(() => null);

            return {
              discussion,
              lastMessage: discussion.lastMessage ?? null,
              peerId,
              peerProfile: discussionPeerProfile ?? fetchedPeerProfile,
            };
          }),
        );

        setPreviews(nextPreviews);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Impossible de charger les discussions.',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [currentMember, navigate],
  );

  useEffect(() => {
    if (!currentMember) {
      navigate('/login');
      return;
    }

    void loadDiscussions({ showLoading: true });
  }, [currentMember, loadDiscussions, navigate]);

  useEffect(() => onAuthChange(() => setCurrentMember(getStoredMember())), []);

  useEffect(() => {
    const refreshVisibleMessages = () => {
      if (document.visibilityState === 'visible') {
        void loadDiscussions();
      }
    };

    window.addEventListener('focus', refreshVisibleMessages);
    document.addEventListener('visibilitychange', refreshVisibleMessages);

    return () => {
      window.removeEventListener('focus', refreshVisibleMessages);
      document.removeEventListener('visibilitychange', refreshVisibleMessages);
    };
  }, [loadDiscussions]);

  return (
    <Page className="container">
      <SearchBar aria-label="Recherche">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Rechercher" />
      </SearchBar>

      <ContentGrid>
        <MessagesPanel>
          <PanelHeader>
            <h2>Mes messages</h2>
            <Link to="/profil">Mon compte</Link>
          </PanelHeader>

          {isLoading ? (
            <Feedback>Chargement des discussions...</Feedback>
          ) : null}
          {errorMessage ? <Feedback>{errorMessage}</Feedback> : null}
          {!isLoading && previews.length === 0 ? (
            <Feedback>Aucune discussion pour le moment.</Feedback>
          ) : null}

          <DiscussionStack>
            {previews.map((preview) => {
              const hasUnread = hasUnreadMessages(preview, currentMember?.id);

              return (
                <DiscussionCard
                  key={preview.discussion.id}
                  to={`/profil/messages/${preview.discussion.id}`}
                >
                  <AvatarWrap>
                    <MessageStateDot
                      $hasUnread={hasUnread}
                      data-state={hasUnread ? 'unread' : 'read'}
                      aria-hidden="true"
                    />
                    <AvatarPicture aria-label={getPeerName(preview)}>
                      <img
                        src={getPeerAvatarSrc(preview)}
                        alt={getPeerName(preview)}
                        onError={(event) => {
                          event.currentTarget.src =
                            getFallbackAvatarSrc(preview);
                        }}
                      />
                    </AvatarPicture>
                  </AvatarWrap>
                  <DiscussionSummary>
                    <h3>{getPeerName(preview)}</h3>
                    <p>{formatLastMessage(preview, currentMember?.id)}</p>
                  </DiscussionSummary>
                </DiscussionCard>
              );
            })}
          </DiscussionStack>
        </MessagesPanel>

        <Aside>
          <ProfileMiniCard>
            <AvatarLarge aria-hidden="true">
              {currentMember
                ? `${currentMember.firstname.charAt(0)}${currentMember.lastname.charAt(0)}`
                : 'CH'}
            </AvatarLarge>
            <h3>
              {currentMember
                ? `${currentMember.firstname} ${currentMember.lastname}`
                : 'Mon profil'}
            </h3>
            <p>{currentMember?.email}</p>
          </ProfileMiniCard>
          <SideCard>
            <h3>Badges</h3>
          </SideCard>
          <WalletCard>
            <WalletIcon aria-hidden="true">▰</WalletIcon>
            <h3>Portefeuille</h3>
            <button type="button">Voir mon portefeuille</button>
            <strong>2 000€</strong>
          </WalletCard>
        </Aside>
      </ContentGrid>
    </Page>
  );
};

const getPeerId = (discussion: TchatDiscussion, currentMemberId: number) =>
  discussion.discussionOpenerId === currentMemberId
    ? discussion.discussionReceiverId
    : discussion.discussionOpenerId;

const getPeerName = (preview: DiscussionPreview) => {
  if (preview.peerProfile) {
    return `${preview.peerProfile.firstname} ${preview.peerProfile.lastname.toUpperCase()}`;
  }

  return `Membre #${preview.peerId}`;
};

const getPeerAvatarText = (preview: DiscussionPreview) => {
  if (preview.peerProfile) {
    return `${preview.peerProfile.firstname.charAt(0)}${preview.peerProfile.lastname.charAt(0)}`.toUpperCase();
  }

  return `#${preview.peerId}`;
};

const getPeerAvatarSrc = (preview: DiscussionPreview) =>
  preview.peerProfile?.avatarUrl || getFallbackAvatarSrc(preview);

const getFallbackAvatarSrc = (preview: DiscussionPreview) => {
  const label = getPeerAvatarText(preview);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="48" fill="#ffffff"/>
      <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#56469f">${escapeSvgText(label)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const escapeSvgText = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const hasUnreadMessages = (
  preview: DiscussionPreview,
  currentMemberId?: number,
) => {
  const discussion = preview.discussion as TchatDiscussion & {
    hasUnreadMessages?: boolean;
    unreadCount?: number;
    unreadMessagesCount?: number;
  };

  if (typeof discussion.hasUnreadMessages === 'boolean') {
    return discussion.hasUnreadMessages;
  }

  if (typeof discussion.unreadCount === 'number') {
    return discussion.unreadCount > 0;
  }

  if (typeof discussion.unreadMessagesCount === 'number') {
    return discussion.unreadMessagesCount > 0;
  }

  if (preview.lastMessage && preview.lastMessage.memberId !== currentMemberId) {
    return !preview.lastMessage.isRead && !preview.lastMessage.readAt;
  }

  return false;
};

const formatLastMessage = (
  preview: DiscussionPreview,
  currentMemberId?: number,
) => {
  if (!preview.lastMessage) {
    return 'Aucun message';
  }

  const author =
    preview.lastMessage.memberId === currentMemberId
      ? 'Vous'
      : (preview.peerProfile?.firstname ?? `Membre #${preview.peerId}`);

  return `${author}: ${preview.lastMessage.content}`;
};

const Page = styled.main`
  background: #f4f3fa;
  min-height: calc(100vh - 90px);
  padding-bottom: 48px;
  padding-top: 10px;
`;

const SearchBar = styled.label`
  align-items: center;
  background: #fff;
  border-radius: 8px;
  color: #9aa8bd;
  display: flex;
  gap: 12px;
  margin: 0 auto 36px;
  max-width: 900px;
  padding: 14px 26px;

  input {
    border: 0;
    color: #333;
    flex: 1;
    font-size: 15px;
    outline: 0;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: minmax(0, 1fr) 280px;
  margin: 0 auto;
  max-width: 900px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MessagesPanel = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(35, 35, 35, 0.08);
  min-height: 620px;
  padding: 28px;
`;

const PanelHeader = styled.div`
  align-items: center;
  border-bottom: 2px solid #56469f;
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
  padding-bottom: 24px;

  h2 {
    color: #111;
    font-size: 26px;
    margin: 0;
  }

  a {
    color: #111;
    font-weight: 800;
    text-decoration: none;
  }
`;

const DiscussionStack = styled.div`
  display: grid;
  gap: 28px;
`;

const DiscussionCard = styled(Link)`
  align-items: center;
  background: #56469f;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(35, 35, 35, 0.2);
  color: #fff;
  display: grid;
  gap: 18px;
  grid-template-columns: 120px minmax(0, 1fr);
  min-height: 140px;
  padding: 24px 30px;
  position: relative;
  text-decoration: none;

  &:hover {
    box-shadow: 0 8px 16px rgba(35, 35, 35, 0.24);
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const AvatarWrap = styled.div`
  height: 104px;
  position: relative;
  width: 104px;
`;

const AvatarPicture = styled.picture`
  align-items: center;
  background: #fff;
  border-radius: 50%;
  color: #56469f;
  display: inline-flex;
  font-size: 16px;
  font-weight: 800;
  height: 96px;
  justify-content: center;
  overflow: hidden;
  width: 96px;

  img {
    display: block;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const MessageStateDot = styled.span<{ $hasUnread: boolean }>`
  background: ${({ $hasUnread }) => ($hasUnread ? '#16bf3f' : '#c9c4dd')};
  border: 2px solid #56469f;
  border-radius: 50%;
  bottom: 8px;
  height: 22px;
  position: absolute;
  right: 8px;
  width: 22px;
  z-index: 1;
`;

const DiscussionSummary = styled.div`
  display: grid;
  gap: 22px;
  justify-items: end;
  min-width: 0;
  text-align: right;

  h3 {
    font-size: 22px;
    margin: 0;
  }

  p {
    color: rgba(255, 255, 255, 0.86);
    margin: 0;
    max-width: 430px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Aside = styled.aside`
  display: grid;
  gap: 26px;
`;

const ProfileMiniCard = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(35, 35, 35, 0.08);
  display: grid;
  gap: 10px;
  justify-items: center;
  min-height: 220px;
  padding: 30px 22px;
  text-align: center;

  h3 {
    margin: 0;
  }

  p {
    color: #6b6b6b;
    font-size: 13px;
    margin: 0;
    word-break: break-word;
  }
`;

const AvatarLarge = styled.div`
  align-items: center;
  background: #56469f;
  border-radius: 50%;
  color: #fff;
  display: inline-flex;
  font-size: 24px;
  font-weight: 800;
  height: 88px;
  justify-content: center;
  width: 88px;
`;

const SideCard = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(35, 35, 35, 0.08);
  min-height: 170px;
  padding: 26px;

  h3 {
    color: #242424;
    font-size: 26px;
    margin: 0;
  }
`;

const WalletCard = styled(SideCard)`
  align-items: center;
  display: grid;
  justify-items: center;
  min-height: 220px;
  text-align: center;

  h3 {
    color: #303749;
    font-size: 21px;
  }

  button {
    background: #ef604f;
    border: 0;
    border-radius: 18px;
    color: #fff;
    cursor: pointer;
    padding: 8px 18px;
  }

  strong {
    color: #56469f;
    font-size: 18px;
  }
`;

const WalletIcon = styled.span`
  align-items: center;
  background: #ef604f;
  border-radius: 8px;
  color: #fff;
  display: inline-flex;
  font-size: 22px;
  height: 66px;
  justify-content: center;
  width: 66px;
`;

const Feedback = styled.p`
  background: #f3f0ff;
  border-left: 4px solid #56469f;
  border-radius: 8px;
  color: #232323;
  margin: 0 0 16px;
  padding: 12px 14px;
`;

export default MessagesList;
