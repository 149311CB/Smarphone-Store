import React from 'react'
import {useSelector} from 'react-redux'

const CheckoutProducts = ({cartInfo}) => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
    //These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <>
      <div className="product-list">
        {cartInfo.products.map((p, index) =>
          <>
            <div className="product-container">
              <div className="image-container">
                <img src={p.product.images[0]} />
              </div>
              <div className="product-summary" >
                <p>{p.product.name}</p>
                <div style={{display: "flex"}}>
                  <p>Số lượng: {p.quantity}</p>
                  <p className="price">{formatter.format(p.quantity * p.product.price)}</p>
                </div>
              </div>
            </div>
            {index === cartInfo.products.length - 1 ? "" : <div className="indicator"></div>}
          </>
        )}
      </div>
    </>
  )
}

export default CheckoutProducts

