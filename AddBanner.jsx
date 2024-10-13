import React, { useState, useEffect } from 'react';
import axios from 'axios';  // To make API requests
import style from './addBanner.module.css';

const AdBanner = () => {
  const [showAd, setShowAd] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [ads, setAds] = useState(null);  // State to store fetched ads
  const [currentAd, setCurrentAd] = useState(null);  // State to display the current ad

  // Function to fetch ads from the backend
  const fetchAds = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/ads/');  // API endpoint to fetch ads
      if (response.data && response.data.length > 0) {
        setAds(response.data);  // Set the ads list
        setCurrentAd(response.data[0]);  // Display the first ad initially
      }
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  // Fetch ads when the component mounts
  useEffect(() => {
    fetchAds();
  }, []);

  const closeAd = () => {
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    if (option === "not-interested") {
      setShowAd(false);
    } else {
      setShowOptions(false); // Keep the ad visible
    }
  };

  return (
    showAd && currentAd && (
      <div className={style.container}>
        <div className={style.adbanner}>
          <div className={style.adcontent}>
            <img
              src={currentAd.image}  // Display the ad image
              alt="Ad Logo"
              className={style.adlogo}
            />
            <div className={style.adtext}>
              <p className={style.adtitle}>{currentAd.title}</p>
              <h1>{currentAd.description}</h1>
              <p>Check it out!</p>
            </div>
            <a href={currentAd.url} target="_blank" rel="noopener noreferrer" className={style.adbtn}>
              Watch Now
            </a>
          </div>

          {!showOptions ? (
            <button className={style.adclosebtn} onClick={closeAd}>
              ✖
            </button>
          ) : (
            <div className={style.optionMenu}>
              <p onClick={() => handleOptionClick("not-interested")}>Not Interested</p>
              <p onClick={() => handleOptionClick("keep-suggesting")}>Keep Suggesting</p>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default AdBanner;
