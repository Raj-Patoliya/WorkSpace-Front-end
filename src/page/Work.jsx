import React, { useEffect, useState } from "react";
import Layout from "../component/layout/layout";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Card } from "primereact/card";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import MultiSelectDropdown from "../component/ui/components/Multiselect";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCurrentProjects,
  getIssueType,
  getIssuesByProjectKey,
  getStatus,
  getUsers,
  updateIssue,
} from "../redux/slice/issueSlice";
import { Tooltip } from "@mui/material";
import { updateIssueAPI } from "../redux/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Work.css";
import LoadingIssues from "../component/ui/components/LoadingIssues";
import AddTeamMemberModal from "../component/ui/components/AddTeamMemberModal";
import { getProjectTeam } from "../redux/slice/projectSlice";
import CreateIssueModal from "../component/ui/Issues/create-issue-modal";
import EditIssue from "../component/ui/Issues/EditIssue";
const Work = (props) => {
  const dispatch = useDispatch();
  const { keys } = useParams();
  const { access } = useSelector((state) => state.auth.token);
  const issue = useSelector((state) => state.issue.issues);
  const loading = useSelector((state) => state.issue.loading);
  const team = useSelector((state) => state.project.team);
  const project = useSelector((state) => state.project);
  const issue_type = useSelector((state) => state.issue.type);
  const currentProject = useSelector((state) => state.issue.currentProject);
  const userList = useSelector((state) => state.issue.userList);
  const [editIssueModal, seteditIssueModal] = useState(false);
  const [teamCreated, setteamCreated] = useState(false);
  const [issueTypeList, setIssueTypeList] = useState([]);
  const [addTeamMember, setAddTeamMember] = useState(false);
  const [displayCreateIssueModal, setDisplayCreateIssueModal] = useState(false);
  const [userFilterIssues, setUserFilterIssues] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [todo, settodo] = useState([]);
  const [inprogress, setinprogress] = useState([]);
  const [done, setdone] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [activeStates, setActiveStates] = useState(team.map(() => false));

  const [isClearVisible, setIsClearVisible] = useState(false);
  const [typeFilterIssues, setTypeFilterIssues] = useState([]);
  const [userFilter, setuserFilter] = useState([]);
  const [filterIssues, setFilterIssues] = useState([]);

  // Fetching issues from Dispatcher
  useEffect(() => {
    dispatch(getCurrentProjects({ access, keys }));
    dispatch(getStatus(access));
    dispatch(getIssueType(access));
    dispatch(getIssuesByProjectKey({ access, keys }));
    dispatch(getUsers(access));
    dispatch(getProjectTeam({ access, keys }));
  }, [dispatch, access, keys]);

  useEffect(() => {
    if (teamCreated) {
      dispatch(getProjectTeam({ access, keys }));
      setteamCreated(false);
    }
  }, [dispatch, project, access, keys, teamCreated]);

  // setting up fetched issues form Redux
  useEffect(() => {
    setUserFilterIssues(issue);
    setTypeFilterIssues(issue);
    setFilterIssues(issue);
    setTeams(team);
  }, [issue, team]);

  // Profile CSS Handler
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
    setFilterIssues([]);
    setuserFilter([]);
  };

  //
  const typeSortHandler = (value) => {
    if (value.length === 0) {
      setTypeFilterIssues([...userFilterIssues]);
      setFilterIssues(userFilterIssues);
    } else {
      const indexArray = value.map((data) => data.id);
      const filterIssues = userFilterIssues.filter((data) =>
        indexArray.includes(data.issue_type.id)
      );
      console.log(filterIssues);
      console.log(userFilterIssues);
      setFilterIssues(filterIssues);
    }
  };

  // User Profile Handler
  useEffect(() => {
    console.log(userFilter);
  }, [userFilter]);

  useEffect(() => {
    if (userFilter.length === 0) {
      setUserFilterIssues(issue);
    } else {
      const filterIssues = issue.filter((data) =>
        userFilter.includes(data.assignee.id)
      );
      console.log(filterIssues);
      setUserFilterIssues([...filterIssues]);
    }
  }, [userFilter, issue]);

  useEffect(() => {
    setFilterIssues([...userFilterIssues]);
  }, [userFilterIssues]);

  // Edit Menu Code
  const editMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Drag n Drop Handler
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add,
      todolist = todo,
      inprogresslist = inprogress,
      donelist = done;

    // 1.todo 2.inprogress 3. done

    if (source.droppableId === "4") {
      add = todolist[source.index];
      todolist.splice(source.index, 1);
    } else if (source.droppableId === "2") {
      add = inprogresslist[source.index];
      inprogresslist.splice(source.index, 1);
      console.log(inprogresslist);
    } else {
      add = donelist[source.index];
      donelist.splice(source.index, 1);
    }

    if (destination.droppableId === "4") {
      todolist.splice(destination.index, 0, add);
    } else if (destination.droppableId === "2") {
      inprogresslist.splice(destination.index, 0, add);
    } else {
      done.splice(destination.index, 0, add);
    }
    settodo(todolist);
    setinprogress(inprogresslist);
    setdone(donelist);
    const formData = new FormData();
    formData.append("field", "status");
    formData.append("value", Number(result.destination.droppableId));
    const { data } = await updateIssueAPI(access, result.draggableId, formData);
  };
  useEffect(() => {
    if (loading) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [loading]);
  // SearchBox Filter Code
  const searchFilterHandler = (e) => {
    if (e.target.value === "") {
      setFilterIssues(typeFilterIssues);
    }
    const searchData = typeFilterIssues.filter((data) =>
      String(data.issue_summary)
        .toLowerCase()
        .includes(String(e.target.value).toLowerCase())
    );
    console.log(searchData);
    setFilterIssues([...searchData]);
  };

  // Saprating Isses According Status
  useEffect(() => {
    setdone(filterIssues.filter((data) => data.status.id === 1));
    setinprogress(filterIssues.filter((data) => data.status.id === 2));
    settodo(filterIssues.filter((data) => data.status.id === 4));
  }, [filterIssues]);
  useEffect(() => {
    settodo(todo.sort((a, b) => a.index - b.index));
  }, [todo]);
  const cardHeader = () => {
    return (
      <>
        <div className="row " style={{ alignItems: "center" }}>
          <div className="col">
            {currentProject.key} - {currentProject.title}
          </div>
          <Button
            className="h-2rem w-8rem text-xs"
            label="Create Issue"
            severity="primary"
            outlined
            size="small"
            onClick={() => {
              setDisplayCreateIssueModal(true);
            }}
          />
        </div>
      </>
    );
  };
  return (
    <Layout>
      {editIssueModal && (
        <EditIssue
          show={editIssueModal}
          seteditIssueModal={seteditIssueModal}
        />
      )}
      <CreateIssueModal
        displayCreateIssueModal={displayCreateIssueModal}
        setDisplayCreateIssueModal={setDisplayCreateIssueModal}
      />
      <Card title={cardHeader}>
        <div
          className="container"
          style={{
            marginBottom: "-2rem",
            marginTop: "-2rem",
            marginLeft: "-0.6rem",
          }}
        >
          <div className="row">
            <div className="col-3">
              <InputText
                type="text"
                className="p-inputtext-sm text-xs h-2rem"
                placeholder="Search this board"
                onChange={searchFilterHandler}
              />
            </div>
            <div className="col d-flex">
              <AvatarGroup max={10} spacing="medium">
                {teams.map((data, index) => (
                  <Tooltip key={data.user[0].id} title={data.user[0].fullName}>
                    <img
                      key={data.user[0].id}
                      alt={data.user[0].profile}
                      src={data.user[0].profile}
                      onClick={() => profileFilter(index, data.user[0].id)}
                      style={{ height: "45px", width: "45px" }}
                      className={
                        activeStates[index]
                          ? "avatar-active"
                          : "avatar-inactive"
                      }
                    />
                  </Tooltip>
                ))}
                <Tooltip title={"Add New Member"}>
                  <Avatar
                    src="https://cdn.create.vista.com/api/media/small/237384104/stock-vector-add-user-vector-icon-sign"
                    shape="circle"
                    size="large"
                    onClick={() => setAddTeamMember((prevState) => !prevState)}
                  />
                </Tooltip>
              </AvatarGroup>
              {addTeamMember && (
                <AddTeamMemberModal
                  users={userList}
                  access={access}
                  currentProject={currentProject}
                  display={true}
                  setteamCreated={setteamCreated}
                  setAddTeamMember={setAddTeamMember}
                />
              )}
              <MultiSelectDropdown
                data={issue_type}
                typeSortHandler={typeSortHandler}
              />
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
          </div>
        </div>
      </Card>
      {isLoading && <LoadingIssues />}
      <br />
      {!isLoading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row justify-content-start ">
            <Droppable droppableId="4">
              {(provided) => (
                <Card
                  subTitle={todo.length === 0 ? "Todo" : "Todo " + todo.length}
                  ref={provided.innerRef}
                  className="col-3 bg-light m-1 text-xs"
                  {...provided.droppableProps}
                  showHeader={false}
                >
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
                          onClick={() => {
                            seteditIssueModal(true);
                          }}
                        >
                          <div
                            className="d-flex"
                            style={{
                              marginTop: "-2rem",
                              paddingBottom: "0rem",
                            }}
                          >
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
                          <div
                            className="row h-1rem"
                            style={{ alignItems: "center" }}
                          >
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
                  subTitle={
                    inprogress.length === 0
                      ? "In Progress"
                      : "In Progress " + inprogress.length
                  }
                  {...provided.droppableProps}
                >
                  {inprogress.map((data, index) => (
                    <Draggable
                      draggableId={String(data.id)}
                      index={index}
                      key={data.issue_summary}
                    >
                      {(provided) => (
                        <Card
                          className="mb-2 p-0"
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
                            }}
                          >
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
                          <div
                            className="row h-1rem"
                            style={{ alignItems: "center" }}
                          >
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
                  subTitle={
                    done.length === 0
                      ? "Done Issues"
                      : "Done Issues " + done.length
                  }
                  ref={provided.innerRef}
                  className="col-3 bg-light m-1 text-xs"
                  {...provided.droppableProps}
                >
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
                          <div
                            className="d-flex"
                            style={{
                              marginTop: "-2rem",
                              paddingBottom: "0rem",
                            }}
                          >
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
                          <div
                            className="row h-1rem"
                            style={{ alignItems: "center" }}
                          >
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
      )}
    </Layout>
  );
};

export default Work;
