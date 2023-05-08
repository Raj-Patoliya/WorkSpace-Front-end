import React, { useDebugValue, useEffect, useState } from "react";
import Layout from "../layout/layout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Card } from "primereact/card";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MultiSelectDropdown from "../ui/components/Multiselect";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCurrentProjects,
  getIssueType,
  getIssuesByProjectKey,
  getStatus,
} from "../../redux/slice/issueSlice";
import { Tooltip } from "@mui/material";
import { updateIssueAPI } from "../../redux/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Work.css";
const Work = () => {
  const dispatch = useDispatch();
  const { keys } = useParams();
  const { access } = useSelector((state) => state.auth.token);
  const issue = useSelector((state) => state.issue.issues);
  const team = useSelector((state) => state.issue.team);
  const status = useSelector((state) => state.issue.status);
  const issue_type = useSelector((state) => state.issue.type);
  const currentProject = useSelector((state) => state.issue.currentProject);
  const [issues, setissues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [todo, settodo] = useState([]);
  const [inprogress, setinprogress] = useState([]);
  const [done, setdone] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [activeStates, setActiveStates] = useState(team.map(() => false));

  const [isClearVisible, setIsClearVisible] = useState(false);
  const [userFilter, setuserFilter] = useState([]);
  useEffect(() => {
    const anyActive = activeStates.some((isActive) => isActive);
    setIsClearVisible(anyActive);
  }, [activeStates]);

  const profileFilter = (index, id) => {
    if (userFilter.includes(id)) {
      const result = userFilter.filter((value) => value !== id);
      setuserFilter([...result]);
    } else {
      setuserFilter((prevState) => [...prevState, id]);
    }
    const newActiveStates = [...activeStates];
    newActiveStates[index] = !newActiveStates[index];
    setActiveStates(newActiveStates);
  };
  const handleClear = () => {
    console.log(activeStates);
    setActiveStates(teams.map(() => false));
  };
  const editMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(getCurrentProjects({ access, keys }));
    dispatch(getStatus(access));
    dispatch(getIssueType(access));
    dispatch(getIssuesByProjectKey({ access, keys }));
  }, [dispatch, access, keys]);
  useEffect(() => {
    console.log(userFilter);
  }, [userFilter]);
  useEffect(() => {
    setissues(issue);
    console.log(issue);
    setTeams(team);
  }, [issue, team]);
  useEffect(() => {
    if (userFilter.length === 0) {
      setissues(issue);
    } else {
      const filterIssues = issues.filter((data) => {
        console.log(data.assignee.id);
        return userFilter.includes(data.assignee.id);
      });
      console.log(filterIssues);
    }
  }, [userFilter, issue, issues]);
  const onDragEnd = async (result) => {
    const formData = new FormData();
    formData.append("field", "status");
    formData.append("value", Number(result.destination.droppableId));
    const { data } = await updateIssueAPI(access, result.draggableId, formData);
    dispatch(getIssuesByProjectKey({ access, keys }));
  };
  const searchFilterHandler = (e) => {
    if (e.target.value === "") {
      setissues(issue);
    }
    const filterIssues = issue.filter((data) =>
      String(data.issue_summary)
        .toLowerCase()
        .includes(String(e.target.value).toLowerCase())
    );
    setissues(filterIssues);
  };
  useEffect(() => {
    setdone(issues.filter((data) => data.status.id === 1));
    setinprogress(issues.filter((data) => data.status.id === 2));
    settodo(issues.filter((data) => data.status.id === 4));
  }, [issues]);
  return (
    <Layout>
      <Card title={`${currentProject.key} - ${currentProject.title}`}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-2">
              <InputText
                type="text"
                className="p-inputtext-sm text-xs h-2rem"
                placeholder="Search this board"
                onChange={searchFilterHandler}
              />
            </div>
            <div className="col-6 d-flex " style={{ alignItems: "center" }}>
              <AvatarGroup max={4} spacing="medium">
                {teams.map((data, index) => (
                  <Tooltip key={data.user[0].id} title={data.user[0].fullName}>
                    <img
                      key={data.user[0].id}
                      alt={data.user[0].profile}
                      src={data.user[0].profile}
                      onClick={() => profileFilter(index, data.user[0].id)}
                      style={{ height: "45px", width: "45px" }}
                      className={activeStates[index] ? "avatar-active" : ""}
                    />
                  </Tooltip>
                ))}
                <Tooltip title={"Add New Member"}>
                  <Avatar
                    src="https://cdn.create.vista.com/api/media/small/237384104/stock-vector-add-user-vector-icon-sign"
                    shape="circle"
                    size="large"
                  />
                </Tooltip>
              </AvatarGroup>
              <MultiSelectDropdown data={issue_type} />
              {isClearVisible && (
                <Button
                  label="Clear Filter"
                  severity="primary"
                  text
                  size="small"
                  className="w-3 h-1rem text-xs m-2"
                  onClick={handleClear}
                />
              )}{" "}
            </div>
            <div className="col-2 " style={{ alignItems: "center" }}>
              <Button
                className="h-2rem text-xs"
                label="Create Issue"
                severity="primary"
                outlined
                size="small"
              />
            </div>
          </div>
        </div>
      </Card>
      <br />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row justify-content-start ">
          <Droppable droppableId="4">
            {(provided) => (
              <Card
                subTitle="TO DO"
                ref={provided.innerRef}
                className="col-3 bg-light m-1 text-xs"
                {...provided.droppableProps}
              >
                <Divider />
                {todo.map((data, index) => (
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
                        <div className="d-flex">
                          <p className="text-xs">{data.issue_summary}</p>
                          <MoreHorizIcon
                            style={{
                              marginLeft: "3.5rem",
                            }}
                            aria-controls={
                              open ? "demo-positioned-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={editMenu}
                          />
                        </div>
                        <div className="row h-1rem">
                          <div className="col d-flex">
                            <Tooltip title={data.issue_type.name}>
                              <Avatar
                                src={data.issue_type.icon}
                                style={{ height: "15px", width: "15px" }}
                                shape="circle"
                              />
                            </Tooltip>
                            <span className="text-xs">
                              {data.priority.name}
                            </span>
                          </div>
                          <div
                            className="col d-flex"
                            style={{
                              position: "relative",
                              marginRight: "-9rem",
                            }}
                          >
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
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
          <Droppable droppableId="2">
            {(provided) => (
              <Card
                className="col-3 bg-light m-1 text-xs"
                ref={provided.innerRef}
                subTitle="In Progress"
                {...provided.droppableProps}
              >
                <Divider />
                {inprogress.map((data, index) => (
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
                        <div className="d-flex">
                          <p className="text-xs">{data.issue_summary}</p>
                          <MoreHorizIcon
                            style={{
                              marginLeft: "3.5rem",
                            }}
                            aria-controls={
                              open ? "demo-positioned-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={editMenu}
                          />
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
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                          </Menu>
                        </div>
                        <div className="row h-1rem">
                          <div className="col d-flex">
                            <Tooltip title={data.issue_type.name}>
                              <Avatar
                                src={data.issue_type.icon}
                                style={{ height: "15px", width: "15px" }}
                                shape="circle"
                              />
                            </Tooltip>
                            <span className="text-xs">
                              {data.priority.name}
                            </span>
                          </div>
                          <div
                            className="col d-flex"
                            style={{
                              position: "relative",
                              marginRight: "-9rem",
                            }}
                          >
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
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
          <Droppable droppableId="1">
            {(provided) => (
              <Card
                subTitle="Done Issues"
                ref={provided.innerRef}
                className="col-3 bg-light m-1 text-xs"
                {...provided.droppableProps}
              >
                <Divider />
                {done.map((data, index) => (
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
                        <div className="d-flex">
                          <p className="text-xs">{data.issue_summary}</p>
                          <MoreHorizIcon
                            style={{
                              marginLeft: "3.5rem",
                            }}
                            aria-controls={
                              open ? "demo-positioned-menu" : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={editMenu}
                          />
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
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                          </Menu>
                        </div>
                        <div className="row h-1rem">
                          <div className="col d-flex">
                            <Tooltip title={data.issue_type.name}>
                              <Avatar
                                src={data.issue_type.icon}
                                style={{ height: "15px", width: "15px" }}
                                shape="circle"
                              />
                            </Tooltip>
                            <span className="text-xs">
                              {data.priority.name}
                            </span>
                          </div>
                          <div
                            className="col d-flex"
                            style={{
                              position: "relative",
                              marginRight: "-9rem",
                            }}
                          >
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
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </Layout>
  );
};

export default Work;
