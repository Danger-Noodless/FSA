import React, { useState } from 'react';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = (event) => {
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
        alert(data); 
      })
      .catch(error => {
        setError(error.message);
      });
  };
  return (
    <>
      <h3>Sign Up</h3>
      <form action="#" onSubmit={sendSignup}>
        <div>
          <label htmlFor="signup-username">UserName</label>
          <input type="text" id="signup-username"/>
        </div>
        <div>
          <label htmlFor="signup-password">Password</label>
          <input type="password" id="signup-password"/>
        </div>
        <input type="button" value="Submit"/>
      </form>
    </>
  )
}

export default Signup