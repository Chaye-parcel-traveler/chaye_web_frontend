import styled from 'styled-components';
import ReportButton from './ReportButton';

type Member = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
};

const profile: Member = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@example.com',
  address: '123 Main St, Springfield',
};

const ProfileManager = () => {
  return (
    <Page className="container">
      <h2 className="txtLeft margin-top-36">Profil</h2>
      <ProfileCard>
        <Avatar aria-hidden="true">
          {profile.firstname.charAt(0)}
          {profile.lastname.charAt(0)}
        </Avatar>
        <ProfileInfo>
          <h3>
            {profile.firstname} {profile.lastname}
          </h3>
          <p>{profile.email}</p>
          <p>{profile.address}</p>
        </ProfileInfo>
        <ReportButton
          targetType="member"
          targetId={profile.id}
          targetLabel="ce profil"
        />
      </ProfileCard>
    </Page>
  );
};

const Page = styled.main`
  padding-bottom: 48px;
`;

const ProfileCard = styled.section`
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
  display: flex;
  gap: 18px;
  margin-top: 25px;
  max-width: 760px;
  padding: 24px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Avatar = styled.div`
  align-items: center;
  background: #4f4294;
  border-radius: 50%;
  color: #fff;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 22px;
  font-weight: 800;
  height: 64px;
  justify-content: center;
  width: 64px;
`;

const ProfileInfo = styled.div`
  flex: 1;

  h3 {
    color: #1f1f1f;
    font-size: 22px;
    margin: 0 0 8px;
  }

  p {
    color: #383838;
    margin: 4px 0;
  }
`;

export default ProfileManager;
