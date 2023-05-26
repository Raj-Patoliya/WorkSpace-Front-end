import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { TabView, TabPanel } from "primereact/tabview";
import { UserIssueBasicDetailsAPI } from "../../redux/api";
import ProjectCard from "../ui/Project/projectCard";
import CreatedByYou from "../ui/Issues/CreatedIssues";
import AssignedToYou from "../ui/Issues/AssignedIssues";
import Layout from "../layout/layout";

const Home = () => {
  const { access } = useSelector((state) => state.auth.token);
  const [assined, setAssined] = useState([]);
  const [reported, setReported] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await UserIssueBasicDetailsAPI(access);
      setAssined(data.assignedIssue);
      setReported(data.reportedIssue);
    })();
  }, [access]);

  return (
    <Layout>
      <CssBaseline />
      <Container sx={{ margin: "0 auto" }}>
        <Box sx={{ bgcolor: "transparent" }}>
          <Typography variant="h4" color={"inherit"}>
            Your work
          </Typography>
          <br />
          <Typography color={"inherit"}>Recent Projects</Typography>
          <ProjectCard />

          <Box
            sx={{
              width: "100%",
              marginTop: 1,
              marginBottom: -3,
              marginLeft: 1,
            }}
          >
            <Typography
              component="a"
              href={"/projects"}
              sx={{ textDecoration: "none", fontSize: "15px" }}
            >
              View All Projects
            </Typography>
          </Box>
          <div className="card">
            <TabView>
              <TabPanel header="Assigned to me">
                <AssignedToYou data={assined} />
              </TabPanel>
              <TabPanel header="Me as Reporter">
                <CreatedByYou data={reported} />
              </TabPanel>
            </TabView>
          </div>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
