import React from 'react'
import RatingGroup from './filters/RatingGroup'
import PriceGroup from './filters/PriceGroup'
import BrandGroup from './filters/BrandGroup'
import RomGroup from './filters/RomGroup'
import RamGroup from './filters/RamGroup'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <RatingGroup />
      <div className="sidebar-indicator"></div>
      <PriceGroup />
      <div className="sidebar-indicator"></div>
      <BrandGroup />
      <div className="sidebar-indicator"></div>
      <RomGroup />
      <div className="sidebar-indicator"></div>
      <RamGroup />
    </div>
  )
}

export default Sidebar
