import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { Grid } from "@mui/material";
import Items from "./items";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function ProjectCard() {
  const [projects, setprojects] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const access = useSelector((state) => state.user.user.access);
  useEffect(() => {
    if (isLoggedIn) {
      const getUserInformation = async () => {
        console.log(access);
        const { data } = await axios.get(
          "http://127.0.0.1:8000/project/all-list/",
          { headers: { Authorization: `Bearer ${access}` } }
        );
        console.log(data.data);
        setprojects(data.data.projects);
      };
      getUserInformation();
    }
  }, [isLoggedIn, access]);
  return (
    <Box>
      <Grid container spacing={1} sx={{ margin: "0 auto" }}>
        {projects.map((data) => {
          return (
            <Grid item xs={2} md={2}>
              <Card variant="outlined" sx={{ minHeight: "18rem" }}>
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
