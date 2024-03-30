import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);

      if (data.success === false) {
        setError(true);

        return;
      }
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  // console.log(username, email, password);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          // value={username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
          // onChange={(e) => {
          //   e.preventDefault();
          //   setUsername(e.target.value);
          // }}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          // value={email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
          // onChange={(e) => {
          //   e.preventDefault();
          //   setEmail(e.target.value);
          // }}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          // value={password}
          className="border p-3 rounded-lg"
          onChange={handleChange}
          // onChange={(e) => {
          //   e.preventDefault();
          //   setPassword(e.target.value);
          // }}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="mt-5">
        <p>
          Have an account?
          <span className="text-blue-500 pl-2 hover:underline">
            <Link to="/sign-in">Sign In </Link>
          </span>
        </p>
      </div>
      <p className="text-red-700 mt-5"> {error && "Something went wrong!"} </p>
    </div>
  );
};

export default SignUp;
