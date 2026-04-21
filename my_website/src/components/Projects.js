import React from "react";
import styled from "styled-components";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProjectSection = styled.section`
  padding: 4rem 0;
  margin-top: -0.5rem;

  #projectHeading {
    color: #124572;
    margin: 1.5rem;
    margin-bottom: 1.2rem;
    margin-left: 4rem;
  }
  .projectGrid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
    padding: 0 2rem;
  }
`;

const Projects = () => {
  const projects = [
    {
      title: "Client–Attorney Matchmaking Platform",
      href: "https://github.com/Kashish-G/DataHack_2_Tensionflow",
    },
    {
      title: "Waste Segregation Application",
      href: "https://github.com/abhaymathur21/IITR_Sociothon",
    },
    {
      title: "Multi-Modal Emotion Recognition for Virtual Classrooms",
      href: "https://github.com/abhaymathur21/HackX-Virtual-Classroom",
    },
    {
      title: "Fashion Assistant AI Tool",
      href: "https://github.com/abhaymathur21/Fashion_Assistant_OpenAI",
    },
  ];

  return (
    <ProjectSection>
      <h2 id="projectHeading">Projects</h2>
      <div className="projectGrid">
        {projects.map((p) => (
          <Card key={p.href} sx={{ width: 420, maxWidth: "100%" }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {p.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View source on GitHub.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => window.open(p.href, "_blank")}>
                Open
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </ProjectSection>
  );
};

export default Projects;
