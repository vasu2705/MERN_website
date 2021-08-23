import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import signpic from "../images/signup-image.jpg";
const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleinputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if ( data || res.status!== 422) {
      window.alert("successful data");
      console.log("successful registration");
      history.push("/login");
    } else {
      window.alert("invalid data");
      console.log("invalid registration");
    }
  };
  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlfor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    autoComplete="off"
                    value={user.name}
                    onChange={handleinputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleinputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="phone">
                    <i className="zmdi zmdi-phone-in-talk"></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder=" Your number"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleinputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="work">
                    <i className="zmdi zmdi-slideshow"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    placeholder=" Your Profession"
                    autoComplete="off"
                    value={user.work}
                    onChange={handleinputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="password">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleinputs}
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="cpassword">
                    <i className="zmdi zmdi-lock-outline"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Repeat your password"
                    autoComplete="off"
                    value={user.cpassword}
                    onChange={handleinputs}
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                    onClick={PostData}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={signpic} alt="sing up" />
              </figure>
              <NavLink to="/login" className="signup-image-link">
                I am already member
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
