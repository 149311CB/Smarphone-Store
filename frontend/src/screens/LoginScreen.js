import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {userLoginAction} from '../actions/UserActions'
import ClipLoader from "react-spinners/ClipLoader";
import {pushCartToServer} from "../actions/CartActions";
import {PUSH_CART_RESET} from "../constants/CartConstants";

const LoginScreen = ({location, history}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin
  const {isCheckout} = useSelector(state => state.checkoutPending)
  const {loading:pushLoading,error:pushError,message:pushMessage} = useSelector(state => state.pushCart)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userLoginAction(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      const localCart = JSON.parse(localStorage.getItem("cart"))
      if(localCart){
        localStorage.removeItem("cart")
        dispatch(pushCartToServer(localCart.products))
        return;
      }
      if(pushMessage && isCheckout){
        history.push("/checkout")
        // dispatch({type:PUSH_CART_RESET})
        return
      }
      if(userInfo.role === "admin"){
        history.push("/admin")
        return
      }
      history.push("/")
    }
  }, [history, userInfo, pushMessage])

  return (
    <>
      {
        loading && pushLoading ? <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div> :
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
            <div style={{fontSize: "0.813rem", marginBottom: "0.6rem"}} className="link-to-register">
              <Link to={"/register"}>New user? Register!</Link></div>
            <button>Đăng nhập</button>
          </form>
      }
    </>
  )
}

export default LoginScreen
