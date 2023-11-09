import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the state needed to handle the input field for the user's email.
// Implement a form within the component that captures the email address.
// Handle the form submission to send a password reset request.
// Implement the logic to communicate with the backend (API) for sending the password reset email.
// Display appropriate messages for success or error feedback.


// ROUTING NOT DONE
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming we have an API endpoint 'api/forgot-password' that handles the password reset logic
    try {
      const response = await fetch('api/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // Assuming the API returns a message field
        // Redirect user or give some indication to check their email
        // navigate('/some-confirmation-page');
      } else {
        throw new Error(data.message || 'Something went wrong oh nose!');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h3>Reset Password</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="forgot-email">Email</label>
          <input
            type="email"
            id="forgot-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
