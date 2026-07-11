import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  Announcement,
  getAnnouncements,
} from '../../announcements/api/announcements.api';
import { getCurrentMember } from '../../members/api/members.api';
import type { MemberProfile } from '../../members/api/member.types';
import { getDiscussions } from '../../messages/api/messages.api';
import type { TchatDiscussion } from '../../messages/api/messages.types';
import ReportButton from '../../moderation/components/ReportButton';

const ProfileManager = () => {
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [discussions, setDiscussions] = useState<TchatDiscussion[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getCurrentMember()
      .then((member) => {
        setProfile(member);
        return Promise.all([
          getDiscussions().catch(() => []),
          getAnnouncements().catch(() => []),
        ]);
      })
      .then(([nextDiscussions, nextAnnouncements]) => {
        setDiscussions(nextDiscussions);
        setAnnouncements(nextAnnouncements);
      })
      .catch(() =>
        setErrorMessage(
          'Connectez-vous pour consulter votre profil réel depuis l’API.',
        ),
      );
  }, []);

  if (!profile) {
    return (
      <Page className="container">
        <h2 className="txtLeft margin-top-36">Profil</h2>
        <EmptyCard>
          <p>{errorMessage || 'Chargement du profil...'}</p>
          {errorMessage ? <Link to="/login">Aller à la connexion</Link> : null}
        </EmptyCard>
      </Page>
    );
  }

  const profileInitials = `${profile.firstname.charAt(0)}${profile.lastname.charAt(0)}`;
  const myVisibleAnnouncements = announcements.filter(
    (announcement) => announcement.memberId === profile.id,
  );

  return (
    <Page className="container">
      <HeroPanel>
        <h2>Que veux tu faire ?</h2>
        <HeroActions>
          <HeroButton to="/sender">J’expédie</HeroButton>
          <HeroButton to="/carrier">Je transporte</HeroButton>
        </HeroActions>
      </HeroPanel>

      <SearchBar aria-label="Recherche">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Rechercher" />
      </SearchBar>

      <ProfileGrid>
        <MainColumn>
          <BlocksPanel>
            <PanelHeader>
              <h2>Mon espace</h2>
              <Link to="/profil/messages">Voir tout</Link>
            </PanelHeader>
            <BlocksGrid>
              <DashboardBlock to="/profil/reservations">
                <BlockIcon aria-hidden="true">▣</BlockIcon>
                <BlockContent>
                  <strong>Réservations</strong>
                  <span>{0} en cours</span>
                </BlockContent>
              </DashboardBlock>
              <DashboardBlock to="/profil/messages">
                <BlockIcon aria-hidden="true">✉</BlockIcon>
                <BlockContent>
                  <strong>Discussions</strong>
                  <span>{discussions.length} discussion(s)</span>
                </BlockContent>
              </DashboardBlock>
              <DashboardBlock to="/profil/annonces">
                <BlockIcon aria-hidden="true">□</BlockIcon>
                <BlockContent>
                  <strong>Mes annonces</strong>
                  <span>{myVisibleAnnouncements.length} visible(s)</span>
                </BlockContent>
              </DashboardBlock>
              <DashboardBlock to="/profil/collaborations">
                <BlockIcon aria-hidden="true">◇</BlockIcon>
                <BlockContent>
                  <strong>Mes collaborations</strong>
                  <span>{0} active(s)</span>
                </BlockContent>
              </DashboardBlock>
              <DashboardBlock to="/profil/reclamations">
                <BlockIcon aria-hidden="true">!</BlockIcon>
                <BlockContent>
                  <strong>Mes réclamations</strong>
                  <span>{0} ouverte(s)</span>
                </BlockContent>
              </DashboardBlock>
            </BlocksGrid>
          </BlocksPanel>
        </MainColumn>

        <AsideColumn>
          <ProfileCard>
            <CardTop>
              <NotificationDot aria-hidden="true">!</NotificationDot>
            </CardTop>
            <Avatar aria-hidden="true">{profileInitials}</Avatar>
            <StatusDot aria-label="Compte actif" />
            <ProfileInfo>
              <h3>
                {profile.firstname} {profile.lastname}
              </h3>
              <p>{profile.address}</p>
              <ContactInfo>
                <span>{profile.email}</span>
                <span>{profile.phone}</span>
              </ContactInfo>
            </ProfileInfo>
            <ReportButton
              targetType="member"
              targetId={profile.id}
              targetLabel="ce profil"
            />
          </ProfileCard>

          <SideCard>
            <h3>Badges</h3>
          </SideCard>

          <WalletCard>
            <WalletIcon aria-hidden="true">▰</WalletIcon>
            <h3>Portefeuille</h3>
            <button type="button">Voir mon portefeuille</button>
            <strong>2 000€</strong>
          </WalletCard>
        </AsideColumn>
      </ProfileGrid>
    </Page>
  );
};

