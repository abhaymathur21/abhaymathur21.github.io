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
  background: linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.72), rgba(255,255,255,0.72));
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
    background: linear-gradient(135deg, rgba(255,255,255,0.82), rgba(220,240,255,0.75), rgba(255,255,255,0.78));
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

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.8rem;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  background: rgba(13, 59, 102, 0.1);
  color: #124572;
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
    tags: ["AutoGen", "Python", "OCR", "VS Code"],
  },
  {
    title: "Aura — Personal Voice Assistant",
    desc: "A voice-controlled personal assistant that manages emails, calendar events, music, news, weather, and complex calculations using speech recognition and AutoGen agents.",
    href: "https://github.com/abhaymathur21/Aura",
    tags: ["AutoGen", "Speech Recognition", "Python"],
  },
  {
    title: "Client–Attorney Matchmaking Platform",
    desc: "An intelligent platform that matches clients with the right attorneys based on case requirements, built at the DataHack 2.0 hackathon.",
    href: "https://github.com/Kashish-G/DataHack_2_Tensionflow",
    tags: ["Python", "ML", "NLP"],
  },
  {
    title: "TensionNews — News Data Extraction & Visualization",
    desc: "A platform that extracts and visualizes news data using NetworkX graphs, sentiment analysis, stock correlation, and a chatbot, built with Flask, Next.js, and Supabase for LOC 6.0.",
    href: "https://github.com/abhaymathur21/TensionNews",
    tags: ["Flask", "Next.js", "Supabase", "NetworkX"],
  },
  {
    title: "Shopping Assistant — Personalised Shopping with uAgents",
    desc: "An intelligent shopping assistant using Fetch.ai uAgents for product recommendations, multi-source price comparison, and an AI fashion advisor, built with Next.js and Flask for HackAI at IIT Bombay Techfest 2023.",
    href: "https://github.com/abhaymathur21/Shopping-Assistant",
    tags: ["Fetch.ai", "uAgents", "Next.js", "Flask"],
  },
  {
    title: "SmartMart — Smart E-commerce Application",
    desc: "An intelligent e-commerce platform featuring LSTM-based demand forecasting, Apriori product recommendations, Gemini-powered chatbot, and uAgents for real-time alerts, built with Next.js and Flask for Cyber Cypher 3.0.",
    href: "https://github.com/abhaymathur21/SmartMart",
    tags: ["LSTM", "Gemini", "uAgents", "Next.js", "Flask"],
  },
  {
    title: "GreenBasket — Grocery Inventory & Delivery Management",
    desc: "A grocery store management system with CNN-based stock detection, LSTM demand forecasting, and uAgents for automated inventory alerts and delivery coordination, built with Flask for Cyber Cypher 3.0.",
    href: "https://github.com/abhaymathur21/GreenBasket",
    tags: ["CNN", "LSTM", "uAgents", "Flask"],
  },
  {
    title: "Waste Segregation Application",
    desc: "An AI-powered app for automated waste classification and segregation, built at the IIT Roorkee Sociothon hackathon.",
    href: "https://github.com/abhaymathur21/IITR_Sociothon",
    tags: ["Computer Vision", "Python"],
  },
  {
    title: "Multi-Modal Emotion Recognition for Virtual Classrooms",
    desc: "Real-time emotion detection combining audio, video, and text signals to enhance virtual classroom engagement.",
    href: "https://github.com/abhaymathur21/HackX-Virtual-Classroom",
    tags: ["Multi-Modal AI", "NLP", "Computer Vision"],
  },
];

const Projects = () => {
  const revealRef = useScrollReveal(".reveal", 40);
  return (
    <ProjectSection ref={revealRef}>
      <SectionHeading className="reveal section-heading">Projects</SectionHeading>
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
            {p.tags && (
              <TagsRow>
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </TagsRow>
            )}
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
