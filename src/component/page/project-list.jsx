import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { project } from "../../redux/slice/projectSlice";
import Layout from "../layout/layout";
import { Avatar, Box, Typography } from "@mui/material";

import MUIDataTable from "mui-datatables";

const ProjectList = () => {
  const columns = ["Title", "Key", "profile", "Lead", "Start Date"];
  const projects = useSelector((state) => state.project.allProjectList);
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(project(access));
  }, [dispatch, access]);
  console.log(projects);
  const projectList = [];
  projects.forEach((element) => {
    const temp = [];

    temp.push(element.title);
    temp.push(element.key);
    temp.push(
      <Typography>
        {element.owner[0].fullName}
        <Avatar src={element.owner[0].profile} alt={element.owner[0].profile} />
      </Typography>
    );
    temp.push();
    temp.push(element.start_date);
    temp.push(element.id);
    projectList.push(temp);
  });
  console.log(projectList);
  const options = {
    filterType: "checkbox",
  };
  return (
    <Layout>
      <MUIDataTable
        title={"Employee List"}
        data={projectList}
        columns={columns}
        // options={options}
      />
    </Layout>
  );
};

export default ProjectList;
