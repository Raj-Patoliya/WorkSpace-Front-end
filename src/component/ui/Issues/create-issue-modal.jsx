import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import pdf from "../../assets/images/icons/pdf.png";
import text from "../../assets/images/icons/text.png";
import json from "../../assets/images/icons/json.png";
import csv from "../../assets/images/icons/csv.png";
import { Image } from "primereact/image";
import VirtualScrollerDemo from "../components/AutoFill";
import { useDispatch, useSelector } from "react-redux";
import {
  getIssueType,
  getPriority,
  getStatus,
  getUsers,
} from "../../../redux/slice/issueSlice";
import DropdownTemplate from "../components/Dropdwon";
import UserList from "../components/User-list-dropdown";
import { getProjects } from "../../../redux/slice/projectSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { CreateIssueAPI } from "../../../redux/api";

export default function CreateIssueModal({
  displayCreateIssueModal,
  setDisplayCreateIssueModal,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projectsList = useSelector((state) => state.project.allProjectList);
  const typeList = useSelector((state) => state.issue.type);
  const statusList = useSelector((state) => state.issue.status);
  const priorityList = useSelector((state) => state.issue.priority);
  const userList = useSelector((state) => state.issue.userList);
  const { access } = useSelector((state) => state.auth.token);
  const [projects, setprojects] = useState(projectsList);
  const [status, setstatus] = useState(statusList);
  const [priority, setpriority] = useState(priorityList);
  const [type, setType] = useState(typeList);
  const [users, setUser] = useState(userList);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [initialValues, setInitialValues] = useState({
    projectValue: "",
    issueTypeValue: "",
    description: "",
    statusValue: "",
    priorityValue: "",
    summaryValue: "",
    assigneeValue: "",
    reporterValue: "",
    attachmentsValue: [],
  });

  useEffect(() => {
    dispatch(getProjects(access));
  }, [dispatch, access]);

  useEffect(() => {
    console.log(projectsList);
    setprojects(projectsList);
  }, [projectsList]);

  useEffect(() => {
    dispatch(getStatus(access));
    dispatch(getPriority(access));
    dispatch(getIssueType(access));
    dispatch(getUsers(access));
  }, [dispatch, access]);
  useEffect(() => {
    setstatus(statusList);
    setpriority(priorityList);
    setType(typeList);
    setUser(userList);
  }, [statusList, typeList, priorityList, userList]);
  // useEffect(() => {
  //   console.log(initialValues);
  // }, [initialValues]);

  const handlSelect = (name, value) => {
    console.log(name, value);
    setInitialValues((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleFileInputChange = (event) => {
    console.log("----event.target.files----", event.target.files);
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };
  const renderPreview = (file) => {
    if (!file) {
      return null;
    }
    let objectUrl = URL.createObjectURL(file);
    let imageIcons = null;
    if (file.type.includes("pdf")) {
      imageIcons = pdf;
    } else if (file.type.includes("csv")) {
      imageIcons = csv;
    } else if (file.type.includes("image")) {
      imageIcons = objectUrl;
    } else if (file.type.includes("json")) {
      imageIcons = json;
    } else {
      imageIcons = text;
    }
    return (
      <div key={file.name} class="col-sm">
        <Image
          src={imageIcons}
          alt={file.name}
          width="80"
          height="60"
          onClick={() => {
            var win = window.open();
            win.document.write(
              '<iframe src="' +
                objectUrl +
                '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
            );
          }}
        />
        <p>{file.name}</p>
      </div>
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("project", initialValues.projectValue.value);
    formData.append("issueType", initialValues.issueTypeValue);
    formData.append("description", initialValues.description);
    formData.append("status", initialValues.statusValue);
    formData.append("priority", initialValues.priorityValue);
    formData.append("summary", initialValues.summaryValue);
    formData.append("assignee", initialValues.assigneeValue);
    formData.append("reporter", initialValues.reporterValue);
    selectedFiles.map((file, index) => {
      formData.append(`attachments_${index}`, file);
    });
    formData.append("attachments", selectedFiles);
    console.log(formData);
    const { data } = await CreateIssueAPI(access, formData);
    setDisplayCreateIssueModal(false);
    navigate(`/projects/work/${initialValues.projectValue.value}`);
    // console.log(access);
  };
  const footerContent = (
    <div>
      <Button
        label="Discard"
        icon="pi pi-times"
        onClick={() => setDisplayCreateIssueModal(false)}
        className="p-button-text p-button-danger"
      />
      <Button
        label="Create"
        icon="pi pi-check"
        onClick={submitHandler}
        autoFocus
      />
    </div>
  );
  // const toast = useRef(null);
  return (
    <form>
      <div className="card flex justify-content-center mx-10">
        {/* <Toast ref={toast}></Toast> */}
        <Dialog
          header="Create Issue"
          visible={displayCreateIssueModal}
          style={{ width: "45vw", height: "80vh", top: "2rem" }}
          onHide={() => setDisplayCreateIssueModal(false)}
          footer={footerContent}
        >
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Project <span className="text-red-700">*</span>
              </label>
              <VirtualScrollerDemo
                data={projects}
                onSelected={handlSelect}
                name="projectValue"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Issue Type <span className="text-red-700">*</span>
              </label>

              <DropdownTemplate
                data={type}
                optionLabel="Type"
                placeholder="Issue Type"
                onSelected={handlSelect}
                name="issueTypeValue"
              />
            </div>
          </div>
          <Divider />
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Status <span className="text-red-700">*</span>
              </label>
              <DropdownTemplate
                data={status}
                optionLabel="Status"
                placeholder="Issue Status"
                onSelected={handlSelect}
                name="statusValue"
              />
              <p className="mt-2 text-xs">
                This is the issue's initial status upon creation
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Priority <span className="text-red-700">*</span>
              </label>
              <DropdownTemplate
                data={priority}
                optionLabel="priority"
                placeholder="Issue Priority"
                onSelected={handlSelect}
                name="priorityValue"
              />
              <p className="mt-2 text-xs">
                This is the issue's initial status upon creation
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Summary <span className="text-red-700">*</span>
              </label>
              <InputText
                id="integer"
                className="w-full"
                value={initialValues.summaryValue}
                onChange={(e) => {
                  console.log(e.target.value);
                  setInitialValues((prevState) => {
                    return {
                      ...prevState,
                      summaryValue: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Descriptions
              </label>
              <div className="card">
                <Editor
                  value={initialValues.description}
                  onTextChange={(e) =>
                    setInitialValues((prevState) => {
                      return {
                        ...prevState,
                        description: e.htmlValue,
                      };
                    })
                  }
                  style={{ height: "320px" }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Assignee <span className="text-red-700">*</span>
              </label>
              {/* <InputText id="integer" keyfilter="int" className="w-7" /> */}
              <UserList
                className="w-7"
                width={"w-7"}
                userList={users}
                placeholder={"Select Assignee"}
                onSelected={handlSelect}
                name="assigneeValue"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Reporter <span className="text-red-700">*</span>
              </label>
              <UserList
                className="w-7"
                userList={users}
                width={"w-7"}
                placeholder={"Select Reporter"}
                onSelected={handlSelect}
                name="reporterValue"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer" className="font-bold block mb-2">
                Attachments <span className="text-red-700">*</span>
              </label>
              {/* <FileUpload
              name="demo[]"
              multiple
              accept="image/*"
              maxFileSize={1000000}
              uploadHandler={(e) => {
                setInitialValues((prevState) => {
                  return { ...prevState, attachmentsValue: e.files };
                });
              }}
              customUpload
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            /> */}
              {/* <FileUpload
              mode="basic"
              name="demo[]"
              accept="image/*"
              customUpload
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
              multiple
              uploadHandler={(e) => {
                setInitialValues((prevState) => {
                  return { ...prevState, attachmentsValue: e.files };
                });
              }}
            /> */}
              <div
                onClick={handleButtonClick}
                class="w-full h-6rem border-dotted border-blue-200 m-2 surface-overlay font-bold flex align-items-center justify-content-center"
              >
                <p className="m-0">Tap here to upload files.</p>
              </div>
              <div class="row">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleFileInputChange}
                />
                {selectedFiles.map(renderPreview)}
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </form>
  );
}
