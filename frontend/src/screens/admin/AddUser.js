import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {userRegisterAction} from "../../actions/UserActions";
import {pushCartToServer} from "../../actions/CartActions";
import ClipLoader from "react-spinners/ClipLoader";
import DateTimePicker from "../../components/DateTimePicker";
import {Link} from "react-router-dom";
import AdminSidebar from "../../components/accounts/AdminSidebar";

const ACCOUNT_SCREEN_STYLES = {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%"
}
const AddUser = ({location, history}) => {
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
    const userRegister = useSelector(state => state.userRegister)
    const {isCheckout} = useSelector(state => state.checkoutPending)
    const {loading:pushLoading,error:pushError,message:pushMessage} = useSelector(state => state.pushCart)
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
            history.push("/")
        }
    }, [history, userInfo,pushMessage])

    return (
        <div className={"add-user-screen"} style={ACCOUNT_SCREEN_STYLES}>
            <AdminSidebar active={"users"}/>
            {
                loading || pushLoading
                    ? <div className="loader"><ClipLoader color={"#A7c080"} size={100} /></div> :
                    <form className="register-form" onSubmit={submitHandler} style={{margin:0, background:"white", border:"none"}}>
                        <div className="form-group-container">
                            <div className="form-group" >
                                <label htmlFor="lastname-input" className={"dark"}>Họ</label>
                                <input id="lastname-input"  type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                                {error && error.includes("lastName") ? <div className="form-error">Last name must not be empty</div> : ""}
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname-input" className={"dark"}>Tên</label>
                                <input id="firstname-input" type="text" value={firstName} onChange={e => setFistName(e.target.value)} />
                                {error && error.includes("firstName") ? <div className="form-error">First name must not be empty</div> : ""}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-input" className={"dark"}>Email</label>
                            <input id="email-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                            {error && error.includes("email") ? <div className="form-error">Email must not be empty</div> : ""}
                            {error && error === "User already exists" ? <div className="form-error">An account with this email already exists</div> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone-input" className={"dark"}>Số điện thoại</label>
                            <input id="phone-input" type="phonenumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                            {error && error.includes("phoneNumber") ? <div className="form-error">Phone must not be empty</div> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-input" className={"dark"}>Mật khẩu</label>
                            <input id="password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                            {error && error.includes("password") ? <div className="form-error">Password must not be empty</div> : ""}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-confirm-input" className={"dark"}>Xác nhận mật khẩu</label>
                            <input id="password-confirm-input" type="password" value={confimPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            {message ? <div className="form-error">{message}</div> : ""}
                        </div>
                        <div className="radio-group-container">
                            <div className="radio-group">
                                <label htmlFor="male-gender-radio" className={"dark"}>Nam</label>
                                <input id="male-gender-radio" type="radio" value={1} onClick={e => setGender(parseInt(e.target.value))} checked={gender === 1 ? "checked" : ""} />
                            </div>
                            <div className="radio-group">
                                <label htmlFor="female-gender-radio" className={"dark"}>Nữ</label>
                                <input id="female-gender-radio" type="radio" value={0} onClick={e => setGender(parseInt(e.target.value))} checked={gender === 0 ? "checked" : ""} />
                            </div>
                        </div>
                        <div>
                            <div style={{marginBottom: "0.6rem"}} >Ngày sinh</div>
                            <DateTimePicker getISODate={getISODate}/>
                        </div>
                        <button className={"btn primary-btn lg"}>Tạo tài khoản</button>
                    </form>
            }
        </div>
    )
}

export default AddUser
