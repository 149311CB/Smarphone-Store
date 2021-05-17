import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {userLoginAction} from '../actions/UserActions'

const LoginScreen = ({location, history}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userLoginAction(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <>
      <form className="login-form" onSubmit={submitHandler}>
        {error ? <div className="form-error">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input id="email-input" type="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password-input">Password</label>
          <input id="password-input" type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div style={{fontSize: "0.813rem", marginBottom: "0.6rem"}} className="link-to-register"><Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>New user? Register!</Link></div>
        <button>Đăng nhập</button>
      </form>
    </>
  )
}

export default LoginScreen

