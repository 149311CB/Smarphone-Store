import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import AccountSidebar from "../components/accounts/AccountSidebar";
import DateTimePicker from "../components/DateTimePicker";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, logoutAction, updateUserProfile, userRegisterAction} from "../actions/UserActions";
import ClipLoader from "react-spinners/ClipLoader";
import RequestPasswordModal from "../components/modals/RequestPasswordModal";
import {UPDATE_USER_PROFILE_RESET} from "../constants/UserConstants";

const ProfileScreen = ({location}) => {
    const ACCOUNT_SCREEN_STYLES ={
        display:"flex",
        justifyContent:"space-between",
        width:"100%"
    }
    const dispatch = useDispatch()
    const {loading,error,userProfile} = useSelector(state => state.getUserProfile)
    const {success} = useSelector(state => state.updateUserProfile)
    const {userInfo} = useSelector(state => state.userLogin)
    const [submitPasword, setSubmitPasword] = useState(false);
    const [lastName, setLastName] = useState("")
    const [firstName, setFistName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gender, setGender] = useState(1)
    const [message, setMessage] = useState(null)
    const redirect = location.search ? location.search.split('=')[1] : "/"

    const initialDate = userProfile ? new Date(userProfile.birthday) :""

    const getISODate = (e) => {
        setBirthday(e)
    }
    const submitHandler = (e,password) => {
        e.preventDefault()
        setSubmitPasword(true)
    }
    const submitSaveProfile=(e,password)=>{
        e.preventDefault()
        dispatch(updateUserProfile({lastName:lastName,firstName:firstName,
            email:email, phoneNumber:phoneNumber, birthday:birthday,gender:gender,
            password:password} ))
    }
    useEffect(() => {
        if(!userInfo){
            dispatch(logoutAction())
        }else{
            if(!userProfile || success){
                setSubmitPasword(false)
                dispatch({type:UPDATE_USER_PROFILE_RESET})
                dispatch(getUserProfile())
            }else{
                setFistName(userProfile.firstName)
                setLastName(userProfile.lastName)
                setEmail(userProfile.email)
                setPhoneNumber(userProfile.phoneNumber)
                setGender(userProfile.gender)
                setBirthday(userProfile.birthday)
            }
        }
    }, [dispatch,userInfo, userProfile,success]);

  return (
      <>

    <div className={"profile-screen"} style={ACCOUNT_SCREEN_STYLES}>
        <AccountSidebar active={"profile"}/>
        {
            loading || loading==null
                ?
                <div className="loader" style={{flexGrow:1, display:"flex",justifyContent:"center"}}><ClipLoader color={"#A7c080"} size={100} /></div>
                :
        <div className={"profile-manager"} style={{flexGrow:1}}>
            {submitPasword ? <RequestPasswordModal onSubmitPassword={submitSaveProfile}
                                                   onClose={() => setSubmitPasword(false)}/>:""}
            <form className={"profile-form"} onSubmit={submitHandler}>
                <div className="form-group-container">
                    <div className="form-group">
                        <label htmlFor="lastname-input">Họ</label>
                        <input id="lastname-input" type="text"
                               value={lastName}
                               onChange={e => setLastName(e.target.value)} />
                        {error && error.includes("lastName") ? <div className="form-error">Last name must not be empty</div> : ""}
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname-input">Tên</label>
                        <input id="firstname-input" type="text"
                               value={firstName}
                               onChange={e => setFistName(e.target.value)} />
                        {error && error.includes("firstName") ? <div className="form-error">First name must not be empty</div> : ""}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email-input">Email</label>
                    <input id="email-input" type="email"
                           value={email}
                           onChange={e => setEmail(e.target.value)} />
                    {error && error.includes("email") ? <div className="form-error">Email must not be empty</div> : ""}
                </div>
                <div className="form-group">
                    <label htmlFor="phone-input">Số điện thoại</label>
                    <input id="phone-input" type="phonenumber"
                           value={phoneNumber}
                           onChange={e => setPhoneNumber(e.target.value)} />
                    {error && error.includes("phoneNumber") ? <div className="form-error">Phone must not be empty</div> : ""}
                </div>
                <div className="radio-group-container">
                    <div className="radio-group">
                        <label htmlFor="male-gender-radio">Nam</label>
                        <input id="male-gender-radio" type="radio"
                               value={1} onClick={e => setGender(parseInt(e.target.value))}
                               checked={gender === 1 ? "checked" : ""} />
                    </div>
                    <div className="radio-group">
                        <label htmlFor="female-gender-radio">Nữ</label>
                        <input id="female-gender-radio" type="radio"
                               value={0} onClick={e => setGender(parseInt(e.target.value))}
                               checked={gender === 0 ? "checked" : ""} />
                    </div>
                </div>
                <div>
                    <div style={{ marginBottom: "0.6rem"}}>Ngày sinh</div>
                    <DateTimePicker getISODate={getISODate}
                                    initialDay={initialDate.getDate()}
                                    initialMonth={initialDate.getMonth() + 1}
                                    initialYear={initialDate.getFullYear()}/>
                </div>
                <button className={"btn primary-btn nm wide"} style={{marginTop:"1.2rem"}}>Lưu</button>
            </form>
        </div>
        }
    </div>
      </>
  )
}

export default ProfileScreen