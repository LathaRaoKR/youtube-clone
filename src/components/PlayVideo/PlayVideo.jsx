import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import { value_converter, API_KEY } from "../../data";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import user_profile from "../../assets/user_profile.jpg";
import moment from "moment";

const PlayVideo = ({ videoId, onCategoryFetched }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(videoDetailsUrl);
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const videoInfo = data.items[0];
        setApiData(videoInfo);

        // 🔁 Pass categoryId to parent
        if (onCategoryFetched) {
          onCategoryFetched(videoInfo.snippet.categoryId);
        }

        const channelId = videoInfo.snippet.channelId;
        const channelDetailsUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
        const channelRes = await fetch(channelDetailsUrl);
        const channelDataJson = await channelRes.json();

        if (channelDataJson.items && channelDataJson.items.length > 0) {
          setChannelData(channelDataJson.items[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching video/channel data:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=10`;
      const res = await fetch(commentsUrl);
      const data = await res.json();
      if (data.items) {
        setComments(data.items);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
    fetchComments();
  }, [videoId]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube video player"
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "Loading title..."}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics?.viewCount) : "0"} views
          • {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="like" />
            {apiData ? value_converter(apiData.statistics?.likeCount || 0) : 0}
          </span>
          <span>
            <img src={dislike} alt="dislike" /> 2
          </span>
          <span>
            <img src={share} alt="share" /> Share
          </span>
          <span>
            <img src={save} alt="save" /> Save
          </span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img
          src={
            channelData
              ? channelData.snippet.thumbnails.default.url
              : user_profile
          }
          alt="channel logo"
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Channel Name"}</p>
          <span>
            {channelData
              ? `${value_converter(
                  channelData.statistics?.subscriberCount
                )} Subscribers`
              : "Loading Subscribers..."}
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Loading description..."}
        </p>

        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics?.commentCount || 0) : 0}{" "}
          Comments
        </h4>

        {comments.map((comment) => {
          const c = comment.snippet.topLevelComment.snippet;
          return (
            <div className="comment" key={comment.id}>
              <img src={c.authorProfileImageUrl || user_profile} alt="user" />
              <div>
                <h3>
                  {c.authorDisplayName}{" "}
                  <span>{moment(c.publishedAt).fromNow()}</span>
                </h3>
                <p>{c.textDisplay}</p>
                <div className="comment-section">
                  <img src={like} alt="like" />
                  <span>{value_converter(c.likeCount)}</span>
                  <img src={dislike} alt="dislike" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
