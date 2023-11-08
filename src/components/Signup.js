import React from 'react'

const Signup = () => {
  // need to work on it
  const sendSignup = () => {
    return;
  }
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