import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userDetails, setUserDetails] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch("https://mern-zeta-rouge.vercel.app/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userDetails?.name,
          email: userDetails?.email,
          password: userDetails?.password,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      } else {
        alert(json?.message);
        navigate("/login");
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
    if (userDetails?.password !== userDetails?.confirmpassword) {
      alert("Password is incorrect");
    } else if (
      !userDetails?.name ||
      !userDetails?.email ||
      !userDetails?.password ||
      !userDetails?.confirmpassword
    ) {
      alert("Please fill all the details");
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="border relative px-4 pt-7 pb-8 bg-white shadow-lg shadow-slate-900 w-1/2 max-w-md mx-auto sm:px-10 rounded-b-md py-8">
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-center m-4 text-gray-600 text-lg">
            Create New Account
          </h1>
          <div className="form">
            <label>Name</label>
            <br />
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
              type="text"
              onChange={handleChange}
              name="name"
            />
            <br />
            <br />
            <label>Email</label>
            <br />
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
              type="email"
              onChange={handleChange}
              name="email"
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
              type="password"
              onChange={handleChange}
              name="password"
            />
            <br />
            <br />
            <label>Confirm Password</label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
              type="password"
              onChange={handleChange}
              name="confirmpassword"
            />
            <br />
            <br />
          </div>
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-40 rounded-full shadow-lg shadow-teal-900">
            SignUp
          </button>
          <br />
          <br />
          <p className="text-center justify-center">
            Already have an account?{" "}
            <Link to="/login">
              <b className="text-teal-500">Login</b>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
