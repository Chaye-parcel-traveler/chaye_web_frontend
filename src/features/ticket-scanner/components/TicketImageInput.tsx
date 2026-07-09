import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { readTicketFromImage } from '../services/readTicketFromImage';
import type { FlightTicketData } from '../types/FlightTicketData';

type TicketImageInputProps = {
  onTicketRead: (ticket: FlightTicketData) => void;
};

export const TicketImageInput = ({ onTicketRead }: TicketImageInputProps) => {
  const [isReading, setIsReading] = useState(false);
  const [status, setStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsReading(true);
    setErrorMessage('');
    setStatus('Lecture du billet...');

    try {
      const ticket = await readTicketFromImage(file, (progress) => {
        if (progress.status) {
          setStatus(
            `OCR ${progress.status} ${Math.round(progress.progress * 100)}%`
          );
        }
      });
      onTicketRead(ticket);
      setStatus(
        ticket.source === 'barcode'
          ? 'Billet lu depuis le code-barres.'
          : 'Billet lu par OCR. Vérifiez les champs avant publication.'
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Impossible de lire ce billet automatiquement.'
      );
      setStatus('');
    } finally {
      setIsReading(false);
      event.target.value = '';
    }
  };

  return (
    <ScannerBox>
      <ScannerHeader>
        <strong>Lire un billet d’avion</strong>
        <span>Pré-remplit le trajet si le code ou le texte est reconnu.</span>
      </ScannerHeader>
      <FileControl>
        <input
          accept="image/*"
          capture="environment"
          disabled={isReading}
          type="file"
          onChange={handleChange}
        />
        <span>{isReading ? 'Analyse en cours...' : 'Scanner une photo'}</span>
      </FileControl>
      {status ? <StatusText>{status}</StatusText> : null}
      {errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null}
    </ScannerBox>
  );
};

const ScannerBox = styled.section`
  background: #f8f7fc;
  border: 1px solid #ded9f4;
  border-radius: 8px;
  display: grid;
  gap: 14px;
  padding: 18px;
`;

const ScannerHeader = styled.div`
  display: grid;
  gap: 4px;

  strong {
    color: #1f1f1f;
    font-size: 18px;
  }

  span {
    color: #656565;
  }
`;

const FileControl = styled.label`
  align-items: center;
  background: #56469f;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-weight: 800;
  justify-content: center;
  max-width: 240px;
  min-height: 44px;
  padding: 0 18px;
  position: relative;

  input {
    inset: 0;
    opacity: 0;
    position: absolute;
  }
`;

const StatusText = styled.p`
  color: #4f4294;
  font-weight: 700;
  margin: 0;
`;

const ErrorText = styled.p`
  color: #b42318;
  font-weight: 700;
  margin: 0;
`;
