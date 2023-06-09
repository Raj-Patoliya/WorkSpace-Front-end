import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "./createProject.css";

import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { CreateProjectAPI } from "../../../redux/api";
import { useNavigate } from "react-router-dom";

import { Toast } from "primereact/toast";
export const DialogDemo = ({ displayBasic, setDisplayBasic }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescriptions] = useState("");
  const [key, setKey] = useState("");
  const toast = useRef(null);
  const [invalidFields, setInvalidFields] = useState([
    {
      title: false,
      key: false,
      description: false,
    },
  ]);

  const onHide = () => {
    setDisplayBasic((prevState) => !prevState);
  };

  const submitHandler = async () => {
    if (title === "" || description === "" || key === "") {
      setInvalidFields({
        title: title === "",
        key: title === "",
        description: title === "",
      });
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("key", key);
      const { data } = await CreateProjectAPI(formData);
      if (data.success) {
        console.log(data);
        onHide();
        navigate(`/projects/work/${key}`);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.errors[0],
          life: 3000,
        });
      }
    }
  };
  const renderFooter = () => {
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
          onClick={submitHandler}
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
      <Toast ref={toast} />
      <br />
      <div>
        <div className="p-fluid grid">
          <div className="field col-6 md:col-2">
            <span className="p-float-label">
              <InputText
                id="inputtext"
                className={invalidFields.title ? "p-invalid" : ""}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="inputtext">Project Title</label>
            </span>
            {invalidFields.title && (
              <span className="text-sm text-red-700 ml-1">
                *Please enter title
              </span>
            )}
          </div>
          <div className="field col-6 md:col-2">
            <span className="p-float-label">
              <InputText
                className={invalidFields.key ? "p-invalid" : ""}
                id="inputtext"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />

              <label htmlFor="inputtext">Project Key</label>
            </span>
            {invalidFields.key && (
              <span className="text-sm text-red-700 ml-1">
                *Please enter key
              </span>
            )}
          </div>

          <div className="field col-12 md:col-6">
            <span className="p-float-label">
              <InputTextarea
                rows={5}
                cols={30}
                value={description}
                onChange={(e) => setDescriptions(e.target.value)}
                autoResize
                className={invalidFields.description ? "p-invalid" : ""}
              />

              <label htmlFor="inputtext">Descriptions</label>
              {invalidFields.description && (
                <span className="text-sm text-red-700 ml-1">
                  *Please enter descriptions
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
