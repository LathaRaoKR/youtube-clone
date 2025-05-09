import React from 'react'
import './video.css'
import PlayVideo from '../../components/PlayVideo/PlayVideo'
import { useParams } from 'react-router-dom'
import Recommended from '../../components/Recommended/Recommended'
const Video = () => {
    const {videoId}=useParams();
  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId}/>
      <Recommended />
    </div>
  )
}

export default Video
