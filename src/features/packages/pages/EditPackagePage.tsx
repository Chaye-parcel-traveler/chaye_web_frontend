import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './EditPackagePage.css';
import apiClient, { getApiAssetUrl } from '../../../lib/api-client';
import type { Package } from '../package.types';

function EditPackagePage() {
  let navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [picture, setPicture] = useState('');
  const [departureCity, setDepartureCity] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPicture(selectedFile.name);
    }
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value);
  };
  const handleDepartureCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDepartureCity(event.target.value);
  };

  useEffect(() => {
    apiClient
      .get<Package>(`/package/${params.id}`, { withCredentials: true })
      .then((response) => {
        setContent(response.data.content ?? '');
        setWeight(String(response.data.weight ?? ''));
        setSize(String(response.data.size ?? ''));
        setDepartureCity(response.data.departureCity ?? '');
        setPicture(response.data.picture ?? '');
      })
      .catch(() => {});
  }, [params.id]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('content', content);
    formData.append('weight', weight);
    formData.append('size', size);
    formData.append('departureCity', departureCity);
    formData.append('picture', picture);

    apiClient
      .put(`/editpackage/${params.id}`, formData)
      .then(() => {
        return navigate('/');
      })
      .catch(() => {});
  };

  return (
    <div className="Formulcontainer">
      <h1>Modifier Votre colis</h1>
      <form
        className="col-formule bg-white container-fluid col-4 my-3 "
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="package-content">
            Contenu:
          </label>
          <input
            className="form-control"
            type="text"
            id="package-content"
            onChange={handleContentChange}
            value={content}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="package-weight">
            Poids:
          </label>
          <input
            className="form-control"
            type="text"
            id="package-weight"
            onChange={handleWeightChange}
            value={weight}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="package-size">
            Taille:
          </label>
          <input
            className="form-control"
            type="text"
            id="package-size"
            onChange={handleSizeChange}
            value={size}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="departure-city">
            Ville de départ:
          </label>
          <input
            className="form-control"
            type="text"
            id="departure-city"
            onChange={handleDepartureCityChange}
            value={departureCity}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="package-picture">
            Photo de contenu du colis :
          </label>
          <input
            className="form-control"
            type="file"
            id="package-picture"
            onChange={handleFileChange}
          />
        </div>
        <img src={getApiAssetUrl(picture)} width="150px" alt="imageColis" />

        <button className="btn btn-primary" id="btn" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default EditPackagePage;
