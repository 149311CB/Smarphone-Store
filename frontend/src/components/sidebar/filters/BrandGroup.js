import React from 'react'

const BrandGroup = () => {
  return (
    <div className="brand-group">
      <h4>Thương hiệu</h4>
      <div className="checkbox-group">
        <input type="checkbox" id="apple" value="apple" />
        <label for="apple">Apple</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="samsung" value="samsung" />
        <label for="samsung">Samsung</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="oppo" value="oppo" />
        <label for="oppo">Oppo</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="xiaomi" value="xiaomi" />
        <label for="xiaomi">Xiaomi</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="realme" value="realme" />
        <label for="realme">Realme</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="vsmart" value="vsmart" />
        <label for="vsmart">Vsmart</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="bphone" value="bphone" />
        <label for="bphone">Bphone</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="huawei" value="huawei" />
        <label for="huawei">Huawei</label>
      </div>
    </div>
  )
}

export default BrandGroup

