import React from "react";
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

const Home = () => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <CssBaseline />
      <Container sx={{ margin: 0 }}>
        <Box sx={{ bgcolor: "transparent" }}>
          <Typography variant="h4" color={"inherit"}>
            <br />
            Your work
          </Typography>
          <br />
          <Typography color={"inherit"}>Recent Projects</Typography>
          <ProjectCard />
          <Typography component="div" marginTop={3}>
            View All Projects(Navigation Link)
          </Typography>
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
          {value === "one" && <AssignedToYou />}
          {value === "two" && <CreatedByYou />}
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
