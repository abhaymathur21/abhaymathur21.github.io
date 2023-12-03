import React from "react";
import styled from "styled-components";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import eccomixImage from "C:/Users/a21ma/OneDrive/Desktop/Code/React/My Website/my_website/src/components/images/Eccomix.png";

import mecha from "C:/Users/a21ma/OneDrive/Desktop/Code/React/My Website/my_website/src/components/images/mecha.jpg";

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
  gap: 10rem;

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
        <Card sx={{}}>
          <CardMedia
            component="img"
            alt="Eccomix"
            height="140"
            src={eccomixImage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Full Stack Web Developer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Making a contract management website for the company.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => window.open("https://eccomix.in/", "_blank")}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>

        <Card sx={{}}>
          <CardMedia component="img" alt="mecha" height="140" src={mecha} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              ML Developer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Implementing ML models on a custom embedded device
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => window.open("https://www.linkedin.com/company/mecha-systems/about/", "_blank")}
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
