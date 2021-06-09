import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
  deleteUser,
  getUserByIdAction,
  getUserProfile,
  logoutAction,
  updateUserByIdAction,
  updateUserProfile
} from "../../actions/UserActions";
import {UPDATE_USER_BY_ID_RESET, UPDATE_USER_PROFILE_RESET} from "../../constants/UserConstants";
import AccountSidebar from "../../components/accounts/AccountSidebar";
import ClipLoader from "react-spinners/ClipLoader";
import RequestPasswordModal from "../../components/modals/RequestPasswordModal";
import DateTimePicker from "../../components/DateTimePicker";
import AdminSidebar from "../../components/accounts/AdminSidebar";
import ConfirmActionModal from "../../components/modals/ConfirmActionModal";
import {useHistory} from "react-router-dom";

const UserDetailScreen = ({location}) => {
  const ACCOUNT_SCREEN_STYLES ={
    display:"flex",
    justifyContent:"space-between",
    width:"100%"
  }
  const dispatch = useDispatch()
    const history = useHistory()
  const {loading,error,userDetails} = useSelector(state => state.getUserById)
  const {loading:updateLoading,message} = useSelector(state => state.updateUserById)
  const {userInfo} = useSelector(state => state.userLogin)
  const [submitPasword, setSubmitPasword] = useState(false);
  const [lastName, setLastName] = useState("")
  const [firstName, setFistName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [birthday, setBirthday] = useState("")
  const [gender, setGender] = useState(1)
  const redirect = location.search ? location.search.split('=')[1] : "/"
  const id = location.pathname.split("/")[3]
  const [isDeleteOpen,setIsDeleteOpen] = useState(false)
  const {loading:deleteLoading,message:deleteMessage} = useSelector(state => state.deleteUser)

  const initialDate = userDetails ? new Date(userDetails.birthday) :""

  const confirmDelete =() =>{
    dispatch(deleteUser(id))
    setIsDeleteOpen(false)
    history.push("/admin/users")
  }
  const getISODate = (e) => {
    setBirthday(e)
  }
  const submitHandler = (e,password) => {
    e.preventDefault()
    setSubmitPasword(true)
  }
  const submitSaveProfile=(e)=>{
    e.preventDefault()
    dispatch(updateUserByIdAction(id,{lastName:lastName,firstName:firstName,
      email:email, phoneNumber:phoneNumber, birthday:birthday,gender:gender} ))
  }
  useEffect(() => {
    if(!userInfo){
      dispatch(logoutAction())
    }else{
      if(!userDetails || message){
        dispatch({type:UPDATE_USER_BY_ID_RESET})
        dispatch(getUserByIdAction(id))
      }else{
        setFistName(userDetails.firstName)
        setLastName(userDetails.lastName)
        setEmail(userDetails.email)
        setPhoneNumber(userDetails.phoneNumber)
        setGender(userDetails.gender)
        setBirthday(userDetails.birthday)
      }
    }
  }, [dispatch,userInfo, userDetails,message]);

  return (
      <>

        <div className={"profile-screen"} style={ACCOUNT_SCREEN_STYLES}>
          <AdminSidebar active={"users"}/>
          {
            loading || updateLoading || loading==null
                ?
                <div className="loader" style={{flexGrow:1, display:"flex",justifyContent:"center"}}><ClipLoader color={"#A7c080"} size={100} /></div>
                :
                <div className={"profile-manager"} style={{flexGrow:1}}>
                  {
                    isDeleteOpen ?
                        <ConfirmActionModal action={"Xóa người dùng"}
                                            onConfirm={confirmDelete}
                                            onClose={() => setIsDeleteOpen(false)}
                                            type={"danger"}
                                            color={"white"}
                                            go={"Xóa"}
                        />
                        :""
                  }
                  <button className={"btn light-btn transparent nm"}
                          style={{marginBottom:"0.6rem"}}
                          onClick={() => history.push("/admin/users")}>Quay lại</button>
                  <form className={"profile-form"} id={"admin-profile-form"} onSubmit={submitSaveProfile}>
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
                </form>

                  <button form={"admin-profile-form"} className={"btn primary-btn nm wide"} style={{marginTop:"1.2rem", marginRight:"0.6rem"}}>Lưu</button>
                  <button className={"btn danger-btn nm wide white"} style={{marginTop:"1.2rem"}}
                          onClick={() => setIsDeleteOpen(true)}>Xóa</button>
                </div>
          }
        </div>
      </>
  )
}

export default UserDetailScreen
