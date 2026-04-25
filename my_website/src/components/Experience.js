import React from "react";
import styled from "styled-components";
import useScrollReveal from "../hooks/useScrollReveal";
import MobileCollapsible from "./MobileCollapsible";

const ExperienceSection = styled.section`
  padding: 3rem 2rem 2rem;

  #experienceHeading {
    padding-top: 1rem;
    padding-left: 2rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;

    #experienceHeading {
      padding-left: 0.5rem;
      text-align: center;
    }
  }
`;

const CompanyBlock = styled.div`
  max-width: 72rem;
  margin: 0 auto 3rem;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem 1.2rem;
  margin-bottom: 1.2rem;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const CompanyName = styled.h3`
  margin: 0;
  font-size: 1.45rem;
  color: #0d3b66;
  font-weight: 800;
  letter-spacing: 0.2px;
`;

const RoleBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  color: #0d3b66;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  border: 1px solid rgba(13, 59, 102, 0.18);
`;

const Duration = styled.span`
  margin-left: auto;
  color: rgba(18, 69, 114, 0.65);
  font-size: 0.88rem;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ProjectCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.72), rgba(255,255,255,0.72));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  padding: 1.6rem 1.7rem;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;

  &:hover {
    transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    background: linear-gradient(135deg, rgba(255,255,255,0.82), rgba(220,240,255,0.75), rgba(255,255,255,0.78));
  }
`;

const ProjectTitle = styled.h4`
  margin: 0 0 0.7rem;
  font-size: 1.08rem;
  color: #0d3b66;
  font-weight: 750;
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 1.15rem;
  flex: 1;
  list-style: none;
`;

