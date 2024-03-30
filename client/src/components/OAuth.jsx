import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      console.log(result);
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      console.log("Could not loading with google ", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 rounded-lg uppercase p-3 text-white hover:opacity-95"
    >
      Continue with google
    </button>
  );
};

export default OAuth;
