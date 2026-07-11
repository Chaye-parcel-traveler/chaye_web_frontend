import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { createReport, ReportTargetType } from '../api/moderation.api';
import { reportSchema, type ReportFormValues } from '../moderation.schemas';

type ReportButtonProps = {
  targetType: ReportTargetType;
  targetId?: string | number;
  targetLabel: string;
};

const reportReasons = [
  'Contenu suspect',
  'Profil inapproprié',
  'Annonce trompeuse',
  'Comportement abusif',
  'Autre',
];

const ReportButton = ({
  targetType,
  targetId,
  targetLabel,
}: ReportButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<ReportFormValues>({
    defaultValues: {
      description: '',
      reason: reportReasons[0],
    },
    mode: 'onChange',
    resolver: zodResolver(reportSchema),
  });

  const closeModal = () => {
    setIsOpen(false);
    setStatus('idle');
    setMessage('');
    reset();
  };

  const submitReport = handleSubmit(async (values) => {
    setStatus('loading');
    setMessage('');

    try {
      await createReport({
        targetType,
        targetId,
        reason: values.reason,
        description: values.description,
      });
      setStatus('success');
      setMessage('Signalement transmis. Notre équipe va le vérifier.');
      reset({
        description: '',
        reason: reportReasons[0],
      });
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Impossible de transmettre le signalement.',
      );
    }
  });

  return (
    <>
      <ReportTrigger type="button" onClick={() => setIsOpen(true)}>
        Signaler
      </ReportTrigger>

      {isOpen && (
        <Overlay role="presentation">
          <Dialog
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-title"
          >
            <DialogHeader>
              <h3 id="report-title">Signaler {targetLabel}</h3>
              <CloseButton
                type="button"
                onClick={closeModal}
                aria-label="Fermer"
              >
                ×
              </CloseButton>
            </DialogHeader>

            <form onSubmit={submitReport} noValidate>
              <FieldGroup>
                <label htmlFor="report-reason">Motif</label>
                <select
                  id="report-reason"
                  {...register('reason')}
                  aria-invalid={Boolean(errors.reason)}
                >
                  {reportReasons.map((reportReason) => (
                    <option value={reportReason} key={reportReason}>
                      {reportReason}
                    </option>
                  ))}
                </select>
                {errors.reason ? (
                  <ErrorText>{errors.reason.message}</ErrorText>
                ) : null}
              </FieldGroup>

              <FieldGroup>
                <label htmlFor="report-description">
                  Description optionnelle
                </label>
                <textarea
                  id="report-description"
                  {...register('description')}
                  aria-invalid={Boolean(errors.description)}
                  rows={4}
                  placeholder="Ajoutez un contexte utile pour la modération."
                />
                {errors.description ? (
                  <ErrorText>{errors.description.message}</ErrorText>
                ) : null}
              </FieldGroup>

              {message && (
                <StatusMessage $status={status}>{message}</StatusMessage>
              )}

              <Actions>
                <SecondaryButton type="button" onClick={closeModal}>
                  Annuler
                </SecondaryButton>
                <PrimaryButton
                  type="submit"
                  disabled={status === 'loading' || !isValid}
                >
                  {status === 'loading' ? 'Envoi...' : 'Envoyer'}
                </PrimaryButton>
              </Actions>
            </form>
          </Dialog>
        </Overlay>
      )}
    </>
  );
};

const ReportTrigger = styled.button`
  border: 1px solid #ec634e;
  border-radius: 50px;
  background: #fff;
  color: #ec634e;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 18px;
`;

const Overlay = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.42);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: 20px;
  position: fixed;
  z-index: 200;
`;

const Dialog = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
  max-width: 440px;
  padding: 24px;
  width: 100%;
`;

const DialogHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;

  h3 {
    color: #1f1f1f;
    font-size: 20px;
    margin: 0;
    text-align: left;
  }
`;

const CloseButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  color: #4f4294;
  cursor: pointer;
  display: inline-flex;
  font-size: 28px;
  height: 34px;
  justify-content: center;
  width: 34px;
`;

const FieldGroup = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 14px;

  label {
    color: #383838;
    font-size: 14px;
    font-weight: 700;
  }

  select,
  textarea {
    border: 1px solid #cacaca;
    border-radius: 6px;
    font: inherit;
    padding: 10px 12px;
    width: 100%;
  }
`;

const StatusMessage = styled.p<{
  $status: 'idle' | 'loading' | 'success' | 'error';
}>`
  color: ${({ $status }) => ($status === 'error' ? '#b3261e' : '#0b6b3a')};
  font-size: 14px;
  margin: 8px 0 0;
`;

const ErrorText = styled.p`
  color: #b3261e;
  font-size: 13px;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  background: #4f4294;
  border: 0;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  padding: 10px 22px;

  &:disabled {
    cursor: wait;
    opacity: 0.7;
  }
`;

const SecondaryButton = styled.button`
  background: #fff;
  border: 1px solid #cacaca;
  border-radius: 50px;
  color: #383838;
  cursor: pointer;
  font-weight: 700;
  padding: 10px 22px;
`;

export default ReportButton;
