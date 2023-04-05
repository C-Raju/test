import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [userDetails, setUserDetails] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        context?.handleLogin();
        navigate("/");
      }
    } catch (err) {
      throw err;
    }
  }, [context, navigate]);

  const handleLogin = async () => {
    try {
      const response = await fetch("https://mern-zeta-rouge.vercel.app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails?.email,
          password: userDetails?.password,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      } else {
        alert(json?.message);
        localStorage.setItem("token", json?.token);
        context?.handleLogin();
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userDetails?.email || !userDetails?.password) {
      alert("Email or password is missing");
    } else {
      handleLogin();
    }
  };
  return (
    <div className="flex items-center justify-center py-20">
      <div className="border relative px-4 pt-7 pb-8 bg-white shadow-lg shadow-slate-900 w-1/2 max-w-md mx-auto sm:px-10 rounded-b-md py-8">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-center m-4 text-gray-600 text-lg">
            Login
          </h1>
          <div className="form">
            <label>Email</label>
            <br />
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
              type="email"
              name="email"
              onChange={handleChange}
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
              type="password"
              name="password"
              onChange={handleChange}
            />
            <br />
            <br />
          </div>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-40 rounded-full shadow-lg shadow-teal-900">
            Login
          </button>
        </form>
        <br />
        <p className="text-center justify-center">
          Don't have an account?{" "}
          <Link to="/signup">
            <b className="text-teal-500">Sign Up</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
