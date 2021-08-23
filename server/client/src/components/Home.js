import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const UserHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    UserHomePage();
  }, []);
  return (
    <>
      <div className="home-page container position-center">
        <div className=" position-center">
          <h4 className="text-center">Hello</h4>
          <h1 className="text-center">{userName}</h1>
          <h3>
            {show ? `happy to see you back` : `kon hai bhai tu,me nhi janta`}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Home;
