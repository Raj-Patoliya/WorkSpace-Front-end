import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { project } from "../../redux/slice/projectSlice";
import Layout from "../layout/layout";
import { Box } from "@mui/material";

import MUIDataTable from "mui-datatables";

const ProjectList = () => {
  const columns = ["Name", "Company", "City", "State"];
  const projects = useSelector((state) => state.project.allProjectList);
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(project(access));
  }, [dispatch, access]);
  console.log(projects);

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  const options = {
    filterType: "checkbox",
  };
  return (
    <Layout>
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    </Layout>
  );
};

export default ProjectList;
