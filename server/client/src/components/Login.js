import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import signpic from "../images/signin-image.jpg";

const Login = () => {
  // ==========call usecontext =======
  const { dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const LoginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!data || res.status === 400) {
      window.alert("invalid hai bhai tu");
      console.log("invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("perfect hai bhai tu");
      console.log("successful credentials");
      history.push("/");
    }
  };
  return (
    <>
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={signpic} alt="Login" />
              </figure>
              <NavLink to="/signup" className="signup-image-link">
                Create an account
              </NavLink>
            </div>

            <div to="signin-form">
              <h2 to="form-title">Log in</h2>
              <form method="POST" className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlfor="your_name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    id="your_name"
                    placeholder="Your Name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="your_pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                    onClick={LoginUser}
                  />
                </div>
              </form>
              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <li>
                    <NavLink to="#">
                      <i className="display-flex-center zmdi zmdi-facebook"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#">
                      <i className="display-flex-center zmdi zmdi-twitter"></i>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="#">
                      <i className="display-flex-center zmdi zmdi-google"></i>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
