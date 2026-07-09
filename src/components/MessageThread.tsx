import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  MemberIdentity,
  TchatDiscussion,
  TchatMessage,
  getDiscussion,
  getDiscussionMessages,
  getMember,
  getStoredMember,
  sendDiscussionMessage,
} from './API/apiManager';
import {
  getPeerProfileFromDiscussion,
  normalizeMemberIdentity,
} from './tchatIdentity';

const MessageThread = () => {
  const { discussionId } = useParams();
  const navigate = useNavigate();
  const currentMember = useMemo(() => getStoredMember(), []);
  const [discussion, setDiscussion] = useState<TchatDiscussion | null>(null);
  const [peerProfile, setPeerProfile] = useState<MemberIdentity | null>(null);
  const [messages, setMessages] = useState<TchatMessage[]>([]);
  const [draftMessage, setDraftMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const numericDiscussionId = Number(discussionId);
  const peerId =
    discussion && currentMember
      ? discussion.discussionOpenerId === currentMember.id
        ? discussion.discussionReceiverId
        : discussion.discussionOpenerId
      : null;

  useEffect(() => {
    if (!currentMember) {
      navigate('/login');
      return;
    }

    if (!Number.isFinite(numericDiscussionId)) {
      setErrorMessage('Discussion introuvable.');
      setIsLoading(false);
      return;
    }

    Promise.all([
      getDiscussion(numericDiscussionId),
      getDiscussionMessages(numericDiscussionId),
    ])
      .then(async ([nextDiscussion, nextMessages]) => {
        const nextPeerId =
          nextDiscussion.discussionOpenerId === currentMember.id
            ? nextDiscussion.discussionReceiverId
            : nextDiscussion.discussionOpenerId;

        setDiscussion(nextDiscussion);
        setMessages(nextMessages);
        setPeerProfile(
          getPeerProfileFromDiscussion(nextDiscussion, currentMember.id) ??
            (await getMember(nextPeerId)
              .then((member) => normalizeMemberIdentity(member))
              .catch(() => null)),
        );
      })
      .catch((error) =>
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Impossible de charger cette discussion.',
        ),
      )
      .finally(() => setIsLoading(false));
  }, [currentMember, navigate, numericDiscussionId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!numericDiscussionId || !draftMessage.trim()) {
      return;
    }

    setIsSending(true);
    setErrorMessage('');

    try {
      const newMessage = await sendDiscussionMessage(
        numericDiscussionId,
        draftMessage.trim(),
      );
      setMessages((currentMessages) => [...currentMessages, newMessage]);
      setDraftMessage('');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Envoi du message impossible.',
      );
    } finally {
      setIsSending(false);
    }
  };

  const peerName = getPeerName(peerProfile, peerId);
  const peerAvatarText = getPeerAvatarText(peerProfile, peerId);

  return (
    <Page className="container">
      <SearchBar aria-label="Recherche">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Rechercher" />
      </SearchBar>

      <ContentGrid>
        <ChatPanel>
          <ChatHeader>
            <BackButton
              type="button"
              aria-label="Retour"
              onClick={() => navigate(-1)}
            >
              ‹
            </BackButton>
            <SmallAvatar aria-label={peerName}>
              {peerProfile?.avatarUrl ? (
                <img src={peerProfile.avatarUrl} alt={peerName} />
              ) : (
                peerAvatarText
              )}
            </SmallAvatar>
            <h2>{peerName}</h2>
            <OnlineDot aria-label="En ligne" />
          </ChatHeader>

          {isLoading ? (
            <Feedback>Chargement de la discussion...</Feedback>
          ) : null}
          {errorMessage ? <Feedback>{errorMessage}</Feedback> : null}

          <MessagesArea>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                $isMine={message.memberId === currentMember?.id}
              >
                <MessageContent>{message.content}</MessageContent>
                <MessageStatus
                  $status={getMessageDeliveryStatus(message)}
                  aria-label={getMessageDeliveryLabel(message)}
                  title={getMessageDeliveryLabel(message)}
                >
                  <span aria-hidden="true" />
                  {getMessageDeliveryStatus(message) !== 'sent' ? (
                    <span aria-hidden="true" />
                  ) : null}
                </MessageStatus>
              </MessageBubble>
            ))}
          </MessagesArea>

          <MessageForm onSubmit={handleSubmit}>
            <MessageInput
              placeholder="Entrer votre message"
              value={draftMessage}
              onChange={(event) => setDraftMessage(event.target.value)}
            />
            <SendButton type="submit" disabled={isSending}>
              {isSending ? 'Envoi...' : 'Envoyer'}
            </SendButton>
          </MessageForm>
        </ChatPanel>

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
            <BackLink to="/profil/messages">Toutes les discussions</BackLink>
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

