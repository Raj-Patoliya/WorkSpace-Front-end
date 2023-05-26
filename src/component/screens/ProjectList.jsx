import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../layout/layout";
import { Avatar } from "@mui/material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../../redux/slice/projectSlice";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import {
  ProjectListAPIPagination,
  SearchInProjectListAPI,
} from "../../redux/api";
const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.project.allProjectList);
  const { access } = useSelector((state) => state.auth.token);
  const [filterProject, setfilterProject] = useState({});
  const [projectList, setprojectList] = useState({});
  const [defaultProject, setdefaultProject] = useState({});
  useEffect(() => {
    dispatch(getProjects(access));
  }, [dispatch, access]);
  useEffect(() => {
    const project = !projects.hasOwnProperty("results")
      ? null
      : projects.results.map((element) => {
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
            date.getDate() +
            "-" +
            date.toLocaleString("default", { month: "short" }) +
            "-" +
            date.getFullYear().toString().substr(-2);
          return temp;
        });
    setdefaultProject(projects);
    setprojectList(projects);
    setfilterProject(project);
  }, [projects]);
  const tableHeader = () => {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <p class="navbar-brand">Project List</p>
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
  const projectSearchHandler = async (e) => {
    if (e.target.value !== "") {
      const formData = new FormData();
      formData.append("searchText", e.target.value);
      const { data } = await SearchInProjectListAPI(access, formData);
      const project = !data.hasOwnProperty("results")
        ? null
        : data.results.map((element) => {
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
              date.getDate() +
              "-" +
              date.toLocaleString("default", { month: "short" }) +
              "-" +
              date.getFullYear().toString().substr(-2);
            return temp;
          });
      setfilterProject(project);
      setprojectList(data);
    } else {
      setprojectList(defaultProject);
    }
  };
  useEffect(() => {
    const project = !projectList.hasOwnProperty("results")
      ? null
      : projectList.results.map((element) => {
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
            date.getDate() +
            "-" +
            date.toLocaleString("default", { month: "short" }) +
            "-" +
            date.getFullYear().toString().substr(-2);
          return temp;
        });
    setfilterProject(project);
  }, [projectList]);
  const pageChangeHandler = (data) => {
    const project = !data.hasOwnProperty("results")
      ? null
      : data.results.map((element) => {
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
            date.getDate() +
            "-" +
            date.toLocaleString("default", { month: "short" }) +
            "-" +
            date.getFullYear().toString().substr(-2);
          return temp;
        });
    setprojectList(data);
    setfilterProject(project);
  };
  const [first, setFirst] = useState(0);
  const onPageChange = async (event) => {
    setFirst(event.first);
    if (event.first < first) {
      const { data } = await ProjectListAPIPagination(
        access,
        projectList.previous
      );
      pageChangeHandler(data);
    } else {
      const { data } = await ProjectListAPIPagination(access, projectList.next);
      pageChangeHandler(data);
    }
  };
  return (
    <Layout>
      <div className="card">
        <DataTable
          header={tableHeader}
          value={filterProject}
          filterDisplay
          footer={
            <Paginator
              first={first}
              rows={5}
              totalRecords={projectList.count}
              onPageChange={onPageChange}
              template={{
                layout: "PrevPageLink CurrentPageReport NextPageLink",
              }}
            />
          }
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="title" header="Title"></Column>
          <Column field="key" header="key"></Column>
          <Column field="profile" header="Lead"></Column>
          <Column field="date" header="Start Date"></Column>
          <Column
            header="Actions"
            body={(rowData) => (
              <Button
                className="btn btn-secondary"
                label="View Project Board"
                onClick={() => {
                  navigate(`/projects/${rowData.key}/work`);
                }}
              />
            )}
          ></Column>
        </DataTable>
      </div>
    </Layout>
  );
};

export default ProjectList;
