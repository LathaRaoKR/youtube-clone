import React, { useState } from 'react'
import './home.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'

const Home = (sidebar) => {
    const [category,setCategory]=useState(0);
  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
      <div className={`container ${sidebar?"":'large-container'}`}></div>
    <Feed category={category}/>
    </>
  )
}

export default Home
