import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = (event) => {
    console.log(username, password)
    event.preventDefault();
    setError('');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    // POST req to '/api/signup' route in server
    fetch('/api/signup', requestOptions)
      .then(async (response) => {
        if (!response.ok) {
          const error = (await response.json()).err || 'An unexpected error occurred oh nose!';
          throw new Error(error);
        }
        return response.json(); 
      })
      .then(data => {
        // Handle data after signup
        // alert(data); 
        // data = {username, password}
        const {password} = data
        
        // pass in the states
        const hashpassword = password;
        // rerender
        navigate('/signedIn', {state : {username, hashpassword}})
      })
      .catch(error => {
        setError(error.message);
      });
  };
  
  return (
    // <div className="flex justify-center content-center">


    //   <form onSubmit={handleSignUp} className="flex flex-col justify-center items-center w-1/4 my-10 border-dashed border-2">
    //     <h2>Sign Up</h2>
    //     {error && <p className="error">{error}</p>}

    //     <div className="flex space-x-4 items-center border-dashed border-2">
    //       <label htmlFor="username">Username</label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //     </div>

    //     <div className="flex space-x-4 items-center border-dashed border-2">
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>


    //     <button className="bg-blue-500 self-end p-3" type="submit">Sign Up</button>
    //   </form>
    // </div>
    
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 mt-14">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <form className="space-y-6" action="#" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign Up
              </button>
            </div>
          </form>

        </div>
      </div>
  );
}

export default Signup


