import React from 'react'

const RomGroup = () => {
  return (
    <div className="rom-group">
      <h4>Bộ nhớ trong</h4>
      <div className="checkbox-group">
        <input type="checkbox" id="0g" value={0} />
        <label for="0g">Dưới 32 GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="32g" value={1} />
        <label for="32g">32GB - 64GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="64g" value={2} />
        <label for="64g">64GB - 128GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="128g" value={3} />
        <label for="128g">128GB - 256GB</label>
      </div>
      <div className="checkbox-group">
        <input type="checkbox" id="512g" value={4} />
        <label for="512g">512 GB trở lên</label>
      </div>
    </div>
  )
}

export default RomGroup

