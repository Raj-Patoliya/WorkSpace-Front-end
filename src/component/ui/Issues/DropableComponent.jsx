import React, { useCallback, useState } from "react";
import { getIssueByIdAPI } from "../../../redux/api";
import { Card } from "primereact/card";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Draggable } from "react-beautiful-dnd";
import "../../screens/Work.css";
const DragableComponent = ({
  data,
  seteditIssueModal,
  deleteIssue,
  provided,
  setdeleted,
  setissueId,
  issueKey,
  index,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const editMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const editIssueHandler = useCallback(
    async (id) => {
      const { data } = await getIssueByIdAPI(id);
      seteditIssueModal(data);
      setAnchorEl(null);
    },
    [seteditIssueModal]
  );
  return (
    <>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            editIssueHandler(data.id);
            setAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteIssue(data.id);
            setAnchorEl(null);
            setdeleted(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Draggable
        draggableId={String(data.id)}
        index={index}
        key={data.issue_summary}
      >
        {(provided) => (
          <Card
            className="mb-2"
            role="region"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <div
              className="d-flex"
              style={{
                marginTop: "-2rem",
                paddingBottom: "0rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                className="text-xs"
                onClick={() => {
                  editIssueHandler(data.id);
                }}
              >
                {data.issue_summary}
              </p>
              <div className="" onClick={editMenu}>
                <MoreHorizIcon
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={editMenu}
                />
              </div>
            </div>
            <div
              className="row h-1rem"
              onClick={() => {
                editIssueHandler(data.id);
              }}
            >
              <div
                className="col"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="d-flex">
                  <Tooltip title={data.issue_type.name}>
                    <Avatar
                      src={data.issue_type.icon}
                      style={{ height: "15px", width: "15px" }}
                      shape="circle"
                    />
                  </Tooltip>
                  <span className="px-2 text-xs font-bold text-600">
                    {issueKey}-{data.id}
                  </span>
                </div>
                <div className="d-flex">
                  <Tooltip title={data.priority.name}>
                    <Avatar
                      src={data.priority.icon}
                      style={{ height: "15px", width: "15px" }}
                      shape="circle"
                      className=" align-self-center mr-2"
                    />
                  </Tooltip>
                  <Tooltip title={data.assignee.fullName}>
                    <Avatar
                      src={data.assignee.profile}
                      style={{ height: "25px", width: "25px" }}
                      shape="circle"
                      className=" align-self-center "
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default DragableComponent;
