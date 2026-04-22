import React from "react";
import styled from "styled-components";

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
  color: #124572;
  font-size: 2rem;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
    text-align: center;
  }
`;

const RolesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  max-width: 72rem;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const RoleCard = styled.div`
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 14px;
  padding: 1.4rem 1.6rem;
  flex: 1 1 260px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  }
`;

const RoleTitle = styled.h3`
  margin: 0 0 0.3rem;
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

const roles = [
  { title: "Secretary", org: "DJS Beats" },
  { title: "Head of Editorial Department", org: "DJS ACM SIGAI" },
];

const Responsibilities = () => {
  return (
    <ResponsibilitiesSection>
      <SectionHeading>Positions of Responsibility</SectionHeading>
      <RolesGrid>
        {roles.map((r) => (
          <RoleCard key={r.title}>
            <RoleTitle>{r.title}</RoleTitle>
            <RoleOrg>{r.org}</RoleOrg>
          </RoleCard>
        ))}
      </RolesGrid>
    </ResponsibilitiesSection>
  );
};

export default Responsibilities;
