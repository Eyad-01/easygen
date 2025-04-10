import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const getemailfromtoken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (data) {
        setEmail(data.user.email);
      }
    } catch (err: any) {
      console.error("Error token in:", err);
    }
  };
  useEffect(() => {
    getemailfromtoken();
  }, []);
  return (
    <div>
      <h1>Welcome to the application.</h1>
      <p>Your email is: {email}</p>
    </div>
  );
};

export default Home;