const Bullet = styled.li`
  font-size: 0.85rem;
  color: #2c4f6e;
  line-height: 1.7;
  margin-bottom: 0.65rem;
  position: relative;
  padding-left: 0.2rem;

  &::before {
    content: "—";
    position: absolute;
    left: -1.15rem;
    color: rgba(13, 59, 102, 0.35);
    font-weight: 700;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CompanyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.1rem;
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


const SectionHeading = styled.h2`
  padding-top: 1rem;
  padding-left: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
    text-align: center;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,255,255,0.72), rgba(255,255,255,0.72));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  padding: 1.6rem 1.8rem;
  max-width: 72rem;
  margin: 0 auto;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  transform-style: preserve-3d;

  &:hover {
    transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    background: linear-gradient(135deg, rgba(255,255,255,0.82), rgba(220,240,255,0.75), rgba(255,255,255,0.78));
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 0.9rem;
`;

const FeatureTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: #0d3b66;
  font-weight: 800;
`;

const FeatureSubtitle = styled.span`
  font-size: 0.88rem;
  color: rgba(18, 69, 114, 0.65);
  font-weight: 600;
`;

const FeatureLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: auto;
  color: #124572;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 700;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const StatRow = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const StatPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  background: rgba(13, 59, 102, 0.07);
  min-width: 5rem;
`;

const StatValue = styled.span`
  font-size: 1.15rem;
  font-weight: 800;
  color: #0d3b66;
`;

const StatLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 650;
  color: rgba(18, 69, 114, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.15rem;
`;

const companies = [
  {
    name: "Searce Inc.",
    role: "AI Engineer",
    duration: "June 2025 — Present",
    url: "https://www.searce.com/",
    projects: [
      {
        title: "Anomaly Diagnosis Framework",
        bullets: [
          "Designed a multi-agent LLM system using Google's ADK for automated root-cause analysis and diagnosis of network and database anomalies for a real-estate client.",
          "Developed 10 sub-agents performing different diagnostic steps — checking current and historical status of concerned network and database services.",
          "Built an agent to establish correlation between network anomalies and database anomalies to determine possible causes and dependencies.",
          "Deployed a chatbot to interact with a high-volume anomaly database (processing 1,500 anomalies/day) using Vertex AI Agent Engine and Cloud Run.",
        ],
      },
      {
        title: "Agentic AI Data Aggregation System",
        bullets: [
          "Built an agentic framework using Google's ADK leveraging 3 data sources (Github, Benchling, and GCS buckets) to answer complex user queries for a Bio-Tech client.",
          "Set up datastores in Gemini Enterprise for the GCS bucket agent and utilized Github's MCP Toolset for the Github Agent.",
        ],
      },
      {
        title: "Graph RAG & Graph Analytics",
        bullets: [
          "Developed a Neo4j-based Graph RAG system by extracting entities and LLM-inferred relationships from unstructured documents.",
          "Enabled schema-aware LLM Q&A with auto-generated Cypher queries for precise graph retrieval.",
          "Modeled membership and case-flow data, and explored GCNs for graph representation learning.",
        ],
      },
    ],
  },
  {
    name: "Microsoft Research & Navsahyog",
    role: "AI Intern",
    duration: "June 2024 — June 2025",
    url: "https://www.navsahyog.org/",
    projects: [
      {
        title: "Jugalbandi Studio — Multilingual RAG Chatbot",
        bullets: [
          'Worked under a Principal Research SDE at Microsoft Research on the open-source project \u201CJugalbandi Studio\u201D to build and integrate a multilingual RAG-based chatbot with Telegram for the NGO.',
        ],
      },
      {
        title: "Document Translation & Grant-Writing Assistant",
        bullets: [
          "Built a document translation website for multilingual document processing.",
          "Developed a grant-writing assistant using prior proposals as contextual grounding.",
        ],
      },
    ],
  },
  {
    name: "Purry Tails",
    role: "Co-Founder & CTO",
    duration: "December 2023 — May 2025",
    url: "https://purrytails.in",
    projects: [
      {
        title: "AI-Powered Veterinary Document Processing",
        bullets: [
          "Built an AI pipeline using Google Gemini (vision + text) to extract structured data from uploaded vet images and PDFs \u2014 including date, diseases, medicines, doctor name, clinical domain, and summary.",
          "Developed a multi-page PDF segmentation system using PyMuPDF for rasterization and Gemini for intelligent report boundary detection, grouping pages that belong to the same visit.",
        ],
      },
      {
        title: "RAG Pet Health Chatbot",
        bullets: [
          "Implemented a RAG chatbot using ChromaDB and LangChain for semantic report retrieval, with Gemini answering queries grounded in the pet\u2019s medical history.",
          "Added a classifier layer that routes queries between report-retrieval and general pet health Q&A paths, with Web Speech API for voice input.",
        ],
      },
      {
        title: "Full-Stack Platform & Deployment",
        bullets: [
          "Built the entire platform end-to-end using React 18 frontend with Google OAuth, FastAPI backend, ChromaDB for storage, Razorpay payment integration with subscription and trial support, and pet profile management with multi-pet support and cross-user sharing.",
          "Implemented doctor-patient report sharing, Fernet-encrypted QR codes for shareable pet health dashboards, Google Calendar/Meet integration for vet appointments, and in-app peer messaging.",
          "Deployed to production at purrytails.in using Docker, Nginx reverse proxy, and Let\u2019s Encrypt TLS certificates.",
        ],
      },
    ],
  },
  {
    name: "Kairos Spark AI",
    role: "AI Intern",
    duration: "March 2025 — April 2025",
    url: "https://kairos-sparkai.com/aec/",
    projects: [
      {
        title: "GrantForge — Chat History & Web Search Integration",
        bullets: [
          "Built the session-aware chat history system for the RAG pipeline, using LangChain\u2019s ConversationBufferMemory with a token-budgeted windowing strategy that accumulates recent messages in reverse until the budget is reached, preserving context across multi-turn conversations.",
          "Integrated SerpAPI-powered web search augmentation — an LLM first generates a search query from the user\u2019s question and retrieved context, then the system fetches organic results asynchronously and injects them as supplementary context when the vector store alone is insufficient.",
        ],
      },
    ],
  },
  {
    name: "Airrchip",
    role: "AI Developer Intern",
    duration: "March 2024 — August 2024",
    url: "https://www.linkedin.com/company/airrchip/",
    projects: [
      {
        title: "Capital Markets RAG Chatbot",
        bullets: [
          "Constructed a RAG-based chatbot for capital markets using live news, knowledge graphs, and NER-based stock trend analysis.",
        ],
      },
      {
        title: "Medical Application Backend",
        bullets: [
          "Built and deployed the backend of a medical application using FastAPI with AWS DynamoDB and S3.",
        ],
      },
    ],
  },
  {
    name: "Eccomix Infratech Industries",
    role: "Full Stack Web Developer Intern",
    duration: "November 2023 — February 2024",
    url: "https://www.linkedin.com/company/eccomix-infratech-industries/",
    projects: [
      {
        title: "Contract Management Website",
        bullets: [
          "Built a contract management website for the company to streamline their internal contract workflows.",
        ],
      },
    ],
  },
  {
    name: "Mecha Systems",
    role: "ML Developer",
    duration: "June 2023 — August 2023",
    url: "https://mecha.so/",
    projects: [
      {
        title: "ML on Custom Embedded Devices",
        bullets: [
          "Implemented Object Detection, Semantic Segmentation, Speech Recognition, and other ML models on a custom embedded device manufactured by Mecha.",
          "Learned to deploy TFLite object detection models using Docker on custom embedded devices and Unix-based systems.",
          "Collaborated with my mentor to fix issues in TensorFlow Lite's example code for edge devices — specifically resolving Object Detection on a Raspberry Pi and opening a Pull Request to TFLite's official GitHub repository.",
        ],
      },
    ],
  },
];

const Experience = () => {
  const revealRef = useScrollReveal(".reveal", 50);
  return (
    <ExperienceSection ref={revealRef}>
      <MobileCollapsible
        renderHeader={(chevron) => (
          <h2 id="experienceHeading" className="reveal section-heading">
            Work Experience {chevron}
          </h2>
        )}
      >
        {companies.map((company) => (
          <CompanyBlock key={company.name} className="reveal">
            <MobileCollapsible
              renderHeader={(chevron) => (
                <CompanyHeader>
                  <CompanyName>{company.name} {chevron}</CompanyName>
                  <RoleBadge>{company.role}</RoleBadge>
                  <Duration>{company.duration}</Duration>
                  <CompanyLink
                    href={company.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ↗ Company page
                  </CompanyLink>
                </CompanyHeader>
              )}
            >
              <ProjectCards>
                {company.projects.map((project) => (
                  <ProjectCard key={project.title}>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <BulletList>
                      {project.bullets.map((b, i) => (
                        <Bullet key={i}>{b}</Bullet>
                      ))}
                    </BulletList>
                  </ProjectCard>
                ))}
              </ProjectCards>
            </MobileCollapsible>
          </CompanyBlock>
        ))}
      </MobileCollapsible>

      {/* Research Papers */}
      <MobileCollapsible
        renderHeader={(chevron) => (
          <SectionHeading className="reveal section-heading">
            Research Papers {chevron}
          </SectionHeading>
        )}
      >
        <CompanyBlock className="reveal">
          <FeatureCard>
            <FeatureHeader>
              <FeatureTitle>KAJU — Knowledge Assistant for Joint Utility</FeatureTitle>
              <FeatureLink
                href="https://ieeexplore.ieee.org/document/11412089"
                target="_blank"
                rel="noreferrer noopener"
              >
                ↗ IEEE Xplore
              </FeatureLink>
            </FeatureHeader>
            <BulletList>
              <Bullet>
                Architected and developed a multi-agent LLM system (FastAPI + Java
                GUI) enabling autonomous code modification, debugging, and system
                command execution.
              </Bullet>
              <Bullet>
                Implemented RAG-based project integration using ChromaDB for
                context-aware code retrieval and intelligent CRUD operations on
                large codebases.
              </Bullet>
            </BulletList>
            <StatRow>
              <StatPill>
                <StatValue>88.75%</StatValue>
                <StatLabel>Task Success</StatLabel>
              </StatPill>
              <StatPill>
                <StatValue>93.45%</StatValue>
                <StatLabel>Recovery Rate</StatLabel>
              </StatPill>
              <StatPill>
                <StatValue>124</StatValue>
                <StatLabel>Evaluations</StatLabel>
              </StatPill>
            </StatRow>
          </FeatureCard>
        </CompanyBlock>
      </MobileCollapsible>

      {/* Open Source Contributions */}
      <MobileCollapsible
        renderHeader={(chevron) => (
          <SectionHeading className="reveal section-heading">
            Open Source Contributions {chevron}
          </SectionHeading>
        )}
      >
        <CompanyBlock className="reveal">
          <FeatureCard>
            <FeatureHeader>
              <FeatureTitle>Microsoft — AG2 (AutoGen)</FeatureTitle>
              <FeatureSubtitle>February 2024</FeatureSubtitle>
              <FeatureLink
                href="https://github.com/microsoft/autogen"
                target="_blank"
                rel="noreferrer noopener"
              >
                ↗ Repository
              </FeatureLink>
            </FeatureHeader>
            <BulletList>
              <Bullet>
                Fixed an issue in AutoGen's User Proxy Agent that prevented
                automatic shell script execution by updating PowerShell command
                handling to support newer PowerShell versions, enabling
                compatibility across operating systems.
              </Bullet>
            </BulletList>
          </FeatureCard>
        </CompanyBlock>
      </MobileCollapsible>
    </ExperienceSection>
  );
};

export default Experience;
