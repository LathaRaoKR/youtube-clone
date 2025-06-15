import React, { useState, useEffect } from "react";
import "./video.css";
import PlayVideo from "../../components/PlayVideo/PlayVideo";
import Recommended from "../../components/Recommended/Recommended";
import { useParams, useNavigate } from "react-router-dom";

const Video = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [selectedVideoId, setSelectedVideoId] = useState(videoId);
  const [categoryId, setCategoryId] = useState(null);

  const handleVideoClick = (newVideoId) => {
    navigate(`/video/${newVideoId}`);
    setSelectedVideoId(newVideoId);
  };

  const handleCategoryFetched = (id) => {
    setCategoryId(id);
  };
  // Inside Video.jsx or other protected page
  useEffect(() => {
    const authUser = localStorage.getItem("auth");
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="play-container">
      <div className="left-section">
        <PlayVideo
          videoId={selectedVideoId}
          onCategoryFetched={handleCategoryFetched}
        />
      </div>
      <div className="right-section">
        {categoryId && (
          <Recommended
            videoId={selectedVideoId}
            onVideoClick={handleVideoClick}
            categoryId={categoryId}
          />
        )}
      </div>
    </div>
  );
};

export default Video;
