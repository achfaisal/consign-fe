import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Login({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      await axios.post("http://localhost:9002/login", data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error(error.response.data.error);
      setLoginMessage(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white px-6 pt-10 pb-8 shadow-xl sm:rounded-lg sm:px-10 w-96">
        <div className="mx-auto max-w-md">
          <div className="divide-y divide-gray-300/50">
            <div className="space-y-6 text-base leading-7 text-gray-600 pb-6">
              <h1>Login Form</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-start"
              >
                <div
                  role="alert"
                  className={`alert alert-error ${
                    loginMessage ? "" : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{loginMessage}</span>
                </div>
                <label className="form-control w-full max-w-xs">
                  <div className="label my-3 p-0">
                    <span className="label-text">Username</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className="label my-3 p-0">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <div className="text-center mx-auto mt-6">
                  <button className="btn btn-primary w-full" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="pt-6 text-base font-semibold leading-7">
              <p className="text-gray-900">Dont have an account?</p>
              <p>
                <Link
                  to="/register"
                  className="text-sky-500 hover:text-sky-600"
                >
                  Register Now →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
