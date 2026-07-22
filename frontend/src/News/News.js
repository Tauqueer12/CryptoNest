import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import axios from "axios";
import "./News.css";
import Navbar from "../Navbar/Navbar";


const { Meta } = Card;



function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      const response = await axios.get(
        "https://cryptonest-api.onrender.com/api/news"
      );
      setNews(response.data.data);
    };
    loadNews();
  }, []);

  return (
    <div className="container9">


      <div className="navbar-area">
        <Navbar />
      </div>
      <div className="News">
        <h1 className="news_heading">News Updates</h1>

        {news.filter(new_img => new_img.image != null).map((item, index) => {
          return (
            <Card
              key={index}
              hoverable
              className="card_news"
              cover={<img alt={item.title || "News article thumbnail"} src={item.image} />}
            >
              <Meta title={item.title} description={item.description} />
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Button style={{ marginTop: "10px" }}>
                  Read More
                </Button>
              </a>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default News;