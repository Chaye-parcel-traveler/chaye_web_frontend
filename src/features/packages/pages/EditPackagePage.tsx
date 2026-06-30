import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
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
      <Form
        className="col-formule bg-white container-fluid col-4 my-3 "
        onSubmit={handleSubmit}
      >
        <Form.Field>
          <label className="form-label">Contenu:</label>
          <input
            className="form-control"
            type="text"
            id="input"
            onChange={handleContentChange}
            value={content}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Poids:</label>
          <input
            className="form-control"
            type="text"
            id="input"
            onChange={handleWeightChange}
            value={weight}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Taille:</label>
          <input
            className="form-control"
            type="text"
            id="input"
            onChange={handleSizeChange}
            value={size}
          />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Ville de départ:</label>
          <input
            className="form-control"
            type="text"
            id="input"
            onChange={handleDepartureCityChange}
            value={departureCity}
          />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Photo de contenu du colis ::</label>
          <input
            className="form-control"
            type="file"
            id="input"
            onChange={handleFileChange}
          />
        </Form.Field>
        <img src={getApiAssetUrl(picture)} width="150px" alt="imageColis" />

        <Button id="btn" type="submit">
          Ajouter
        </Button>
      </Form>
    </div>
  );
}

export default EditPackagePage;
