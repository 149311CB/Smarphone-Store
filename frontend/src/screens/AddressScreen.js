import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import AccountSidebar from "../components/accounts/AccountSidebar";
import {getAddressListByUserAction} from "../actions/AddressActions";
import AddressList from "../components/AddressList";

const ACCOUNT_SCREEN_STYLES = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%"
}
const AddressScreen = () => {
  const dispatch = useDispatch()
  const {loading, error, addressList} = useSelector(state => state.addressListByUser)

  useEffect(() => {
    dispatch(getAddressListByUserAction())
  }, [dispatch]);

  return (
    <div style={ACCOUNT_SCREEN_STYLES}>
      <AccountSidebar active={"addresses"}/>
      <AddressList width={100}
                   buttonsWidth={30}
                   grow={1}
                   flexContainer={{display:"flex",alignItems:"center", flexDirection:"column"}}/>
    </div>
  )
}

export default AddressScreen
