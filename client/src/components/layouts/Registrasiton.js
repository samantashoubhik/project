import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import Axios from "axios";

const Registrasiton = () => {
  const [fromData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    varified: false,
  });
  const registerByfbAndGoogle = async (name, email) => {
    const data = {
      username: name,
      email,
      varified: true,
    };
    const body = JSON.stringify(data);
    console.log(body);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await Axios.post("/auth", body, config);
    console.log(res.data);
  };

  const responseFacebook = (response) => {
    console.log(response);
    registerByfbAndGoogle(response.name, response.email);
  };
  const responseGoogle = async (response) => {
    registerByfbAndGoogle(
      response.profileObj.familyName,
      response.profileObj.email
    );
  };

  // from
  const onChange = (e) => {
    setFromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (fromData.password === fromData.confirmPassword) {
      const { username, email, varified, password } = fromData;
      const data = {
        username,
        email,
        varified,
        password,
      };
      const body = JSON.stringify(data);
      console.log(body);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await Axios.post("/auth/registration", body, config);
      console.log(res.data);
    } else {
      console.log("Password not match");
    }
  };
  return (
    <Fragment>
      <div className="login">
        <div className="ui basic  aligned segment">
          <h1 className="center">Registrasiton</h1>
          <div className="ui action left icon input">
            <form className="ui form" onSubmit={onSubmit}>
              <div className="field left">
                <label>Username</label>
                <div className="ui left icon input">
                  <input
                    type="text"
                    placeholder="User name"
                    name="name"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  <i aria-hidden="true" className="user icon"></i>
                </div>
              </div>
              <div className="field left">
                <label>Email</label>
                <div className="ui left icon input">
                  <input
                    type="text"
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  <i aria-hidden="true" className="mail icon"></i>
                </div>
              </div>
              <div className="field left">
                <label>Password</label>
                <div className="ui left icon input">
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  <i aria-hidden="true" className="lock icon"></i>
                </div>
              </div>
              <div className="field left">
                <label>Confirm Password</label>
                <div className="ui left icon input">
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    onChange={(e) => onChange(e)}
                  />
                  <i aria-hidden="true" className="lock icon"></i>
                </div>
              </div>
              <button className="ui primary button">Registrasiton</button>
              <div className="ui hidden divider"></div>
              <p>
                if you are user plz <Link to="/">Login</Link>{" "}
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
                disabled={renderProps.disabled}
                onClick={renderProps.onClick}
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

export default Registrasiton;
