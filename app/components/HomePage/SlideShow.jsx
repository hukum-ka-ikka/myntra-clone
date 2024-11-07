"use client";
// index.js or _app.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";
import carouselOne from "../../../public/Images/carousel-1.png";
import carouselTwo from "../../../public/Images/carousel-2.png";
import carouselThree from "../../../public/Images/carousel-3.png";
import carouselFour from "../../../public/Images/carousel-4.png";
import Image from "next/image";

const SlideShow = () => {
  const carouselImages = [
    carouselOne,
    carouselTwo,
    carouselThree,
    carouselFour,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="w-full h-full">
      <Slider {...settings}>
        {carouselImages.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
