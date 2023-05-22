import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import BasicBreadcrumbs from "../ui/components/BreadCrumb";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProjectByKey } from "../../redux/slice/projectSlice";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import "./projectDetails.css";
import { InputTextarea } from "primereact/inputtextarea";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
const ProjectDetails = () => {
  const { keys } = useParams();
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.auth.token);
  const project = useSelector((state) => state.project.currentProject);
  const [projectData, setprojectData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [key, setkey] = useState("");
  const [team, setteam] = useState([]);
  useEffect(() => {
    dispatch(getProjectByKey({ access, keys }));
  }, [dispatch, access, keys]);
  useEffect(() => {
    setprojectData({ ...project });
    setTitle(project.title);
    console.log(project);
    setDescription(project.description);
    setkey(project.key);
    setteam(project.team);
  }, [project]);
  return (
    <Layout>
      <BasicBreadcrumbs />
      <Card className="flex justify-content-center">
        <div className="mt-2">
          <span className="p-float-label">
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title" className="font-bold -ml-2">
              Project Title
            </label>
          </span>
        </div>
        <div className="mt-5">
          <span className="p-float-label">
            <InputText
              id="title"
              value={key}
              onChange={(e) => setkey(e.target.value)}
            />
            <label htmlFor="title" className="font-bold -ml-2">
              Project key
            </label>
          </span>
        </div>

        <div className="mt-5">
          <span className="p-float-label">
            <InputTextarea
              id="description"
              className="h-5rem"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              cols={20}
            />
            <label htmlFor="description" className="font-bold -ml-2">
              Description
            </label>
          </span>
        </div>
      </Card>
      <Card>
        {team &&
          team.map((data) => {
            return (
              <div class="row mx-5 mr-5">
                <div class="col d-flex align-items-center">
                  <div>
                    <Avatar image={data.user[0].profile} />
                  </div>
                  <div>{data.user[0].fullName}</div>
                </div>
                <div class="col">
                  <div class="col">{data.user[0].email}</div>
                </div>
                {/* <div class="col">
                  <Button label="button" />
                </div> */}
              </div>
            );
          })}
      </Card>
    </Layout>
  );
};

export default ProjectDetails;
