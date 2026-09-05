import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getMembers } from '../api/members.api';
import type { MemberProfile } from '../api/member.types';

function MembersPage() {
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getMembers()
      .then(setMembers)
      .catch((error) =>
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Impossible de charger les membres.',
        ),
      )
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Page className="container">
      <Header>
        <div>
          <p>Membres</p>
          <h1>Annuaire des membres</h1>
        </div>
        <Link to="/profil">Mon compte</Link>
      </Header>

      {isLoading && <StatusMessage>Chargement des membres...</StatusMessage>}
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}

      {!isLoading && !errorMessage && members.length === 0 && (
        <StatusMessage>Aucun membre à afficher.</StatusMessage>
      )}

      {members.length > 0 && (
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>
                    <strong>
                      {member.firstname} {member.lastname}
                    </strong>
                    <span>{member.address || 'Adresse non renseignée'}</span>
                  </td>
                  <td>{member.email}</td>
                  <td>{member.role || 'Membre'}</td>
                  <td>{member.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      )}
    </Page>
  );
}

const Page = styled.main`
  padding: 48px 0 80px;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  p {
    color: #5a4aa3;
    font-weight: 700;
    margin: 0 0 6px;
  }

  h1 {
    margin: 0;
  }

  a {
    background: #5a4aa3;
    border-radius: 8px;
    color: #fff;
    font-weight: 700;
    padding: 12px 18px;
    text-decoration: none;
  }
`;

const StatusMessage = styled.p`
  background: #fff;
  border-radius: 8px;
  color: #2f2b3a;
  padding: 18px;
`;

const ErrorMessage = styled(StatusMessage)`
  border-left: 4px solid #ee5d4f;
`;

const TableWrapper = styled.section`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 14px 35px rgb(47 43 58 / 8%);
  overflow-x: auto;

  table {
    border-collapse: collapse;
    min-width: 720px;
    width: 100%;
  }

  th,
  td {
    border-bottom: 1px solid #ece9f5;
    padding: 16px 18px;
    text-align: left;
  }

  th {
    color: #5a4aa3;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  td span {
    color: #6f6a7c;
    display: block;
    font-size: 0.9rem;
    margin-top: 4px;
  }
`;

export default MembersPage;
