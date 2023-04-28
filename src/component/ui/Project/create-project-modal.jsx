import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./DialogDemo.css";

import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { CreateProjectAPI } from "../../../redux/api";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../../redux/slice/projectSlice";
export const DialogDemo = ({ displayBasic, setDisplayBasic }) => {
  const access = useSelector((state) => state.auth.token.access);
  const [title, setTitle] = useState("");
  const [description, setDescriptions] = useState("");
  const [key, setKey] = useState("");
  const dispatch = useDispatch();

  const onHide = () => {
    setDisplayBasic((prevState) => !prevState);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Discard"
          icon="pi pi-times"
          className="p-button-text p-button-danger"
          onClick={() => onHide()}
        />
        <Button
          label="Create"
          icon="pi pi-check"
          onClick={async () => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("key", key);
            const { data } = await CreateProjectAPI(access, formData);
            console.log(data);
            console.log(access);
            dispatch(getProjects(access));
            onHide();
          }}
          autoFocus
        />
      </div>
    );
  };
  return (
    <Dialog
      header="Create Project"
      visible={displayBasic}
      style={{ width: "50vw" }}
      footer={renderFooter("displayBasic")}
      onHide={() => onHide("displayBasic")}
    >
      <br />
      <div>
        <div className="p-fluid grid">
          <div className="field col-6 md:col-2">
            <span className="p-float-label">
              <InputText
                id="inputtext"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="inputtext">Project Title</label>
            </span>
          </div>
          <div className="field col-6 md:col-2">
            <span className="p-float-label">
              <InputText
                id="inputtext"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />

              <label htmlFor="inputtext">Project Key</label>
            </span>
          </div>

          <div className="field col-12 md:col-6">
            <span className="p-float-label">
              <InputTextarea
                rows={5}
                cols={30}
                value={description}
                onChange={(e) => setDescriptions(e.target.value)}
                autoResize
              />

              <label htmlFor="inputtext">Descriptions</label>
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
