import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AddBlog = () => {
  const [blogDetails, setBlogDetails] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setBlogDetails({ ...blogDetails, [event.target.name]: event.target.value });
  };

  const handleAddBlog = async () => {
    try {
      const response = await fetch(`https://mern-1xrisztsn-c-raju.vercel.app/blog/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: blogDetails?.title,
          content: blogDetails?.content,
          author: blogDetails?.author,
        }),
      });
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json?.message);
      } else {
        alert(json?.message);
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!blogDetails?.title || !blogDetails?.content || !blogDetails?.author) {
      alert("Please fill all the required properties");
    } else {
      handleAddBlog();
    }
  };
  return (
    <PrivateRoute>
      <div className="flex items-center justify-center py-8 font-serif">
        <div className="border relative px-4 pt-7 pb-8 bg-white shadow-lg shadow-slate-900 w-1/2 max-w-md mx-auto sm:px-10 rounded-b-md py-8">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-center m-4 text-gray-600 text-lg">
              Add Blog
            </h1>
            <div className="form">
              <label>Title</label>
              <br />
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
                type="text"
                onChange={handleChange}
                name="title"
                placeholder="eg:Food Blog"
              />
              <br />
              <br />
              <label>Content</label>
              <br />
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
                name="content"
                placeholder="Write Blog here..."
                onChange={handleChange}
              />
              <br />
              <br />
              <label>Author</label>
              <br />
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
                name="author"
                type="text"
                onChange={handleChange}
                placeholder="eg:Glenn Quagmire"
              />
              <br />
              <br />
            </div>
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full shadow-lg shadow-teal-900">
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AddBlog;
