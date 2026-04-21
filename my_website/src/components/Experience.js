import React from "react";
import styled from "styled-components";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ExperienceSection = styled.section`
  // display: flex;
  // max-width: 27.4rem;
  // margin-right: 13rem;
  // margin-top: -2rem;
  padding-top: 2rem;
  // text-align: center;

  #experienceHeading {
    padding-top: 1rem;
    padding-left: 4rem;
    margin-bottom: 3.2rem;
    color: #124572;
    // font-size: 1.8rem;
  }
`;

const Cards = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;
  text-align: left;
`;

// marginRight:'-23rem'
const Experience = () => {
  return (
    <ExperienceSection>
      <h2 id="experienceHeading">Work Experience</h2>
      <Cards>
        <Card sx={{ maxWidth: 420 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              AI Engineer — Searce
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Designed and built multi-agent LLM systems with Google ADK for
              automated anomaly diagnosis across network + database signals.
              Deployed agentic chat experiences on Vertex AI Agent Engine and
              Cloud Run.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                window.open("https://www.linkedin.com/company/searce/", "_blank")
              }
            >
              Learn More
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 420 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              AI Intern — Microsoft Research & Navsahyog
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Worked on “Jugalbandi Studio” to integrate a multilingual RAG-based
              Telegram chatbot. Built a document translation site and a
              grant-writing assistant grounded in prior proposals.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                window.open(
                  "https://www.microsoft.com/en-us/research/",
                  "_blank"
                )
              }
            >
              Learn More
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ maxWidth: 420 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              AI Developer Intern — Airrchip
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Built a RAG chatbot for capital markets using live news, knowledge
              graphs, and NER-based stock trend analysis. Built and deployed a
              FastAPI backend with AWS DynamoDB and S3.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() =>
                window.open("https://www.linkedin.com/", "_blank")
              }
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Cards>
    </ExperienceSection>
  );
};

export default Experience;
