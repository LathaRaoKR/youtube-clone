import React, { useEffect, useState } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    // Build base API URL
    let videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=ID&maxResults=20&key=${API_KEY}`;

    // Only append videoCategoryId if category is defined
    if (category) {
      videoList_url += `&videoCategoryId=${category}`;
    }

    try {
      const response = await fetch(videoList_url);
      const result = await response.json();

      if (result.items) {
        setData(result.items);
      } else {
        console.warn("No items in response", result);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.length === 0 ? (
        <p className="loading-text">Loading videos or none found...</p>
      ) : (
        data.map((item) => (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            className="card"
            key={item.id}
          >
            <img
              src={item.snippet.thumbnails.medium.url}
              alt={item.snippet.title}
            />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount)} views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default Feed;
