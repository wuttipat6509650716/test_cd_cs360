import Link from 'next/link';
import { useState } from 'react';
import { getStrapiURL } from '../../utils';

const Register = ({ Register }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [job, setJob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmpass] = useState('');

  const checkPass = () => {
    return password === confirmPass;
  };

  const checkPassMin = () => {
    return password.length >= 6;
  };

  async function handleRegister(event) {
    event.preventDefault();

    if (!checkPass()) {
      alert("Passwords do not match.");
      return;
    }

    if(!checkPassMin()) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const registerInfo = {
      username: username,
      email: email,
      job: job,
      password: password,
    };

    try {
      const response = await fetch(getStrapiURL("/auth/local/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerInfo),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        console.log(data);
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
      <Link href="/">
          <a className="absolute inline-flex items-center top-4 left-4 focus:outline-none">
            <img
              src="/arrow_back.png"
              alt="Back"
              className="w-6 h-6 mr-2 hover:opacity-80 transition duration-150 ease-in-out"
            />
            Back
          </a>
        </Link>
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Job"
            className="w-full px-4 py-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(event) => setJob(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(event) => setPassword(event.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(event) => setConfirmpass(event.target.value)}
          />

          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
            REGISTER 
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account? <Link href="#" className="text-green-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;