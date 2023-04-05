import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const context = useContext(AuthContext);
  return (
    context?.isUserLoggedIn && (
      <div className="font-serif ">
        <nav className="bg-teal-500 w-auto text-white  shadow-md shadow-slate-900">
          <ul className="md:flex mx-8">
            <div className="md:flex mr-18">
              <img
                src="/img/pngaaa.com-5167393.png"
                alt="logo"
                className="h-14"
              />
              <li className="py-4 font-bold">FOODBLOG</li>
            </div>
            <div className="md:flex items-center ml-5 justify-end w-full">
              <li className="cursor-pointer mr-40">
                <Link to="/">HOME</Link>
              </li>
              <li className="cursor-pointer mr-40">
                <Link to="/add">ADDBLOG</Link>
              </li>
              <button
                type="button"
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full shadow-lg shadow-red-200 "
                onClick={() => context?.handleLogout()}
              >
                LOGOUT
              </button>
            </div>
          </ul>
        </nav>
      </div>
    )
  );
};

export default Navbar;
