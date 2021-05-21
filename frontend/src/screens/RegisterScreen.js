import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import DateTimePicker from '../components/DateTimePicker'
import {userRegisterAction} from '../actions/UserActions'
import ClipLoader from "react-spinners/ClipLoader";

const RegisterScreen = ({location, history}) => {
  const dispatch = useDispatch()
  const [lastName, setLastName] = useState()
  const [firstName, setFistName] = useState()
  const [email, setEmail] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [password, setPassword] = useState()
  const [confimPassword, setConfirmPassword] = useState()
  const [birthday, setBirthday] = useState()
  const [gender, setGender] = useState(1)
  const [message, setMessage] = useState(null)
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const {loading, error, userInfo} = userRegister
  const getISODate = (e) => {
    setBirthday(e)
  }
  const submitHandler = (e) => {
    e.preventDefault()
    if (password != confimPassword) {
      setMessage("Password not match")
      return;
    }
    dispatch(userRegisterAction({lastName, firstName, email, phoneNumber, password, birthday, gender}))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  return (
    <>
      {

        loading ? <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div> :
          <form className="register-form" onSubmit={submitHandler}>
            <div className="form-group-container">
              <div className="form-group">
                <label htmlFor="lastname-input">Họ</label>
                <input id="lastname-input" type="text" onChange={e => setLastName(e.target.value)} />
                {error && error.includes("lastName") ? <div className="form-error">Last name must not be empty</div> : ""}
              </div>
              <div className="form-group">
                <label htmlFor="firstname-input">Tên</label>
                <input id="firstname-input" type="text" onChange={e => setFistName(e.target.value)} />
                {error && error.includes("firstName") ? <div className="form-error">First name must not be empty</div> : ""}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email-input">Email</label>
              <input id="email-input" type="email" onChange={e => setEmail(e.target.value)} />
              {error && error.includes("email") ? <div className="form-error">Email must not be empty</div> : ""}
            </div>
            <div className="form-group">
              <label htmlFor="phone-input">Số điện thoại</label>
              <input id="phone-input" type="phonenumber" onChange={e => setPhoneNumber(e.target.value)} />
              {error && error.includes("phoneNumber") ? <div className="form-error">Phone must not be empty</div> : ""}
            </div>
            <div className="form-group">
              <label htmlFor="password-input">Mật khẩu</label>
              <input id="password-input" type="password" onChange={e => setPassword(e.target.value)} />
              {error && error.includes("password") ? <div className="form-error">Password must not be empty</div> : ""}
            </div>
            <div className="form-group">
              <label htmlFor="password-confirm-input">Xác nhận mật khẩu</label>
              <input id="password-confirm-input" type="password" onChange={e => setConfirmPassword(e.target.value)} />
              {message ? <div className="form-error">{message}</div> : ""}
            </div>
            <div className="radio-group-container">
              <div className="radio-group">
                <label htmlFor="male-gender-radio">Nam</label>
                <input id="male-gender-radio" type="radio" value={1} onClick={e => setGender(parseInt(e.target.value))} checked={gender === 1 ? "checked" : ""} />
              </div>
              <div className="radio-group">
                <label htmlFor="female-gender-radio">Nữ</label>
                <input id="female-gender-radio" type="radio" value={0} onClick={e => setGender(parseInt(e.target.value))} checked={gender === 0 ? "checked" : ""} />
              </div>
            </div>
            <div>
              <div style={{color: "white", marginBottom: "0.6rem"}}>Ngày sinh</div>
              <DateTimePicker getISODate={getISODate} />
            </div>
            <div style={{fontSize: "0.813rem", marginBottom: "0.6rem"}} className="link-to-register"><Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Đã có tài khoản? Đăng nhập!</Link></div>
            <button>Đăng ký</button>
          </form>
      }
    </>
  )
}

export default RegisterScreen
