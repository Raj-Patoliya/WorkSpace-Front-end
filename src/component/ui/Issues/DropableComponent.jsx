import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Card } from "primereact/card";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../../page/Work.css";
import { getIssueByIdAPI } from "../../../redux/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getIssueById } from "../../../redux/slice/issueSlice";
const DragableComponent = ({
  data,
  open,
  editMenu,
  seteditIssueModal,
  provided,
  setissueId,
  index,
}) => {
  const editIssueHandler = async (id) => {
    setissueId(id);
  };
  return (
    <>
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
            onClick={() => {
              seteditIssueModal(true);
              editIssueHandler(data.id);
            }}
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
              <p className="text-xs">{data.issue_summary}</p>
              <div className="">
                <MoreHorizIcon
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={editMenu}
                />
              </div>
            </div>
            <div className="row h-1rem">
              <div
                className="col"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Tooltip title={data.issue_type.name}>
                  <Avatar
                    src={data.issue_type.icon}
                    style={{ height: "15px", width: "15px" }}
                    shape="circle"
                  />
                </Tooltip>
                <span className="text-xs">{data.priority.name}</span>
                <Tooltip title={data.assignee.fullName}>
                  <Avatar
                    src={data.assignee.profile}
                    style={{ height: "25px", width: "25px" }}
                    shape="circle"
                  />
                </Tooltip>
              </div>
            </div>
          </Card>
        )}
      </Draggable>
    </>
  );
};

export default DragableComponent;
