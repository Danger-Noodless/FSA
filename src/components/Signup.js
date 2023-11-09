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

    // POST request to the '/api/signup' route in server
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
  <div className="signup-container">
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">Username Fam</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
);
//   return (
//     <div className="signup-container">
//       {/* The form elements for username and password */}
//       <form onSubmit={handleSignUp}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       {/* Display any error messages here? */}
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

export default SignUp;




// import React from 'react'

// const Signup = () => {
//   // need to work on it
//   const sendSignup = () => {
//     return;
//   }
//   return (
//     <>
//       <h3>Sign Up</h3>
//       <form action="#" onSubmit={sendSignup}>
//         <div>
//           <label htmlFor="signup-username">UserName</label>
//           <input type="text" id="signup-username"/>
//         </div>
//         <div>
//           <label htmlFor="signup-password">Password</label>
//           <input type="password" id="signup-password"/>
//         </div>
//         <input type="button" value="Submit"/>
//       </form>
//     </>
//   )
// }

// export default Signup