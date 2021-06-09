import React, {useEffect, useState} from 'react'
import AdminSidebar from "../../components/accounts/AdminSidebar";
import RequestPasswordModal from "../../components/modals/RequestPasswordModal";
import {deleteUser, getUserList} from "../../actions/UserActions";
import {useDispatch, useSelector} from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import {useHistory} from "react-router-dom";
import ConfirmActionModal from "../../components/modals/ConfirmActionModal";
import {DELETE_USER_RESET} from "../../constants/UserConstants";
const ACCOUNT_SCREEN_STYLES ={
    display:"flex",
    justifyContent:"space-between",
    width:"100%"
}
const UsersManageScreen = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const {loading,error,userList} = useSelector(state => state.getUserList)
    const {loading:deleteLoading,message} = useSelector(state => state.deleteUser)
    const [isDeleteOpen,setIsDeleteOpen] = useState(false)
    const [user,setUser] =useState(0)
    const deleteProccess=(id) =>{
        setIsDeleteOpen(true)
        setUser(id)
    }
    const confirmDelete =() =>{
        dispatch(deleteUser(user))
        setIsDeleteOpen(false)
    }

    useEffect(() => {
        dispatch({type:DELETE_USER_RESET})
        dispatch(getUserList())
    }, [dispatch,message]);

  return (
    <div className={"users-manage-screen"} style={ACCOUNT_SCREEN_STYLES}>
      <AdminSidebar active={"users"}/>
        {
            loading || loading==null || deleteLoading
                ?
                <div className="loader" style={{flexGrow:1, display:"flex",justifyContent:"center"}}><ClipLoader color={"#A7c080"} size={100} /></div>
                :
        <div className={"user-manager"} style={{flexGrow:1}}>
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
            <table className={"user-table"}>
                <thead>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th/>
                </thead>
                <tbody>
                {userList ? userList.map(u =>(
                    <tr>
                        <td>{ u._id }</td>
                        <td>{ u.lastName  } {u.firstName}</td>
                        <td>{u.email}</td>
                        <td>
                            <div className={"edit-delete-btns"}>
                                <button className={"btn primary-btn nm"}
                                        onClick={() => history.push(`/admin/users/${u._id}`)}>
                                    <i className="far fa-edit"/>
                                </button>
                                <button className={"btn danger-btn white nm"}
                                        onClick={() => deleteProccess(u._id)}>
                                    <i className="fas fa-trash"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                )):""}
                </tbody>
            </table>
        </div>
        }
    </div>
  )
}

export default UsersManageScreen

