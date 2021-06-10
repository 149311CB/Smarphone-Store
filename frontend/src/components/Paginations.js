import React, {useEffect, useState} from 'react'

const Paginations = ({total,currentpage,setcurrentpage}) => {

  // total from api
  // const total=247
  // pagination handle these itselft
  // const [currentpage,setcurrentpage] = useState(1)
  const [currentFirstIndex, setCurrentFirstIndex] = useState(1);
  const [currentLastIndex, setCurrentLastIndex] = useState(5);

  const selectPageHandler=(p) =>{
    setcurrentpage(p)
  }

  const previousSectionHandler=() =>{
    setcurrentpage(currentFirstIndex-1)
    setCurrentFirstIndex(currentFirstIndex-5)
    setCurrentLastIndex(currentFirstIndex-1)
  }

  const nextSectionHandler=() =>{
    setcurrentpage(currentLastIndex+1)
    setCurrentFirstIndex(currentLastIndex+1)
    setCurrentLastIndex(currentLastIndex+5)
  }

  const pages=[]
    for(let i=1; i<=Math.ceil(total/12); i++){
      pages.push(i)
    }
  useEffect(() => {
    const active = document.querySelector("li button.active")
    if(active){
      active.classList.remove("active")
    }
    const currentActive = document.getElementById(`pagination-btn-${currentpage}`)
      if(currentActive){
        currentActive.classList.add("active")
      }
  }, [currentpage]);


  return (
      <>
    <div className={"pagination-container"}>
      <div className={"paginations"}>
      <button className={"previous"}
              disabled={currentFirstIndex===1}
              onClick={() => previousSectionHandler()}
              >Previous</button>
      <ul >
      {pages.map(( p,index ) =>(
          index >= currentFirstIndex - 1 && index < currentLastIndex ?
          <li className={"paginations-item"} key={p}>
            <button id={`pagination-btn-${p}`}
                    onClick={() => selectPageHandler(p)}>{p}</button>
          </li>
              :"" ))}
        </ul>
      <button className={"next"}
              disabled={currentLastIndex >= pages.length+1}
              onClick={() => nextSectionHandler()}>Next</button>
        </div>
    </div>
      </>
  )
}

export default Paginations
