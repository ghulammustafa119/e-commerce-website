"use client"
import { useState } from 'react';
import { MdOutlineEmail } from "react-icons/md";

export default function Offers() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    setTimeout(() => {
      setLoading(false);
      setMessage("Thank you for subscribing!");
      setEmail("");
    }, 1500);
  };

  return (
    <main className="w-full flex justify-center items-center max-w-screen-2xl mx-auto p-4">
      <div className="w-full sm:w-[80%] bg-black text-white flex flex-col sm:flex-row justify-between items-center p-5 rounded-2xl space-y-4 sm:space-y-0">
        {/* Heading Section */}
        <div className="flex flex-col text-center sm:text-left">
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            STAY UP TO DATE ABOUT
          </h1>
          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
             OUR LATEST OFFERS
          </h1>
        </div>

        {/* Subscription Section */}
        <div className="flex flex-col space-y-3 w-full sm:w-auto">
          {/* Input Section */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <MdOutlineEmail className="text-xl text-black" />
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email..."
              className="w-full ml-2 outline-none bg-transparent"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          {/* Button Section */}
          <button
            className="w-full sm:w-auto bg-gray-100 text-black rounded-full px-6 py-2 font-semibold hover:bg-gray-200"
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe to Newsletter"}
          </button>

          {/* Message Section */}
          {message && (
            <p className={`text-sm ${message.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
