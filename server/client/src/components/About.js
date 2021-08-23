import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;

      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage()
  })

  return (
    <>
      <div className="container emp_profile mt-5">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="http://placeimg.com/640/480/people" alt="vasu" />
            </div>
            <div className="col-md-6">
              <div className="profile-head m-4">
                <h4 className="fs-1">{userData.name}</h4>
                <h6 className="fs-2 m-2">{userData.work}</h6>
                <p className="profile-rating mt-2 mb-5">
                  Ranking : <span>1/10</span>
                </p>
                <ul class="nav nav-tabs ml-3 py-3">
                  <li class="active">
                    <a class="mx-3" data-toggle="tab" href="#home">
                      Home
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#menu1">
                      profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-btn-edit my-5 rounded-pill"
                name="btnAddMore"
                value="edit profile"
              />
            </div>
          </div>
          <div className="row">
            {/* left side  */}
            <div className="col-md-4">
              <div className="profile m-4">
                <p>WORK LINK</p>
                <NavLink
                  to="#"
                  className="text-decoration-none"
                  target="_blank"
                >
                  Youtube
                </NavLink>
                <br />
                <NavLink
                  to="#"
                  className="text-decoration-none"
                  target="_blank"
                >
                  Instagram
                </NavLink>
                <br />
                <NavLink
                  to="#"
                  className="text-decoration-none"
                  target="_blank"
                >
                  Facebook
                </NavLink>
                <br />
                <NavLink
                  to="#"
                  className="text-decoration-none"
                  target="_blank"
                >
                  Twitter
                </NavLink>
                <br />
              </div>
            </div>
            {/* right side  */}
            <div className="col-md-8 pl-5 about-info">
              <div class="tab-content">
                <div id="home" class="tab-pane fade show active">
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>User id</p>
                    </div>
                    <div className="col-md-6">
                      <p>45756677567755</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>Name</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>Email</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>phone</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>Profession</p>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div id="menu1" class="tab-pane fade">
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>Experience</p>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>Hourly Rate</p>
                    </div>
                    <div className="col-md-6">
                      <p>10$/hr</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>Total Projects</p>
                    </div>
                    <div className="col-md-6">
                      <p>230</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>English Level</p>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row m-3">
                    <div className="col-md-6">
                      <p>Available</p>
                    </div>
                    <div className="col-md-6">
                      <p>Always</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