const getPeerName = (
  peerProfile: MemberIdentity | null,
  peerId: number | null,
) => {
  if (peerProfile) {
    return `${peerProfile.firstname} ${peerProfile.lastname.toUpperCase()}`;
  }

  return peerId ? `Membre #${peerId}` : 'Discussion';
};

const getPeerAvatarText = (
  peerProfile: MemberIdentity | null,
  peerId: number | null,
) => {
  if (peerProfile) {
    return `${peerProfile.firstname.charAt(0)}${peerProfile.lastname.charAt(0)}`.toUpperCase();
  }

  return peerId ? `#${peerId}` : '?';
};

const getMessageDeliveryStatus = (message: TchatMessage) => {
  if (message.deliveryStatus === 'read' || message.isRead || message.readAt) {
    return 'read';
  }

  if (message.deliveryStatus === 'received') {
    return 'received';
  }

  return 'sent';
};

const getMessageDeliveryLabel = (message: TchatMessage) => {
  const status = getMessageDeliveryStatus(message);

  if (status === 'read') {
    return 'Message lu';
  }

  if (status === 'received') {
    return 'Message reçu';
  }

  return 'Message envoyé';
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

const ChatPanel = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(35, 35, 35, 0.08);
  min-height: 620px;
  padding: 20px 26px 28px;
`;

const ChatHeader = styled.header`
  align-items: center;
  background: #56469f;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(35, 35, 35, 0.2);
  color: #fff;
  display: grid;
  gap: 14px;
  grid-template-columns: 28px 54px minmax(0, 1fr) 18px;
  min-height: 62px;
  padding: 10px 18px;

  h2 {
    color: #111;
    font-size: 18px;
    margin: 0;
    text-align: center;
  }
`;

const BackButton = styled.button`
  background: transparent;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
  padding: 0;
`;

const SmallAvatar = styled.div`
  align-items: center;
  background: #fff;
  border-radius: 50%;
  color: #56469f;
  display: inline-flex;
  font-size: 12px;
  font-weight: 800;
  height: 44px;
  justify-content: center;
  overflow: hidden;
  width: 44px;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

const OnlineDot = styled.span`
  background: #16bf3f;
  border-radius: 50%;
  height: 15px;
  width: 15px;
`;

const MessagesArea = styled.div`
  display: grid;
  gap: 24px;
  min-height: 360px;
  padding: 58px 0 42px;
`;

const MessageBubble = styled.div<{ $isMine: boolean }>`
  background: ${({ $isMine }) => ($isMine ? '#ded8f8' : '#c9c4dd')};
  border-radius: 18px;
  color: #151515;
  display: grid;
  gap: 6px;
  justify-self: ${({ $isMine }) => ($isMine ? 'end' : 'start')};
  max-width: min(72%, 360px);
  padding: 14px 24px;
  text-align: ${({ $isMine }) => ($isMine ? 'right' : 'left')};
`;

const MessageContent = styled.span`
  min-width: 0;
`;

const MessageStatus = styled.span<{ $status: 'read' | 'received' | 'sent' }>`
  align-items: center;
  display: inline-flex;
  gap: 0;
  justify-self: end;
  min-height: 12px;

  span {
    border-bottom: 2px solid
      ${({ $status }) => ($status === 'read' ? '#2295ff' : '#807b91')};
    border-right: 2px solid
      ${({ $status }) => ($status === 'read' ? '#2295ff' : '#807b91')};
    display: inline-block;
    height: 8px;
    transform: rotate(45deg);
    width: 4px;
  }

  span + span {
    margin-left: -1px;
  }
`;

const MessageForm = styled.form`
  align-items: stretch;
  background: #efefef;
  border-radius: 20px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  overflow: hidden;
`;

const MessageInput = styled.input`
  background: transparent;
  border: 0;
  font-weight: 700;
  min-width: 0;
  outline: 0;
  padding: 0 18px;
`;

const SendButton = styled.button`
  background: #ef604f;
  border: 0;
  color: #fff;
  cursor: pointer;
  font-weight: 800;
  min-height: 44px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
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

const BackLink = styled(Link)`
  color: #56469f;
  font-weight: 800;
  text-decoration: none;
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
  margin: 18px 0 0;
  padding: 12px 14px;
`;

export default MessageThread;
