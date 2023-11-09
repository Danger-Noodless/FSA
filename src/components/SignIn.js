import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [form, setForm] = useState('');
  const navigate = useNavigate();

  // const testFunc = () => {
  //   fetch('api/test') // expect request to localhost 8080 /api/test -> then proxy knows to route to server at localhost 3000
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(e => console.log(e));
  // };
  // testFunc();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted!');
    const username = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    console.log(username, password);
    // e.target.reset();

    fetch('api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // if (!res.ok) {
        // promise.reject('Bad status')
        // }
        return res.json();
      })
      .then((credentials) => {
        console.log('credentials in signin.js', credentials);
        navigate('/signedIn', { state: credentials });
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 mt-14">
        <div className="">
          <h2 className="mt-10 text-center text-2xl font-bold text-gray-800">
            Sign in to calculate the optimal FSA contribution for you!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
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
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a
              href="#"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
