import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import { Grid } from "@mui/material";
import Items from "./items";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../../redux/slice/projectSlice";
export default function ProjectCard() {
  const projectsList = useSelector((state) => state.project.allProjectList);
  const [projects, setprojects] = useState([projectsList]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isLoggedIn === false) {
  //     navigate("/login");
  //   }
  // }, [isLoggedIn, navigate]);
  const access = useSelector((state) => state.auth.token.access);
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const getUserInformation = async () => {
  //       console.log(access);
  //       const { data } = await axios.get(
  //         "http://127.0.0.1:8000/project/all-list/",
  //         { headers: { Authorization: `Bearer ${access}` } }
  //       );
  //       setprojects(data.data.projects);
  //     };
  //     getUserInformation();
  //   }
  // }, [isLoggedIn, access]);

  const dispatch = useDispatch();
  // const { access } = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(getProjects(access));
  }, [dispatch, access]);
  useEffect(() => {
    setprojects(projectsList);
  }, [projectsList]);
  console.log(projectsList);
  return (
    <Box>
      <Grid container spacing={1} sx={{ margin: "0 auto" }}>
        {projects.map((data, index) => {
          if (index < 5) {
            return (
              <Grid item xs={2} md={2}>
                <Card variant="outlined" sx={{ minHeight: "13rem" }}>
                  {
                    <Items
                      title={data.title}
                      key={data.key}
                      description={data.description}
                      team={data.hasOwnProperty("team") ? data.team.length : 1}
                    />
                  }
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    </Box>
  );
}
