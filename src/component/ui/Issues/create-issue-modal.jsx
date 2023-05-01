import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { FileUpload } from "primereact/fileupload";
import VirtualScrollerDemo from "../components/AutoFill";
import { useDispatch, useSelector } from "react-redux";
import {
  getPriority,
  getStatus,
  getType,
  getUsers,
} from "../../../redux/slice/issueSlice";
import DropdownTemplate from "../components/Dropdwon";
import UserList from "../components/User-list-dropdown";

export default function CreateIssueModal({
  displayCreateIssueModal,
  setDisplayCreateIssueModal,
}) {
  const dispatch = useDispatch();
  const projectsList = useSelector((state) => state.project.allProjectList);
  const typeList = useSelector((state) => state.issue.type);
  const statusList = useSelector((state) => state.issue.status);
  const priorityList = useSelector((state) => state.issue.priority);
  const userList = useSelector((state) => state.issue.userList);
  const { access } = useSelector((state) => state.auth.token);

  const [description, setDescription] = useState("");
  const [projects, setprojects] = useState(projectsList);
  const [status, setstatus] = useState(statusList);
  const [priority, setpriority] = useState(priorityList);
  const [type, setType] = useState(typeList);
  const [users, setUser] = useState(userList);

  useEffect(() => {
    setprojects(projectsList);
  }, [projectsList]);

  useEffect(() => {
    dispatch(getStatus(access));
    dispatch(getPriority(access));
    dispatch(getType(access));
    dispatch(getUsers(access));
  }, [dispatch, access]);

  useEffect(() => {
    setstatus(statusList);
    setpriority(priorityList);
    setType(typeList);
    setUser(userList);
  }, [statusList, typeList, priorityList, userList]);
  useEffect(() => {
    console.log(status);
    console.log(priority);
    console.log(type);
    console.log(users);
  }, [status, type, priority, users]);

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
        onClick={() => setDisplayCreateIssueModal(false)}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center mx-10">
      <Dialog
        header="Create Issue"
        visible={displayCreateIssueModal}
        style={{ width: "50vw", height: "88vh", top: "2rem" }}
        onHide={() => setDisplayCreateIssueModal(false)}
        footer={footerContent}
      >
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <label htmlFor="integer" className="font-bold block mb-2">
              Project <span className="text-red-700">*</span>
            </label>
            <VirtualScrollerDemo data={projects} />
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
            <InputText id="integer" className="w-full" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <label htmlFor="integer" className="font-bold block mb-2">
              Descriptions
            </label>
            <div className="card">
              <Editor
                value={description}
                onTextChange={(e) => setDescription(e.htmlValue)}
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
            <UserList className="w-7" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <label htmlFor="integer" className="font-bold block mb-2">
              Reporter <span className="text-red-700">*</span>
            </label>
            <InputText id="integer" keyfilter="int" className="w-7" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex-auto">
            <label htmlFor="integer" className="font-bold block mb-2">
              Attachments <span className="text-red-700">*</span>
            </label>
            <FileUpload
              name="demo[]"
              url={"/api/upload"}
              multiple
              accept="image/*"
              maxFileSize={1000000}
              emptyTemplate={
                <p className="m-0">Drag and drop files to here to upload.</p>
              }
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
