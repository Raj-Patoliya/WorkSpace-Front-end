import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/layout";
import { Avatar } from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../redux/slice/projectSlice";

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.project.allProjectList);
  const { access } = useSelector((state) => state.auth.token);
  const [filterProject, setfilterProject] = useState([]);
  const [projectList, setprojectList] = useState([]);
  useEffect(() => {
    dispatch(getProjects(access));
  }, [dispatch, access]);
  useEffect(() => {
    const project = projects.map((element) => {
      const temp = {};
      temp.title = element.title;
      temp.key = element.key;
      temp.profile = (
        <div className="row" style={{ alignItems: "center" }}>
          <Avatar
            src={element.owner[0].profile}
            alt={element.owner[0].profile}
            sx={{ width: "50px", height: "30px" }}
          />
          {element.owner[0].fullName}
        </div>
      );
      const date = new Date(element.start_date);
      temp.date =
        date.getDate() + " - " + date.getMonth() + " - " + date.getFullYear();
      return temp;
    });
    setprojectList(project);
    setfilterProject(project);
  }, [projects]);
  const onRowClick = (data) => {
    navigate(`/projects/work/${data.data.key}`);
  };
  const tableHeader = () => {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <p class="navbar-brand">Your Title</p>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <div class="d-flex ms-auto">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={projectSearchHandler}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  };

  const projectSearchHandler = (e) => {
    if (e.target.value !== "") {
      const project = projectList.filter((data) =>
        data.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setfilterProject(project);
    } else {
      setfilterProject(projectList);
    }
  };

  return (
    <Layout>
      <div className="card">
        <DataTable
          header={tableHeader}
          value={filterProject}
          filterDisplay
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onRowClick={onRowClick}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="title"
            header="Title"
            style={{ width: "25%" }}
          ></Column>
          <Column field="key" header="key" style={{ width: "25%" }}></Column>
          <Column
            field="profile"
            header="Lead"
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="date"
            header="Start Date"
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </div>
    </Layout>
  );
};

export default ProjectList;
