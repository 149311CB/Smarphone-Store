import React from 'react'

const RamGroup = () => {
  return (
    <div className="ram-group">
      <h4>Dung lượng RAM</h4>
      <div className="checkbox-group">
        <input type="checkbox" id="0g" value={0} />
        <label for="0g">Dưới 4GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="32g" value={1} />
        <label for="32g">4GB - 6GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="64g" value={2} />
        <label for="64g">8GB trở lên</label>
      </div>
    </div>
  )
}

export default RamGroup

