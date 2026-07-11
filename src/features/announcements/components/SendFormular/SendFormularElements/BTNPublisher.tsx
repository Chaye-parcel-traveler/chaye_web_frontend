import { useAccountRestrictions } from '../../../../members/components/AccountStatusNotice';

const BTNPublisher = () => {
  const { isRestricted } = useAccountRestrictions();

  return (
    <div className="container content" style={{ marginTop: '25px' }}>
      <div className="row align-items-center content">
        <div className="col-12 text-center">
          <button
            type="button"
            className="btn btn-secondary px-4 py-3"
            data-toggle="modal"
            data-target="#exampleModalCenter"
            disabled={isRestricted}
            title={
              isRestricted
                ? 'Action indisponible avec un compte suspendu ou banni'
                : undefined
            }
          >
            Publier votre annonce
          </button>
        </div>
      </div>
    </div>
  );
};

export default BTNPublisher;
