import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../../../styles/forms.css';
import Footer from '../../../components/Footer';
import apiClient, { getApiAssetUrl } from '../../../lib/api-client';
import type { Member } from '../member.types';

function EditMemberPage() {
  let navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [imagename, setImagename] = useState('');

  const handelFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagename(selectedFile.name);
    }
  };

  const handelLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const handelFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const handelEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handelPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handelAdressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdress(event.target.value);
  };

  const handelPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handelStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    apiClient
      .get<Member>(`/members/${params.id}`)
      .then((response) => {
        setLastname(response.data.lastname ?? '');
        setFirstname(response.data.firstname ?? '');
        setEmail(response.data.email ?? '');
        setPassword('');
        setAdress(response.data.adress ?? '');
        setPhone(response.data.phone ?? '');
        setStatus(response.data.status ?? '');
        setImagename(response.data.imagename ?? '');
      })
      .catch(() => {});
  }, [params.id]);

  const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('lastname', lastname);
    formData.append('firstname', firstname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('adress', adress);
    formData.append('phone', phone);
    formData.append('status', status);
    formData.append('imagename', imagename);

    apiClient
      .put(`/members/${params.id}`, formData)
      .then(() => {
        return navigate('/members');
      })
      .catch(() => {});
  };

  return (
    <div className="content-image2">
      <div className=" d-flex justify-content-center">
        <Link to="/">
          <img src={'/img/logo.png'} alt="Logo" className="Logo" />
        </Link>
      </div>
      <div className="content-signUp bg-white container-fluid col-4 my-3 ">
        <div className="m-5 ">
          <div className="text-center mt-5">
            <h1 className="text-center pt-5 fs-2 fw-bold">
              Modifier votre Profile
            </h1>
          </div>
          <form className="signUp" onSubmit={handelSubmit}>
            <input type="hidden" name="_method" value="PUT" />
            <div className="mb-3 ">
              <label className="form-label" htmlFor="member-lastname">
                Nom
              </label>
              <input
                id="member-lastname"
                type="text"
                className="form-control "
                name="lastname"
                onChange={handelLastnameChange}
                value={lastname}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="member-firstname">
                Prénom
              </label>
              <input
                id="member-firstname"
                type="text"
                className="form-control"
                name="firstname"
                onChange={handelFirstnameChange}
                value={firstname}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="member-email">
                Email
              </label>
              <input
                id="member-email"
                type="email"
                className="form-control"
                name="email"
                onChange={handelEmailChange}
                value={email}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="member-password">
                Mot de passe
              </label>
              <input
                id="member-password"
                type="password"
                className="form-control"
                name="password"
                onChange={handelPasswordChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="member-address">
                Adresse
              </label>
              <input
                id="member-address"
                type="text"
                className="form-control"
                name="adress"
                onChange={handelAdressChange}
                value={adress}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="member-phone">
                Téléphone
              </label>
              <input
                id="member-phone"
                type="text"
                className="form-control"
                name="phone"
                onChange={handelPhoneChange}
                value={phone}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="member-status">
                Statut
              </label>
              <select
                id="member-status"
                name="status"
                className="form-select"
                onChange={handelStatusChange}
                value={status}
              >
                <option>Sélectionnez votre status</option>
                <option>Expéditeur</option>
                <option>Voyageur</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="member-picture">
                Photo
              </label>
              <input
                id="member-picture"
                type="file"
                className="form-control"
                onChange={handelFileChange}
              />
              <img src={getApiAssetUrl(imagename)} width="150px" alt="Profil" />
            </div>
            <div className="p-3 text-center">
              <input
                className="text-light fw-bold valider px-5 py-2"
                type="submit"
                value="Modifier"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditMemberPage;
