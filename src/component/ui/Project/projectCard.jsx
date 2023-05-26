import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import Items from "./items";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../redux/slice/projectSlice";
export default function ProjectCard() {
  const projectsList = useSelector((state) => state.project.allProjectList);
  const [isLoading, setisLoading] = useState(true);
  const [projects, setprojects] = useState({ ...projectsList });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  useEffect(() => {
    setprojects(projectsList);
    setisLoading(false);
  }, [projectsList]);
  return (
    <Box>
      <Grid container spacing={1} sx={{ margin: "0 auto" }}>
        {projects &&
          projects.hasOwnProperty("results") &&
          !isLoading &&
          projects.results.length === 0 && (
            <>
              <h1>No Projects</h1>
            </>
          )}

        {projects &&
          projects.hasOwnProperty("results") &&
          !isLoading &&
          projects.results.map((data, index) => {
            if (index < 5) {
              return (
                <Grid item xs={2} md={2} key={data.id}>
                  <Card variant="outlined" sx={{ minHeight: "13rem" }}>
                    {
                      <Items
                        title={data.title}
                        key={data.key}
                        issue={
                          data.hasOwnProperty("issue") ? data.issue.length : 0
                        }
                        description={data.description}
                        team={
                          data.hasOwnProperty("team") ? data.team.length : 1
                        }
                      />
                    }
                  </Card>
                </Grid>
              );
            } else {
              return null;
            }
          })}
      </Grid>
    </Box>
  );
}
