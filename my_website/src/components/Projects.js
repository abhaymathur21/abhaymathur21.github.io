import React from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import project_image_1 from "./images/project_image_1.png";
import project_image_2 from "./images/project_image_2.png";
import project_image_3 from "./images/project_image_3.png";
import project_image_4 from "./images/project_image_4.png";

const ProjectSection = styled.section`
  padding: 4rem 0;
  margin-top: -0.5rem;

  .projectImage {
    display: inline-block;
    max-width: 70%;
    height: 14rem;
    // margin-left: 15%;
    border-radius: 1rem;
    object-fit: cover;
  }

  .swiper_container {
    text-align: center;
  }

  .swiper-slide {
    width: 37rem;
    height: 20rem;
    position: relative;
  }

  .swiper-slide-shadow-left,
  .swiper-slide-shadow-right {
    display: none;
  }

  .slider-controler {
    position: relative;
    bottom: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider-controler .swiper-button-next {
    left: 58% !important;
    transform: translateX(-58%) !important;
  }

  .slider-controler .slider-arrow {
    background: var(--white);
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    left: 42%;
    transform: translateX(-42%);
    filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
  }

  .slider-controler .slider-arrow ion-icon {
    font-size: 2rem;
    color: #222224;
  }

  .slider-controler .slider-arrow::after {
    content: "";
  }

  .swiper-pagination {
    position: relative;
    width: 15rem !important;
    bottom: 1rem;
  }

  .swiper-pagination .swiper-pagination-bullet {
    filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
    margin-top: 1rem;
  }

  #projectHeading {
    color: #124572;
    margin: 1.5rem;
    margin-bottom: 1.2rem;
    margin-left: 4rem;
  }

  .project {
    display: inline-block;
    padding: 1rem 0;
    text-decoration: none;
    background-color: inherit;
    color: #fff;
    border: none;
    border-radius: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
  }

  .project:hover {
    background-color: #b2c8f1;
  }
`;

const Projects = () => {
  return (
    <ProjectSection>
      <h2 id="projectHeading">Projects</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <a
            href="https://github.com/Kashish-G/DataHack_2_Tensionflow"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Client-Attorney Matchmaking Platform
          </a>

          <img
            src={project_image_1}
            alt="slide_image"
            className="projectImage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <a
            href="https://github.com/abhaymathur21/IITR_Sociothon"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Waste Segregation Application
          </a>
          <img
            src={project_image_2}
            alt="slide_image"
            className="projectImage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <a
            href="https://github.com/abhaymathur21/HackX-Virtual-Classroom"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Multi-Modal Emotion Recognition for Virtual Classrooms
          </a>
          <img
            src={project_image_3}
            alt="slide_image"
            className="projectImage"
          />
        </SwiperSlide>
        <SwiperSlide>
          <a
            href="https://github.com/abhaymathur21/Fashion_Assistant_OpenAI"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Fashion Assistant AI Tool
          </a>
          <img
            src={project_image_4}
            alt="slide_image"
            className="projectImage"
          />
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </ProjectSection>
  );
};

export default Projects;
