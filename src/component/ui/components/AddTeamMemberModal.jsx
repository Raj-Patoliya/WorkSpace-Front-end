import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { addProjectTeamMember } from "../../../redux/slice/projectSlice";
import { useNavigate } from "react-router-dom";
import AllUserList from "./AllUserList";

const AddTeamMemberModal = ({
  display,
  setAddTeamMember,
  users,
  access,
  setteamCreated,
  currentProject,
}) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const navigate = useNavigate();
  const [displayPosition, setDisplayPosition] = useState(display);
  const [selected, setSelected] = useState(null);
  const position = "top";

  const handlSelect = (name, value) => {
    setSelected(value);
  };
  const onHide = () => {
    setDisplayPosition(false);
    setAddTeamMember(false);
  };
  const onAddHandler = async () => {
    const formData = new FormData();
    formData.append("project", currentProject.id);
    formData.append("user", selected);
    formData.append("role", "1");
    try {
      dispatch(addProjectTeamMember({ access, formData }));
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: `Member Added Successfully`,
        life: 3000,
      });
      setteamCreated(true);
      setDisplayPosition(false);
      setAddTeamMember(false);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `${error.response.data.Error.non_field_errors}`,
        life: 3000,
      });
      setDisplayPosition(false);
      setAddTeamMember(false);
    }
    navigate(`/projects/${currentProject.key}/work`);
  };

  const renderFooter = (name) => {
    return (
      <div style={{ height: "2rem" }}>
        <Button
          label="Cancle"
          severity="primary"
          text
          size="small"
          className="w-3 h-1rem text-xs m-2"
          icon="pi pi-times"
          onClick={() => onHide()}
        />
        <Button
          severity="primary"
          text
          size="small"
          className="w-3 h-1rem text-xs m-2"
          label="Add"
          icon="pi pi-check"
          onClick={onAddHandler}
          autoFocus
        />
      </div>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Add people"
        visible={displayPosition}
        position={position}
        modal
        style={{ width: "25vw", height: "32%", marginTop: "5rem" }}
        showFooter={false}
        footer={renderFooter("displayPosition")}
        onHide={() => onHide("displayPosition")}
        draggable={false}
        resizable={false}
      >
        <AllUserList
          className="w-full text-xs"
          userList={users}
          placeholder={"Search Person"}
          onSelected={handlSelect}
          name="assigneeValue"
          width={"w-full"}
        />
      </Dialog>
    </>
  );
};

export default AddTeamMemberModal;
