import React, {  useEffect, useState } from 'react'
import './PlayVideo.css'

//import video1 from '../../assets/video.mp4'
import { value_converter } from '../../data';
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg";
//import { data } from 'react-router-dom';
import moment from 'moment';
import { API_KEY } from '../../data';

const PlayVideo = (videoId) => {
  const [apiData,setApiData]=useState(null);
  const [channelData,setChannelData]=useState(null)
  const fetchVideoData = async ()=>{
const videodetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&id=${videoId}&key=${API_KEY}`
 await fetch(videodetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0])) }
 /*const fetchOtherdata = async ()=>{
  //const channelData_url=``
 }*/
 useEffect(()=>{
  fetchVideoData();
 },[videoId])
 
 return (
   <div className="play-video">
     {/*<video src={video1} controls autoPlay muted></video>*/}
     <iframe
       src={`https://www.youtube.com/embed/sRmRLJcLAEw`}
       frameBorder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       referrerPolicy="strict-origin-when-cross-origin"
       allowFullScreen
     ></iframe>{" "}
     <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
     <div className="play-video-info">
       <p>
         {apiData ? value_converter(apiData.statistics.viewCount) : "16K"}views;
         {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
       </p>
       <div>
         <span>
           <img src={like} alt="" />
           {apiData ? value_converter(apiData.statistics.likeCount) : 155}
         </span>
         <span>
           <img src={dislike} alt="" />2
         </span>
         <span>
           <img src={share} alt="" />
           share
         </span>
         <span>
           <img src={save} alt="" />
           save
         </span>
       </div>
     </div>
     <hr />
     <div className="publisher">
       <img src={jack} alt="" />
       <div>
         <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
         <span>1M Subscribers</span>
       </div>
       <button>Subscribe</button>
     </div>
     <div className="vid-description">
       <p>
         {apiData
           ? apiData.snippet.description.slice(0, 250)
           : "Description Here"}
       </p>
       <p>Subscribe GreatStack to Watch More Tutorials on web development</p>
       <hr />
       <h4>
         {apiData ? value_converter(apiData.statistics.commentCount) : 102}{" "}
         comments
       </h4>
       <div className="comment">
         <img src={user_profile} alt="" />
         <div>
           <h3>
             Jack Nicholsan <span>1 day ago</span>
           </h3>
           <p>
             A global network providing a variety of information and connection
             of interconnected networks using standardized communication
           </p>
           <div className="comment-section">
             <img src={like} alt="" />
             <span>244</span>
             <img src={dislike} alt="" />
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default PlayVideo
