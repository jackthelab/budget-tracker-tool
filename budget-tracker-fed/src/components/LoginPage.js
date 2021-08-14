import { useState } from 'react';

// style import
import '../styles/LoginPage.css';

export const LoginPage = () => {

  const [loginEmail, setLoginEmail] = useState(undefined);

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
          placeholder="Your email Here" />
          <button
            type="submit"
            onClick={
              () => console.log(`check ${loginEmail} for login or signup`)
            }
          >
            Submit
          </button>
      </form>
    </div>
  )
}