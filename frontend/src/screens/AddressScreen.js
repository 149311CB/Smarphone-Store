import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getOrderListByUser} from "../actions/OrderActions";
import AccountSidebar from "../components/accounts/AccountSidebar";
import ClipLoader from "react-spinners/ClipLoader";
import {Link} from "react-router-dom";
import {getAddressListByUserAction} from "../actions/AddressActions";
import AddressList from "../components/AddressList";
import AdminSidebar from "../components/accounts/AdminSidebar";

const ACCOUNT_SCREEN_STYLES = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
}
const AddressScreen = () => {
  const dispatch = useDispatch()
  const {loading, error, addressList} = useSelector(state => state.addressListByUser)
  console.log(addressList)

  useEffect(() => {
    dispatch(getAddressListByUserAction())
  }, [dispatch]);

  return (
    <div style={ACCOUNT_SCREEN_STYLES}>
      <AccountSidebar active={"addresses"}/>
      <AddressList width={100} buttonsWidth={30} grow={1} flexContainer={{display:"flex",alignItems:"center", flexDirection:"column"}}/>
    </div>
  )
}

export default AddressScreen
