import React from "react";
import styled from "styled-components";
import useScrollReveal from "../hooks/useScrollReveal";

const ResponsibilitiesSection = styled.section`
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 3rem;
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

const RolesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 72rem;
  margin: 0 auto;
`;

const RoleCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.72), rgba(255,255,255,0.72));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-left: 4px solid ${(props) => props.$accent || "#124572"};
  border-radius: 14px;
  padding: 1.4rem 1.8rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  transform-style: preserve-3d;

  &:hover {
    transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    background: linear-gradient(135deg, rgba(255,255,255,0.82), rgba(220,240,255,0.75), rgba(255,255,255,0.78));
  }
`;

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => (props.$hasDesc ? "0.8rem" : "0")};
`;

const RoleTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  color: #0d3b66;
  font-weight: 750;
`;

const RoleOrg = styled.p`
  margin: 0;
  font-size: 0.88rem;
  color: #2c4f6e;
  line-height: 1.45;
`;

const RoleDesc = styled.ul`
  margin: 0;
  padding-left: 1.15rem;
  font-size: 0.88rem;
  color: #2c4f6e;
  line-height: 1.6;

  li {
    margin-bottom: 0.4rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const roles = [
  {
    title: "Secretary",
    org: "DJS Beats",
    accent: "#6cb4d9",
    bullets: [
      "Organized two open mics and multiple music-themed events while performing with my band across competitions and college stages, representing the club.",
      "Learned to lead a team of people with very different ideas and skill sets, and bring them together as one group of performers who pour their hearts out on stage.",
      "Above all, this club transformed me from a shy introvert to someone who can just put on my Beats t-shirt, forget everything else in the world, and fearlessly perform on a stage in front of thousands of people. This club gave us all a home, and the power to become who we truly are: free.",
    ],
  },
  {
    title: "Head of Editorial Department",
    org: "DJS ACM SIGAI",
    accent: "#7ec8e3",
    bullets: [
      "Founding member of the committee for the first-ever AI & ML branch, with the goal of spreading AI knowledge across the college so students from every domain could leverage it in their own fields.",
      "Organized a 24-hour hackathon called Synergy and an AI-themed treasure hunt called Clockout.",
      "As Head of Editorial, designed the entire theme, workflow, script, clues, and content for Clockout.",
      "Responsible for drafting all important notices, emails, and communications sent to professors and the public.",
    ],
  },
];

const Responsibilities = () => {
  const revealRef = useScrollReveal(".reveal", 60);
  return (
    <ResponsibilitiesSection ref={revealRef}>
      <SectionHeading className="reveal section-heading">Positions of Responsibility</SectionHeading>
      <RolesGrid>
        {roles.map((r) => (
          <RoleCard key={r.title} $accent={r.accent} className="reveal">
            <RoleHeader $hasDesc={!!r.bullets}>
              <RoleTitle>{r.title}</RoleTitle>
              <RoleOrg>{r.org}</RoleOrg>
            </RoleHeader>
            {r.bullets && (
              <RoleDesc>
                {r.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </RoleDesc>
            )}
          </RoleCard>
        ))}
      </RolesGrid>
    </ResponsibilitiesSection>
  );
};

export default Responsibilities;
