import React from "react";
import styled from "styled-components";
import useScrollReveal from "../hooks/useScrollReveal";
import MobileCollapsible from "./MobileCollapsible";

const AchievementsSection = styled.section`
  padding: 2rem 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2rem;
  max-width: 72rem;
  margin: 0 auto;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.72), rgba(255,255,255,0.72));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  padding: 1.4rem 1.6rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  transform-style: preserve-3d;

  &:hover {
    transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    background: linear-gradient(135deg, rgba(255,255,255,0.82), rgba(220,240,255,0.75), rgba(255,255,255,0.78));
  }
`;

const Medal = styled.span`
  font-size: 1.6rem;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 0.15rem;
`;

const CardBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  color: #0d3b66;
  font-weight: 750;
  line-height: 1.35;
`;

const CardEvent = styled.p`
  margin: 0 0 0.6rem;
  font-size: 0.85rem;
  color: #2c4f6e;
  line-height: 1.7;
`;

const PlaceBadge = styled.span`
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  background: ${(props) => props.$bg || "rgba(13, 59, 102, 0.1)"};
  color: ${(props) => props.$color || "#124572"};
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: 0.5rem;
  color: #124572;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 700;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const achievements = [
  {
    title: "Searce Inc. Agentic AI Hackathon 2025",
    event: "Internal company-wide hackathon on Agentic AI",
    place: "First Place",
    medal: "\uD83E\uDD47",
    badgeBg: "rgba(255, 185, 0, 0.18)",
    badgeColor: "#8a6d00",
    link: "https://github.com/abhaymathur21/Supply_Chain_Agent",
  },
  {
    title: "IIT Bombay Techfest Hack-AI 2023",
    event: "AI/ML hackathon at Asia's largest science and technology festival",
    place: "Second Runner Up",
    medal: "\uD83E\uDD49",
    badgeBg: "rgba(173, 138, 86, 0.18)",
    badgeColor: "#6d5630",
    link: "https://github.com/abhaymathur21/Shopping-Assistant",
  },
  {
    title: "IIT Roorkee Sociothon 2023",
    event: "Social impact hackathon at IIT Roorkee",
    place: "Second Runner Up",
    medal: "\uD83E\uDD49",
    badgeBg: "rgba(173, 138, 86, 0.18)",
    badgeColor: "#6d5630",
    link: "https://github.com/abhaymathur21/IITR_Sociothon",
  },
  {
    title: "DataHack 2.0 Hackathon",
    event: "Data science and AI hackathon",
    place: "Winner in Problem Statement",
    medal: "\uD83C\uDFC6",
    badgeBg: "rgba(255, 185, 0, 0.18)",
    badgeColor: "#8a6d00",
    link: "https://github.com/Kashish-G/DataHack_2_Tensionflow",
  },
];

const Achievements = () => {
  const revealRef = useScrollReveal(".reveal", 50);
  return (
    <AchievementsSection ref={revealRef}>
      <MobileCollapsible
        renderHeader={(chevron) => (
          <SectionHeading className="reveal section-heading">
            Achievements {chevron}
          </SectionHeading>
        )}
      >
        <Grid>
          {achievements.map((a) => (
            <Card key={a.title} className="reveal">
              <Medal>{a.medal}</Medal>
              <CardBody>
                <CardTitle>{a.title}</CardTitle>
                <CardEvent>{a.event}</CardEvent>
                <PlaceBadge $bg={a.badgeBg} $color={a.badgeColor}>
                  {a.place}
                </PlaceBadge>
                {a.link && (
                  <ProjectLink
                    href={a.link}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    ↗ Project
                  </ProjectLink>
                )}
              </CardBody>
            </Card>
          ))}
        </Grid>
      </MobileCollapsible>
    </AchievementsSection>
  );
};

export default Achievements;
