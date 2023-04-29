import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/slice/projectSlice";
import Layout from "../layout/layout";
import { Avatar, Box, Typography } from "@mui/material";

import MUIDataTable from "mui-datatables";

const ProjectList = () => {
  const columns = ["Title", "Key", "Lead", "Start Date"];
  const projects = useSelector((state) => state.project.allProjectList);
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(getProjects(access));
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
    const date = new Date(element.start_date);
    temp.push(
      date.getDate() + " - " + date.getMonth() + " - " + date.getFullYear()
    );
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