const Page = styled.main`
  background: #f4f3fa;
  min-height: calc(100vh - 90px);
  padding-bottom: 48px;
  padding-top: 32px;
`;

const HeroPanel = styled.section`
  background: #fff;
  border-radius: 8px;
  display: grid;
  gap: 22px;
  margin: 0 auto 28px;
  max-width: 900px;
  padding: 32px 24px;
  text-align: center;

  h2 {
    color: #202020;
    font-size: 25px;
    margin: 0;
  }
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
`;

const HeroButton = styled(Link)`
  background: #ef604f;
  border-radius: 14px;
  color: #fff;
  font-weight: 800;
  min-width: 160px;
  padding: 14px 24px;
  text-align: center;
  text-decoration: none;
`;

const SearchBar = styled.label`
  align-items: center;
  background: #fff;
  border-radius: 8px;
  color: #9aa8bd;
  display: flex;
  gap: 12px;
  margin: 0 auto 28px;
  max-width: 900px;
  padding: 14px 26px;

  input {
    border: 0;
    color: #333;
    flex: 1;
    font-size: 15px;
    outline: 0;
  }

  input::placeholder {
    color: #c8d0df;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: minmax(0, 1fr) 280px;
  margin: 0 auto;
  max-width: 900px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  min-width: 0;
`;

const AsideColumn = styled.aside`
  display: grid;
  gap: 26px;
`;

const BlocksPanel = styled.section`
  background: #56469f;
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(41, 34, 83, 0.22);
  padding: 28px;
`;

const PanelHeader = styled.div`
  align-items: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;
  margin-bottom: 26px;
  padding-bottom: 22px;

  h2 {
    color: #fff;
    font-size: 26px;
    margin: 0;
  }

  a {
    color: #fff;
    font-weight: 800;
    text-decoration: none;
  }
`;

const BlocksGrid = styled.div`
  display: grid;
  gap: 18px;
`;

const DashboardBlock = styled(Link)`
  align-items: center;
  background: #f7f6fb;
  border-radius: 8px;
  color: #1f1f1f;
  display: grid;
  gap: 16px;
  grid-template-columns: 48px minmax(0, 1fr);
  min-height: 82px;
  padding: 18px 22px;
  text-decoration: none;

  &:hover {
    box-shadow: inset 0 0 0 2px #ef604f;
  }
`;

const BlockIcon = styled.span`
  align-items: center;
  background: #ef604f;
  border-radius: 8px;
  color: #fff;
  display: inline-flex;
  font-size: 20px;
  font-weight: 800;
  height: 48px;
  justify-content: center;
  width: 48px;
`;

const BlockContent = styled.span`
  display: grid;
  gap: 6px;

  strong {
    font-size: 18px;
  }

  span {
    color: #6d6d6d;
    font-size: 14px;
  }
`;

const ProfileCard = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 18px rgba(35, 35, 35, 0.08);
  min-height: 300px;
  overflow: hidden;
  padding-bottom: 22px;
  position: relative;
  text-align: center;
`;

const CardTop = styled.div`
  background: #ef604f;
  height: 92px;
  position: relative;
`;

const NotificationDot = styled.span`
  align-items: center;
  background: #fff;
  border-radius: 50%;
  color: #ef604f;
  display: inline-flex;
  font-weight: 800;
  height: 32px;
  justify-content: center;
  left: 16px;
  position: absolute;
  top: 16px;
  width: 32px;
`;

const Avatar = styled.div`
  align-items: center;
  background: #56469f;
  border-radius: 50%;
  color: #fff;
  display: inline-flex;
  font-size: 26px;
  font-weight: 800;
  height: 88px;
  justify-content: center;
  margin-top: -44px;
  position: relative;
  width: 88px;
`;

const StatusDot = styled.span`
  background: #16bf3f;
  border: 2px solid #fff;
  border-radius: 50%;
  display: block;
  height: 16px;
  left: calc(50% + 34px);
  position: absolute;
  top: 95px;
  width: 16px;
`;

const ProfileInfo = styled.div`
  padding: 12px 24px 18px;

  h3 {
    color: #1f1f1f;
    font-size: 18px;
    margin: 0 0 8px;
  }

  p {
    color: #6b6b6b;
    font-size: 13px;
    margin: 0 0 18px;
  }
`;

const ContactInfo = styled.div`
  border-top: 1px solid #ececec;
  color: #6b6b6b;
  display: grid;
  font-size: 12px;
  gap: 8px;
  padding-top: 16px;
  text-align: left;
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

const EmptyCard = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 10px;
  margin-top: 25px;
  max-width: 560px;
  padding: 24px;

  p {
    margin: 0;
  }
`;

export default ProfileManager;
