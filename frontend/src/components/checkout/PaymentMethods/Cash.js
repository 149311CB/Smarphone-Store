import React from 'react'
import cash from "../../../pay 1.png";

const Cash = ({method,changePaymentMethod}) => {
  return (
      <div className="cash-group" style={{marginBottom: "0.6rem"}}>
        <div className="radio-group">
          <input id="pay-with-cash" type="radio" name="payment" value={0} onClick={e => changePaymentMethod(0)} checked={method === 0 ? "checked":""}/>
          <label htmlFor="pay-with-cash"><span style={{margin: "0 0.3rem"}}><img src={cash} /></span>Thanh toán tiền mặt khi nhận hàng</label>
        </div>
        {method === 0
            ? <button className="btn primary-btn lg" style={{marginBottom: "0.6rem"}}>ĐẶT MUA</button> : ""}
      </div>
  )
}

export default Cash

