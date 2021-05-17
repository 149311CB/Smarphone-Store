import React from 'react'

const Paginations = ({current, last}) => {
  return (
    <div className="paginations">
      <div className="previous-pages">
        {current - 2 > 0 ? <button value={current - 2}>{current - 2}</button> : ""}
        {current - 1 > 0 ? <button value={current - 1}>{current - 1}</button> : ""}
        <button value={current}>{current}</button>
      </div>
      {last !== current ? <span>...</span> : ""}
      <div className="next-pages">
        {last - 1 > 0 ? <button value={last - 1}>{last - 1}</button> : ""}
        {last !== current ? <button value={last}>{last - 2}</button> : ""}
      </div>
    </div >
  )
}

export default Paginations
