import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { Grid } from "@mui/material";
import Items from "./items";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
export default function ProjectCard() {
  const [projects, setprojects] = useState([]);
  useEffect(() => {
    const getUserInformation = async () => {
      const token = localStorage.getItem("access");
      console.log(token);
      const { data } = await axios.get(
        "http://127.0.0.1:8000/project/all-list/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(data.data);
      setprojects(data.data.projects);
    };
    getUserInformation();
  }, []);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Grid container spacing={2}>
        {projects.map((data) => {
          return (
            <Grid item xs={2} md={2.4} sx={{ minHeight: "18rem" }}>
              <Card variant="outlined">
                {
                  <Items
                    title={data.title}
                    key={data.key}
                    description={data.description}
                    team={data.team.length}
                  />
                }
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
