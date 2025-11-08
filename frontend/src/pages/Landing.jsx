import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Amenities from '../components/Amenities';
import MenuPreview from '../components/MenuPreview';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <LandingNavbar />
      <div id="home">
        <Hero />
      </div>
      <div id="gallery">
        <Gallery />
      </div>
      <div id="amenities">
        <Amenities />
      </div>
      <div id="menu">
        <MenuPreview />
      </div>
    </div>
  );
};

export default Landing;