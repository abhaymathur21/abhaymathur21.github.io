import React from "react";
import styled from "styled-components";
import useScrollReveal from "../hooks/useScrollReveal";

const ProjectSection = styled.section`
  padding: 2rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 2rem 1rem 3rem;
  }
`;

const SectionHeading = styled.h2`
  padding-top: 1rem;
  padding-left: 2rem;
  margin-bottom: 2.5rem;
  color: #124572;
  font-size: 2rem;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
    text-align: center;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
  max-width: 72rem;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.a`
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  padding: 1.5rem 1.6rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  transform-style: preserve-3d;

  &:hover {
    transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
  color: #0d3b66;
  font-weight: 750;
  line-height: 1.35;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: #2c4f6e;
  line-height: 1.55;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(13, 59, 102, 0.08);
`;

const GithubIcon = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: #124572;
  opacity: 0.7;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

const projects = [
  {
    title: "TensionCode — Function Code Generator",
    desc: "A platform that generates function code in multiple languages from structured and unstructured databases, with code evaluation via AutoGen, ER-diagram OCR, flowchart generation, and VS Code integration, built at Hackniche 2.0.",
    href: "https://github.com/abhaymathur21/TensionCode",
  },
  {
    title: "Aura — Personal Voice Assistant",
    desc: "A voice-controlled personal assistant that manages emails, calendar events, music, news, weather, and complex calculations using speech recognition and AutoGen agents.",
    href: "https://github.com/abhaymathur21/Aura",
  },
  {
    title: "Client–Attorney Matchmaking Platform",
    desc: "An intelligent platform that matches clients with the right attorneys based on case requirements, built at the DataHack 2.0 hackathon.",
    href: "https://github.com/Kashish-G/DataHack_2_Tensionflow",
  },
  {
    title: "TensionNews — News Data Extraction & Visualization",
    desc: "A platform that extracts and visualizes news data using NetworkX graphs, sentiment analysis, stock correlation, and a chatbot, built with Flask, Next.js, and Supabase for LOC 6.0.",
    href: "https://github.com/abhaymathur21/TensionNews",
  },
  {
    title: "Shopping Assistant — Personalised Shopping with uAgents",
    desc: "An intelligent shopping assistant using Fetch.ai uAgents for product recommendations, multi-source price comparison, and an AI fashion advisor, built with Next.js and Flask for HackAI at IIT Bombay Techfest 2023.",
    href: "https://github.com/abhaymathur21/Shopping-Assistant",
  },
  {
    title: "SmartMart — Smart E-commerce Application",
    desc: "An intelligent e-commerce platform featuring LSTM-based demand forecasting, Apriori product recommendations, Gemini-powered chatbot, and uAgents for real-time alerts, built with Next.js and Flask for Cyber Cypher 3.0.",
    href: "https://github.com/abhaymathur21/SmartMart",
  },
  {
    title: "GreenBasket — Grocery Inventory & Delivery Management",
    desc: "A grocery store management system with CNN-based stock detection, LSTM demand forecasting, and uAgents for automated inventory alerts and delivery coordination, built with Flask for Cyber Cypher 3.0.",
    href: "https://github.com/abhaymathur21/GreenBasket",
  },
  {
    title: "Waste Segregation Application",
    desc: "An AI-powered app for automated waste classification and segregation, built at the IIT Roorkee Sociothon hackathon.",
    href: "https://github.com/abhaymathur21/IITR_Sociothon",
  },
  {
    title: "Multi-Modal Emotion Recognition for Virtual Classrooms",
    desc: "Real-time emotion detection combining audio, video, and text signals to enhance virtual classroom engagement.",
    href: "https://github.com/abhaymathur21/HackX-Virtual-Classroom",
  },
  // {
  //   title: "Fashion Assistant AI Tool",
  //   desc: "An AI-powered fashion assistant using OpenAI to provide personalized outfit recommendations and style advice.",
  //   href: "https://github.com/abhaymathur21/Fashion_Assistant_OpenAI",
  // }, 
];

const Projects = () => {
  const revealRef = useScrollReveal(".reveal", 80);
  return (
    <ProjectSection ref={revealRef}>
      <SectionHeading className="reveal">Projects</SectionHeading>
      <Grid>
        {projects.map((p) => (
          <Card
            className="reveal"
            key={p.href}
            href={p.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            <CardTitle>{p.title}</CardTitle>
            <CardDesc>{p.desc}</CardDesc>
            <CardFooter>
              <GithubIcon>↗ View on GitHub</GithubIcon>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </ProjectSection>
  );
};

export default Projects;
