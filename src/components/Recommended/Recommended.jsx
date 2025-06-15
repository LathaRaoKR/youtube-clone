import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY } from "../../data";
import moment from "moment";

const Recommended = ({ videoId, onVideoClick, categoryId }) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  const fetchRecommendedVideos = async () => {
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=25&key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.items) {
        // Filter out the current videoId (avoid showing the playing video itself)
        const filtered = data.items.filter((video) => video.id !== videoId);
        setRecommendedVideos(filtered);
      }
    } catch (error) {
      console.error("Error fetching recommended videos:", error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchRecommendedVideos();
    }
  }, [videoId, categoryId]);

  return (
    <div className="recommended">
      {recommendedVideos.length === 0 ? (
        <p className="loading-text">Loading recommendations...</p>
      ) : (
        recommendedVideos.map((video) => (
          <div
            className="side-video-list"
            key={video.id}
            onClick={() => onVideoClick(video.id)}
            style={{ cursor: "pointer" }}
          >
            <img
              className="thumbnail"
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <div className="vid-info">
              <h4 className="video-title">
                {video.snippet.title.length > 60
                  ? video.snippet.title.slice(0, 60) + "..."
                  : video.snippet.title}
              </h4>
              <p className="channel-title">{video.snippet.channelTitle}</p>
              <p className="publish-time">
                {moment(video.snippet.publishedAt).fromNow()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Recommended;
