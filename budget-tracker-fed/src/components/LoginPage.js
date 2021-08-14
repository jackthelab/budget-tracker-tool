import { useState } from 'react';

// style import
import '../styles/LoginPage.css';

export const LoginPage = () => {

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  return(
    <div>
      <h1>Login or Signup</h1>
      <form>
        <label className="loginLabel">Email</label>
        <input
          className="loginInput"
          type='email'
          value={loginEmail}
          onChange={
            (e) => setLoginEmail(e.target.value)
          }
          placeholder="Your email Here"
        />
        <label className="loginLabel">Password</label>
        <input
          className="loginInput"
          type="password"
          autoComplete="off"
          value={loginPassword}
          onChange={
            (e) => setLoginPassword(e.target.value)
          }
          placeholder="Your Password"
        />
        <button
          type="submit"
          onClick={
            (e) => {
              e.preventDefault()
              console.log(
                `check login with ${loginEmail} and ${loginPassword}`
              )
            }
          }
        >
          Submit
        </button>
      </form>
    </div>
  )
}