import React from "react";

const Projects = () => {
  return (
    <section id ="projectSection">
      <h2 id="projectHeading">Projects</h2>
      <ul id='projectsList'>
        <li className="projectListItem1">
          <a
            href="https://github.com/Kashish-G/DataHack_2_Tensionflow"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Client-Attorney Matchmaking Platform
          </a>
        </li>
        <li className="projectListItem">
          <a
            href="https://github.com/abhaymathur21/IITR_Sociothon"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Waste Segregation Application
          </a>
        </li>
        <li className="projectListItem">
          <a
            href="https://github.com/abhaymathur21/HackX-Virtual-Classroom"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Multi-Modal Emotion Recognition for Virtual Classrooms
          </a>
        </li>
        <li className="projectListItem">
          <a
            href="https://github.com/abhaymathur21/HackAI_Hack-230386"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Temperature Alert Agent
          </a>
        </li>
        <li className="projectListItem">
          <a
            href="https://github.com/abhaymathur21/Fashion_Assistant_OpenAI"
            className="project"
            target="_blank"
            rel="noreferrer noopener"
          >
            Fashion Assistant AI Tool
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Projects;
