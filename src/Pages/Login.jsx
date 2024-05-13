import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link,useNavigate } from 'react-router-dom';
import {app} from "../Firebase/Firebase";
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleSubmit(e){
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email,password);
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("User Logged In Successfully");
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode);
      });

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome to TodoMaster</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600  " onClick={togglePasswordVisibility} />
                ) : (
                  <FaEye className="text-gray-600 " onClick={togglePasswordVisibility} />
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-gray-700 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
