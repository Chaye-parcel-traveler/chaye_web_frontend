type FormErrorProps = {
  id?: string;
  message?: string;
};

function FormError({ id, message }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="text-danger mt-1 mb-0" id={id} role="alert">
      {message}
    </p>
  );
}

export default FormError;
