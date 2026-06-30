type StarRatingProps = {
  name: string;
  value?: number | null;
  readOnly?: boolean;
};

function StarRating({ name, value = 1, readOnly = false }: StarRatingProps) {
  if (readOnly) {
    const roundedValue = Math.round((value ?? 0) * 2) / 2;
    return (
      <span aria-label={`Note : ${roundedValue} sur 5`}>
        {'★'.repeat(Math.floor(roundedValue))}
        {'☆'.repeat(5 - Math.floor(roundedValue))}
      </span>
    );
  }

  return (
    <select
      className="form-select"
      defaultValue={value ?? 1}
      id={name}
      name={name}
    >
      {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
        <option key={rating} value={rating}>
          {rating} / 5
        </option>
      ))}
    </select>
  );
}

export default StarRating;
