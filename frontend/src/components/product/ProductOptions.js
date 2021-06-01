import React from 'react'
import Coupon from '../Coupon'

const ProductOptions = ({price, rom, ram, quantity, coupons, changeQuantity}) => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    //These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      <div className="price-tag">
        <span>{formatter.format(price)}</span>
      </div>
      <div className="indicator"/>
      <div>
        <div className="group-title">Dung lượng bộ nhớ trong</div>
        <div className="roms-group noselect">
          {/* {roms.map((r, index) => (
            <div className={index === 0 ? "active" : ""} id={`rom-${r}`} onClick={e => changeRoms(r, e)}>{r}</div>
          ))} */}
          <div>{rom}</div>
        </div>
      </div>
      <div className="indicator"/>
      <div>
        <div className="group-title">Dung lượng ram</div>
        <div className="roms-group noselect">
          {/* {rams.map((r, index) => (
            <div className={index === 0 ? "active" : ""} id={`ram-${r}`} onClick={e => changeRams(r, e)}>{r}</div>
          ))} */}
          <div>{ram}</div>
        </div>
      </div>
      <div className="indicator"/>

      <div className="group-title">Mã giảm giá có thể áp dụng</div>
      <div className="coupon-group">
        {coupons.map(c =>
          <Coupon coupon={c} />
        )}
      </div>
      <div className="indicator"/>
      <div className="quantity-select">
        <button className="left-btn" onClick={e => changeQuantity(quantity - 1)} disabled={quantity === 1 ? true : false}><i className="fas fa-minus"/></button>
        <input value={quantity} />
        <button className="right-btn"
                onClick={e => changeQuantity(quantity + 1)} > <i className="fas fa-plus"/></button>
      </div>
    </>
  )
}

export default ProductOptions
