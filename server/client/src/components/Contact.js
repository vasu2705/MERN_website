import React, { useEffect, useState } from "react";
import signpic from "../images/1.svg";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const UserContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (!res.status === 201) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    UserContact();
  }, []);

  //we are storing data
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  //=== send data to backend ==========
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data || res.status === 400) {
      console.log("data not send");
    } else {
      alert("message send khush hoja");
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-image">
              <figure>
                <img src={signpic} alt="sing up" />
              </figure>
            </div>
            <div className="signup-form">
              <h2 className="form-title">Contact Us</h2>

              <form className="register-form" method="POST" id="register-form">
                <div className="form-group">
                  <label htmlfor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    onChange={handleInputs}
                    value={userData.name}
                    autoComplete="off"
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
                    onChange={handleInputs}
                    value={userData.email}
                    autoComplete="off"
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
                    onChange={handleInputs}
                    value={userData.phone}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlfor="work">
                    <i className="zmdi zmdi-border-color"></i>
                  </label>
                  <input
                    type="text"
                    name="message"
                    id="work"
                    placeholder=" Your feedback"
                    onChange={handleInputs}
                    value={userData.message}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="submit"
                    id="submit"
                    className="form-submit"
                    value="Submit"
                    onClick={contactForm}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
