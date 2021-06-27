import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const Login = () => {
  const componentClicked = () => console.log("clicked");
  const responseFacebook = (res) => console.log(res);
  const responseGoogle = async (response) => console.log(response);

  return (
    <Fragment>
      <div className="login">
        <div className="ui basic  aligned segment">
          <h1 className="center">Login</h1>
          <div className="ui action left icon input">
            <form className="ui form">
              <div className="field left">
                <label>Username</label>
                <div className="ui left icon input">
                  <input type="text" placeholder="Username" />
                  <i aria-hidden="true" className="user icon"></i>
                </div>
              </div>
              <div className="field left">
                <label>Password</label>
                <div className="ui left icon input">
                  <input type="password" />
                  <i aria-hidden="true" className="lock icon"></i>
                </div>
              </div>
              <button className="ui primary button">Login</button>
              <div className="ui hidden divider"></div>
              <p>
                If you are not user plz{" "}
                <Link to="/registrasiton">Registrasiton</Link>
              </p>
            </form>
          </div>
          <div className="ui hidden divider"></div>
          <div className="ui horizontal divider">Or</div>
          <div className="ui hidden divider"></div>
          <FacebookLogin
            appId="188474982588826"
            autoLoad={false}
            fields="name,email,picture"
            onClick={componentClicked}
            callback={responseFacebook}
            cssClass="ui facebook button"
            icon={<i aria-hidden="true" className="facebook icon"></i>}
            textButton="Facebook"
          />
          <GoogleLogin
            clientId="31144990250-s0v60qto08dsfnerqp65dt1t4pno439r.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            className="ui google plus button"
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <button
                className="ui google plus button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i aria-hidden="true" className="google plus icon"></i>
                Google Plus
              </button>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
