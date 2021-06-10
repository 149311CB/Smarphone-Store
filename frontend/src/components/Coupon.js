import React from 'react'

const Coupon = ({coupon}) => {
  const value = coupon.discountType === "fixed" ? (coupon.discountAmount / 1000) : (coupon.discountPercent);
  return (
    <div className="coupon noselect">
      <div className="coupon-ball coupon-ball-left " ></div>
      <div className="coupon-value">
        {coupon.discountType === "fixed" ? `${value}K` : `${value}%`}
      </div>
      <div className="coupon-ball coupon-ball-right"></div>
    </div>
  )
}

export default Coupon

