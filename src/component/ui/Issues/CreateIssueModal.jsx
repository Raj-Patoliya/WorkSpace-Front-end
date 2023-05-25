import React, { useEffect, useRef, useState } from "react";
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
import { OverlayPanel } from "primereact/overlaypanel";
import VirtualScrollerDemo from "../components/AutoFill";
import { useDispatch, useSelector } from "react-redux";
import "primeicons/primeicons.css";
import {
  getIssueType,
  getIssuesByProjectKey,
  getPriority,
  getStatus,
  getUsers,
} from "../../../redux/slice/issueSlice";
import DropdownTemplate from "../components/Dropdwon";
import UserList from "../components/UserListDropdown";
import { getProjectTeam, getProjects } from "../../../redux/slice/projectSlice";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CreateIssueAPI,
  UploadIssueInBulkAPI,
  getTeamByProjectKeyAPI,
} from "../../../redux/api";
import FileViewerComponent from "../components/FileViewer";
import CSVUploadInstructions from "./CSVUploadInstructions";

export default function CreateIssueModal({
  displayCreateIssueModal,
  setDisplayCreateIssueModal,
  seteditIssueModal,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const overlay = useRef(null);
  const projectsList = useSelector((state) => state.project.allProjectList);
  const typeList = useSelector((state) => state.issue.type);
  const statusList = useSelector((state) => state.issue.status);
  const priorityList = useSelector((state) => state.issue.priority);
  const userList = useSelector((state) => state.project.team);
  const { access } = useSelector((state) => state.auth.token);
  const [projects, setprojects] = useState(projectsList.results);
  const [status, setstatus] = useState(statusList);
  const [priority, setpriority] = useState(priorityList);
  const [type, setType] = useState(typeList);
  const [users, setUser] = useState({ team: [] });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filetype, setfiletype] = useState("");
  const [url, seturl] = useState("");
  const [visible, setVisible] = useState(false);
  const [fileName, setfileName] = useState("");
  const initialErrorState = {
    projectError: false,
    issueTypeError: false,
    descriptionError: false,
    statusError: false,
    priorityError: false,
    summaryError: false,
    assigneeError: false,
    reporterError: false,
  };
  const initialValueState = {
    projectValue: "",
    issueTypeValue: "",
    description: "",
    statusValue: "",
    priorityValue: "",
    summaryValue: "",
    assigneeValue: "",
    reporterValue: "",
    attachmentsValue: [],
  };
  const [initialValues, setInitialValues] = useState(initialValueState);
  const [hasError, sethasError] = useState(false);
  const [error, setError] = useState(initialErrorState);

  useEffect(() => {
    dispatch(getProjects(access));
  }, [dispatch, access]);

  useEffect(() => {
    setprojects(projectsList.results);
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
  }, [statusList, typeList, priorityList, userList]);

  useEffect(() => {
    if (initialValues.projectValue) {
      const keys = initialValues.projectValue.value;
      // dispatch(getProjectTeam({ access, keys }));
      (async () => {
        const { data } = await getTeamByProjectKeyAPI(access, keys);
        setUser(data.data);
      })();
    }
  }, [initialValues.projectValue, dispatch, access]);
  useEffect(() => {
    console.log(userList);
  }, [userList]);
  const handlSelect = (name, value) => {
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

  const handleBulkButtonClick = () => {
    document.getElementById("BulkUpload").click();
  };

  const handleBulkInputChange = async (e) => {
    console.log("----event.target.files----", e.target.files[0]);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const { data } = await UploadIssueInBulkAPI(access, formData);
    if (data.success) {
      setDisplayCreateIssueModal(false);
      seteditIssueModal(false);
    }
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
            console.log(objectUrl);
            setVisible(true);
            setfiletype(file.type.split("/")[1]);
            seturl(objectUrl);
            setfileName(file.name);
          }}
        />
        <p>{file.name}</p>
      </div>
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      initialValues.projectValue !== "" &&
      initialValues.issueTypeValue !== "" &&
      initialValues.description !== "" &&
      initialValues.statusValue !== "" &&
      initialValues.priorityValue !== "" &&
      initialValues.summaryValue !== "" &&
      initialValues.assigneeValue !== "" &&
      initialValues.reporterValue !== ""
    ) {
      const formData = new FormData();
      formData.append("project", initialValues.projectValue.value);
      formData.append("issueType", initialValues.issueTypeValue);
      formData.append("description", initialValues.description);
      formData.append("status", initialValues.statusValue);
      formData.append("priority", initialValues.priorityValue);
      formData.append("summary", initialValues.summaryValue);
      formData.append("assignee", initialValues.assigneeValue);
      formData.append("reporter", initialValues.reporterValue);
      selectedFiles.map((file, index) =>
        formData.append(`attachments_${index}`, file)
      );
      formData.append("attachments", selectedFiles);
      const { data } = await CreateIssueAPI(access, formData);
      console.log(data);
      setDisplayCreateIssueModal(false);
      seteditIssueModal(false);
      navigate(`/projects/${initialValues.projectValue.value}/work/`);
      setError(initialErrorState);
    } else {
      sethasError(true);
      setError({
        projectError: initialValues.projectValue === "",
        issueTypeError: initialValues.issueTypeValue === "",
        descriptionError: initialValues.description === "",
        statusError: initialValues.statusValue === "",
        priorityError: initialValues.priorityValue === "",
        summaryError: initialValues.summaryValue === "",
        assigneeError: initialValues.assigneeValue === "",
        reporterError: initialValues.reporterValue === "",
      });
    }
  };
  const headerContent = (
    <div className="d-flex justify-content-between">
      <OverlayPanel ref={overlay} className="text-xs">
        <CSVUploadInstructions />
      </OverlayPanel>
      <p>Create Issue</p>
      <span>
        <Button
          icon="pi pi-upload"
          label="Upload CSV"
          style={{ height: "2rem", marginRight: "1rem", marginTop: "5px" }}
          onClick={handleBulkButtonClick}
        />
        <i
          onClick={(e) => overlay.current.toggle(e)}
          className="pi pi-info-circle"
          style={{
            fontSize: "25px",
            marginRight: "1rem",
            marginTop: "5px",
          }}
        />
      </span>
      <input
        type="file"
        id="BulkUpload"
        style={{ display: "none" }}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={handleBulkInputChange}
      />
    </div>
  );
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
      <Dialog
        header={fileName}
        draggable={false}
        visible={visible}
        style={{ width: "70vw", maxHeight: "36rem" }}
        onHide={() => setVisible(false)}
      >
        <FileViewerComponent type={filetype} url={url} />
      </Dialog>
      <div className="card flex justify-content-center mx-10">
        {/* <Toast ref={toast}></Toast> */}
        <Dialog
          draggable={false}
          header={headerContent}
          visible={displayCreateIssueModal}
          style={{ width: "45vw", height: "80vh", top: "2rem" }}
          onHide={() => {
            setSelectedFiles([]);
            setInitialValues(initialValueState);
            setError(initialErrorState);
            setDisplayCreateIssueModal(false);
          }}
          footer={footerContent}
          // draggable={false}
        >
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label
                htmlFor="integer"
                className={
                  !error.projectError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
                Project <span className="text-red-700">*</span>
              </label>
              <VirtualScrollerDemo
                data={projects}
                onSelected={handlSelect}
                name="projectValue"
                haserror={error.projectError ? "p-invalid" : ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label
                htmlFor="integer"
                className={
                  !error.issueTypeError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
                Issue Type <span className="text-red-700">*</span>
              </label>

              <DropdownTemplate
                data={type}
                optionLabel="Type"
                placeholder="Issue Type"
                onSelected={handlSelect}
                haserror={error.issueTypeError ? "p-invalid" : ""}
                name="issueTypeValue"
              />
            </div>
          </div>
          <Divider />
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label
                htmlFor="integer"
                className={
                  !error.statusError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
                Status <span className="text-red-700">*</span>
              </label>
              <DropdownTemplate
                data={status}
                optionLabel="Status"
                placeholder="Issue Status"
                onSelected={handlSelect}
                name="statusValue"
                haserror={error.statusError ? "p-invalid" : ""}
              />
              <p className="mt-2 text-xs">
                This is the issue's initial status upon creation
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label
                htmlFor="integer"
                className={
                  !error.priorityError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
                Priority <span className="text-red-700">*</span>
              </label>
              <DropdownTemplate
                data={priority}
                optionLabel="priority"
                placeholder="Issue Priority"
                onSelected={handlSelect}
                name="priorityValue"
                haserror={error.priorityError ? "p-invalid" : ""}
              />
              <p className="mt-2 text-xs">
                This is the issue's initial status upon creation
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label
                htmlFor="integer"
                className={
                  !error.summaryError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
                Summary <span className="text-red-700">*</span>
              </label>
              <InputText
                id="integer"
                className={error.summaryError ? "p-invalid w-full" : "w-full"}
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
              <label
                htmlFor="integer"
                className={
                  !error.descriptionError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
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
                  className=""
                  style={{ height: "320px" }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label
                htmlFor="integer"
                className={
                  !error.assigneeError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
                Assignee <span className="text-red-700">*</span>
              </label>
              <UserList
                className="w-7"
                width={"w-7"}
                userList={users}
                placeholder={"Select Assignee"}
                onSelected={handlSelect}
                name="assigneeValue"
                haserror={error.assigneeError ? "p-invalid" : ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label
                htmlFor="integer"
                className={
                  !error.reporterError
                    ? "font-bold block mb-2 "
                    : "font-bold block mb-2 text-red-700"
                }
              >
                Reporter <span className="text-red-700">*</span>
              </label>
              <UserList
                className="w-7"
                userList={users}
                width={"w-7"}
                placeholder={"Select Reporter"}
                onSelected={handlSelect}
                name="reporterValue"
                haserror={error.reporterError ? "p-invalid" : ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-auto">
              <label htmlFor="integer">
                Attachments <span className="text-red-700">*</span>
              </label>
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
