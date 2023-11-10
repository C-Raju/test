import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const EditBlog = () => {
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://mern-1xrisztsn-c-raju.vercel.app/blog/get/${params?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        const json = await response.json();
        if (!json?.isSuccess) {
          throw new Error(json?.message);
        } else {
          setBlog({
            title: json?.blogExists?.name,
            content: json?.blogExists?.content,
            author: json?.blogExists?.author,
          });
        }
      } catch (err) {
        alert(err);
      }
    })();
  }, [params?.id]);

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `https://mern-1xrisztsn-c-raju.vercel.app/blog/edit/${params?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            title: blog?.title,
            content: blog?.content,
            author: blog?.author,
          }),
        }
      );
      const json = await response.json();
      if (!json?.isSuccess) {
        throw new Error(json.message);
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
    if (!blog?.title || !blog?.content || !blog?.author) {
      alert("Please fill all the required properties");
    } else {
      handleEdit();
    }
  };

  const handleChange = (event) => {
    setBlog({ ...blog, [event.target.name]: event.target.value });
  };

  return (
    <PrivateRoute>
      <div className="flex items-center justify-center py-8 font-serif">
        <div className="border relative px-4 pt-7 pb-8 bg-white shadow-lg shadow-slate-900 w-1/2 max-w-md mx-auto sm:px-10 rounded-b-md py-8">
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold text-center m-4 text-gray-600 text-lg">
              Edit Blog
            </h1>
            <div className="form">
              <label>Title</label>
              <br />
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
                type="text"
                placeholder="eg:Food"
                name="title"
                onChange={handleChange}
                value={blog?.title}
              />
              <br />
              <br />
              <label>Content</label>
              <br />
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
                placeholder="Edited Blog Content..."
                name="content"
                onChange={handleChange}
                value={blog?.content}
              />
              <br />
              <br />
              <label>Author</label>
              <br />
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 drop-shadow-lg"
                type="text"
                placeholder="eg:Glenn Quagmire"
                name="author"
                onChange={handleChange}
                value={blog?.author}
              />
              <br />
              <br />
            </div>
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full shadow-lg shadow-teal-900">
              Edit Blog
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default EditBlog;
