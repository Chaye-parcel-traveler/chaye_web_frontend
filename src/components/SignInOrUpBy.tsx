const SignInOrUpBy = () => {
  return (
    <>
      <div className="line"></div>

      <div className="media-options">
        <button type="button" className="field facebook">
          <i className="bx bxl-facebook facebook-icon"></i>
          <span>Se connecter avec Facebook</span>
        </button>
      </div>

      <div className="media-options">
        <button type="button" className="field google">
          <img src="images/google.png" alt="" className="google-img" />
          <span>Se connecter avec Google</span>
        </button>
      </div>

      <div className="media-options">
        <button type="button" className="field apple">
          <i className="bx bxl-apple apple-icon"></i>
          <span>Se connecter avec Apple</span>
        </button>
      </div>
    </>
  );
};

export default SignInOrUpBy;
