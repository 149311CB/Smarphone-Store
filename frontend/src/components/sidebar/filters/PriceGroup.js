import React from 'react'

const PriceGroup = () => {
  return (
    <div className="price-group">
      <h4>Giá</h4>
      <button>Dưới 500.000</button>
      <button>Từ 500.000 đến 3.500.000</button>
      <button>Từ 3.500.000 đến 16.500.000</button>
      <button>Trên 16.500.000</button>
      <div className="price-input">
        <input id="min-price" value={0} />
        <span>-</span>
        <input id="min-price" value={0} />
      </div>
      <button id="apply">Áp dụng</button>
    </div>
  )
}

export default PriceGroup

