import React, { useEffect, useState } from "react";
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
  getUsers,
  updateIssue,
} from "../../redux/slice/issueSlice";
import { Tooltip } from "@mui/material";
import { updateIssueAPI } from "../../redux/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Work.css";
import LoadingIssues from "../ui/components/LoadingIssues";
import AddTeamMemberModal from "../ui/components/AddTeamMemberModal";
import { getProjectTeam } from "../../redux/slice/projectSlice";
import CreateIssueModal from "../ui/Issues/create-issue-modal";
import EditIssue from "../ui/Issues/EditIssue";
import DragableComponent from "../ui/Issues/DropableComponent";
import TeamMemberList from "../ui/Issues/TeamMemberList";
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
  const [editIssueModal, seteditIssueModal] = useState(null);
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
  const [typeSortClear, setTypeSortClear] = useState(false);
  const [isClearVisible, setIsClearVisible] = useState(false);
  const [typeFilterIssues, setTypeFilterIssues] = useState([]);
  const [userFilter, setuserFilter] = useState([]);
  const [filterIssues, setFilterIssues] = useState([]);
  const [issueId, setissueId] = useState(null);

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
  useEffect(() => {
    dispatch(getIssuesByProjectKey({ access, keys }));
  }, [dispatch, editIssueModal, access, keys]);
  // setting up fetched issues form Redux
  useEffect(() => {
    console.log(issue);
    setUserFilterIssues(issue);
    setTypeFilterIssues(issue);
    setFilterIssues(issue);
    setTeams(team);
  }, [issue, team]);

  // Profile CSS Handler
  useEffect(() => {
    const anyActive = activeStates.some((isActive) => isActive);
    setIsClearVisible(anyActive);
    if (typeSortClear) {
      setIsClearVisible(true);
    }
  }, [activeStates, typeFilterIssues, typeSortClear]);

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
    console.log(result);
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
          data={editIssueModal}
          teams={teams}
          issueId={issueId}
          show={editIssueModal}
          seteditIssueModal={seteditIssueModal}
        />
      )}
      <CreateIssueModal
        displayCreateIssueModal={displayCreateIssueModal}
        seteditIssueModal={seteditIssueModal}
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
              <TeamMemberList
                teams={teams}
                profileFilter={profileFilter}
                setAddTeamMember={setAddTeamMember}
                activeStates={activeStates}
              />
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
                setTypeSortClear={setTypeSortClear}
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
              )}
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
                  className="col-3 bg-light m-1 p-0 text-xs"
                  {...provided.droppableProps}
                  showHeader={false}
                >
                  {todo.map((data, index) => (
                    <DragableComponent
                      setissueId={setissueId}
                      data={data}
                      provided={provided}
                      seteditIssueModal={seteditIssueModal}
                      draggableId={String(data.id)}
                      index={index}
                      issueKey={keys}
                      key={data.issue_summary}
                    />
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
                    <DragableComponent
                      data={data}
                      provided={provided}
                      seteditIssueModal={seteditIssueModal}
                      draggableId={String(data.id)}
                      index={index}
                      issueKey={keys}
                      key={data.issue_summary}
                    />
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
                    <DragableComponent
                      data={data}
                      provided={provided}
                      seteditIssueModal={seteditIssueModal}
                      draggableId={String(data.id)}
                      index={index}
                      issueKey={keys}
                      key={data.issue_summary}
                    />
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