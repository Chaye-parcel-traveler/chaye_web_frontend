type FormErrorProps = {
  id?: string;
  message?: string;
};

function FormError({ id, message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="form-submit-message error" id={id} role="alert">
      {message}
    </p>
  );
}

export default FormError;
