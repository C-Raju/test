import { useState, useEffect } from "react";
import PrivateRoute from "./PrivateRoute";
import { Link } from "react-router-dom";

const ListBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://mern-zeta-rouge.vercel.app/blog/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        setBlogs(json.blogs);
      } catch (err) {
        throw new Error(`New Error Occured - ${err}`);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://mern-zeta-rouge.vercel.app/blog/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      const filteredData = blogs?.filter((item) => item._id !== id);
      setBlogs(filteredData);
      if (!json?.isSuccess) {
        alert(json?.message);
      } else {
        alert(json?.message);
      }
    } catch (err) {
      alert(err);
      throw err;
    }
  };

  return (
    <PrivateRoute>
      <div className="font-serif">
        <h1 className="py-6 text-center font-bold shadow-lg">List Blogs</h1>
        <div className="w-3/5 mt-4 mx-auto">
          {blogs?.map((item, index) => (
            <div className="py-4">
              <div
                className="bg-teal-500 border rounded shadow-lg shadow-slate-900 w-3/4 mx-w-lg  mx-auto px-6 py-2"
                key={index}
              >
                <Link className="blog-link" to="/">
                  <h1 className="font-bold text-xl">{item?.title}</h1>
                  <hr className="h-1 bg-slate-50"></hr>
                  <p className="overflow-y-auto h-40 break-words">
                    {item?.content}
                  </p>
                  <hr className="h-1 bg-slate-50"></hr>
                  <h3>Posted by~@{item?.author}</h3>
                </Link>
                <div className="flex items-center gap-5">
                  <Link
                    className="w-full flex justify-end"
                    to={`/edit/${item?._id}`}
                  >
                    <button className="font-medium text-yellow-500 font-bold">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-6 rounded shadow-lg "
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ListBlogs;