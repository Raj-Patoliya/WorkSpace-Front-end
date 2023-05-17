import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import ProjectCard from "../ui/Project/projectCard";
// import ImageIcon from "@mui/icons-material/Image";
// import WorkIcon from "@mui/icons-material/Work";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import {
  Box,
  Container,
  CssBaseline,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import AssignedToYou from "../ui/Issues/Assigned";
import CreatedByYou from "../ui/Issues/Created";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../redux/slice/authSlice";
import { UserIssueBasicDetailsAPI } from "../../redux/api";

const Home = () => {
  const [value, setValue] = React.useState("one");
  const { access } = useSelector((state) => state.auth.token);
  const [assined, setAssined] = useState([]);
  const [reported, setReported] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await UserIssueBasicDetailsAPI(access);
      setAssined(data.assignedIssue);
      setAssined(data.reportedIssue);
    })();
  }, [access]);
  useEffect(() => {
    console.log(assined);
  }, [assined]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Box sx={{ width: "100%", marginTop: 5 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="one" label="Issues Assign to you" />
              <Tab value="two" label="Issues Created By You" />
            </Tabs>
            <CssBaseline />
          </Box>
          {value === "one" && <AssignedToYou data={assined} />}
          {value === "two" && <CreatedByYou data={reported} />}
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
