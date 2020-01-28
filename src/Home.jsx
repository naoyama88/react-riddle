import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from './Header';

import './css/home.css';

const Home = () => {
  const [riddles, setRiddles] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const result = await axios(
        'http://localhost:3000/api/getAllRiddles',
      );
      setRiddles(result.data);
    }
    fetchAll();
  }, []);

  return (
    <>
      <Header />
      <main className="home_mainContainer">
        { riddles.map( riddle => {
          return (
            <Link 
              to={`/riddles/${riddle._id}`}
              params={{ testvalue: "hello" }}
              className="home_card_container">
              <div className="card_top">
                <div className="card_top_left">
                  <h1 className="card_title">{riddle.title}</h1>
                  <h3 className="card_author">– {riddle.author}</h3>
                </div>
                <div className="card_top_right">
                  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7226 4.41603L12 4.60093L12.2774 4.41603L17.9667 0.623115L23.5 5.23419V11.7658L12 21.3491L0.5 11.7658V5.23419L6.03329 0.623116L11.7226 4.41603Z" stroke="#46FFA6"/>
                  </svg>
                  <h2 className="card_like">{riddle.like}</h2>
                </div>
              </div>
              <div className="card_btm">
                <p className="card_content">{riddle.riddle}</p>
                <div className="card_content_mask"></div>
              </div>
            </Link>
          )
        })}
      </main>
    </>
  )
}

export default Home;