import React from 'react'
import AccountSidebar from "../components/accounts/AccountSidebar";
import AddAddress from "../components/AddAddress";

const ACCOUNT_SCREEN_STYLES ={
    display:"flex",
    justifyContent:"space-between",
    width:"100%"
}
const AccountAddAddress = () => {
  return (
    <div className="account-add-address" style={ACCOUNT_SCREEN_STYLES}>
      <AccountSidebar active={"addresses"}/>
        <AddAddress grow={1}/>
    </div>
  )
}

export default AccountAddAddress

