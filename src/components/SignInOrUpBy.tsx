const SignInOrUpBy = () => {
  return (
    <>
      <div className="line"></div>

      <div className="media-options">
        <a href="#" className="field facebook">
          <i className="bx bxl-facebook facebook-icon"></i>
          <span>Se connecter avec Facebook</span>
        </a>
      </div>

      <div className="media-options">
        <a href="#" className="field google">
          <img src="images/google.png" alt="" className="google-img" />
          <span>Se connecter avec Google</span>
        </a>
      </div>

      <div className="media-options">
        <a href="#" className="field apple">
          <i className="bx bxl-apple apple-icon"></i>
          <span>Se connecter avec Apple</span>
        </a>
      </div>
    </>
  );
};

export default SignInOrUpBy;
