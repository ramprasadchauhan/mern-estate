/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const fetLandlord = async () => {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      };
      fetLandlord();
    } catch (error) {
      console.log(error.message);
    }
  }, [listing.userRef]);
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold"> {landlord.username} </span>
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message"
            className="w-full p-3 rounded-lg"
          ></textarea>
          <Link
            className="bg-slate-700 text-white text-center p-2 uppercase rounded-lg hover:opacity-95"
            to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
