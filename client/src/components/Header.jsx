import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(currentUser);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">My</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="search..."
            className="bg-transparent focus:outline-none w-24 sm:w-96"
          />
          <button>
            <FaSearch className="text-slate-600 " />
          </button>
        </form>
        <ul className="flex justify-center items-center gap-3">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>

          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="w-10 h-10 rounded-full"
                src={currentUser?.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline cursor-pointer">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
