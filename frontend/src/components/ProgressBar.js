import React from 'react'

const ProgressBar = ({value, summary}) => {
  const percent = value * 100 / summary;
  return (
    <div className="progress-bar">
      <div className="percent" style={{width: `${percent}%`, height: "100%"}}></div>
    </div>
  )
}

ProgressBar.defaultProps = {
  value: 1,
  summary: 10,
}

export default ProgressBar
