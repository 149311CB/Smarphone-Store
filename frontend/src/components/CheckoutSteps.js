import React from 'react'

const CheckoutSteps = ({hash, step1, step2, step3}) => {
  return (
    <div className={"checkout-steps-container"}>
        <div className={"checkout-steps top"}>
            <div>Đăng nhập</div>
            <div>Thêm địa chỉ giao hàng</div>
            <div>Thanh toán</div>
        </div>
        <div className={"checkout-steps"}>
      {
        hash ==="" || hash==="#addresslist" || hash==="#addaddress" || hash==="#payment" ?
            <div className={"step step1 active"}>1</div>
            :
            <div className={"step step1"}>1</div>
      }
            {
                hash === "" || hash === "#addresslist" || hash==="#addaddress" || hash==="payment"
                    ?
                <div className={"step-bar active left"}/>
                    :
               <div className={"step-bar left"}/>
            }
      {
        hash === "" || hash==="#addresslist" || hash === "#addaddress" ?
            <div className={"step step2 active"}>2</div>
            :
            <div className={"step step2"}>2</div>
      }
            {
                hash === "" || hash === "#payment"
                    ?
                    <div className={"step-bar active right"}/>
                    :
                    <div className={"step-bar right"}/>
            }
        {
            hash === "" || hash==="#payment" ?
                <div className={"step step3 active"}>3</div>
                :
                <div className={"step step3"}>3</div>
        }
        </div>
    </div>
  )
}

export default CheckoutSteps