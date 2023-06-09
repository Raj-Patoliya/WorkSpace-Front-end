import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
} from "../../redux/slice/issueSlice";
import {
  IssueFilterAPI,
  deleteIssueAPI,
  updateIssueAPI,
} from "../../redux/api";
import "./Work.css";
import LoadingIssues from "../ui/components/LoadingIssues";
import AddTeamMemberModal from "../ui/components/AddTeamMemberModal";
import { getProjectTeam } from "../../redux/slice/projectSlice";
import CreateIssueModal from "../ui/Issues/CreateIssueModal";
import EditIssue from "../ui/Issues/EditIssue";
import DragableComponent from "../ui/Issues/DropableComponent";
import TeamMemberList from "../ui/Issues/TeamMemberList";
import { clearSelection } from "../../redux/slice/uiSlice";

const Work = (props) => {
  const dispatch = useDispatch();
  const { keys } = useParams();
  const issue = useSelector((state) => state.issue.issues);
  const loading = useSelector((state) => state.issue.loading);
  const team = useSelector((state) => state.project.team);
  const project = useSelector((state) => state.project);
  const issue_type = useSelector((state) => state.issue.type);
  const currentProject = useSelector((state) => state.issue.currentProject);
  const userList = useSelector((state) => state.issue.userList);
  const [editIssueModal, seteditIssueModal] = useState(null);
  const [teamCreated, setteamCreated] = useState(false);
  const [addTeamMember, setAddTeamMember] = useState(false);
  const [displayCreateIssueModal, setDisplayCreateIssueModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [todo, settodo] = useState([]);
  const [inprogress, setinprogress] = useState([]);
  const [done, setdone] = useState([]);
  const [activeStates, setActiveStates] = useState(team.map(() => false));
  const [typeSortClear, setTypeSortClear] = useState(false);
  const [isClearVisible, setIsClearVisible] = useState(false);
  const [userFilter, setuserFilter] = useState([]);
  const [filterIssues, setFilterIssues] = useState([]);
  const [issueId, setissueId] = useState(null);
  const [searchText, setsearchText] = useState("");
  const [typeArray, setTypeArray] = useState([]);
  const [deleted, setdeleted] = useState(false);
  useEffect(() => {
    dispatch(getCurrentProjects({ keys }));
    dispatch(getStatus());
    dispatch(getIssueType());
    dispatch(getIssuesByProjectKey({ keys }));
    dispatch(getUsers());
    dispatch(getProjectTeam({ keys }));
  }, [dispatch, keys]);
  useEffect(() => {
    if (teamCreated) {
      dispatch(getProjectTeam({ keys }));
      setteamCreated(false);
    }
  }, [dispatch, project, keys, teamCreated]);

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      formData.append("user", []);
      formData.append("search", "");
      formData.append("type", []);
      formData.append("keys", keys);
      const { data } = await IssueFilterAPI(formData);
      setFilterIssues(data.data);
      setdeleted(false);
    })();
    dispatch(getProjectTeam({ keys }));
  }, [dispatch, editIssueModal, keys, displayCreateIssueModal, deleted]);

  useEffect(() => {
    setTeams([...team]);
  }, [issue, team]);
  useEffect(() => {
    const anyActive = activeStates.some((isActive) => isActive);
    setIsClearVisible(anyActive);
    if (typeSortClear) {
      setIsClearVisible(true);
    }
  }, [activeStates, typeSortClear]);

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
    dispatch(clearSelection(false));
    setuserFilter([]);
    setTypeArray([]);
    setsearchText("");
    setTypeSortClear(false);
  };

  const typeSortHandler = (value) => {
    if (value.length === 0) {
      setTypeArray([]);
    } else {
      const indexArray = value.map((data) => data.id);
      setTypeArray(indexArray);
    }
  };

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      formData.append("user", userFilter);
      formData.append("search", searchText);
      formData.append("type", typeArray);
      formData.append("keys", keys);
      const { data } = await IssueFilterAPI(formData);
      setFilterIssues(data.data);
    })();
  }, [userFilter, searchText, keys, typeArray, dispatch]);
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

    if (source.droppableId === "4") {
      add = todolist[source.index];
      todolist.splice(source.index, 1);
    } else if (source.droppableId === "2") {
      add = inprogresslist[source.index];
      inprogresslist.splice(source.index, 1);
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
    const { data } = await updateIssueAPI(result.draggableId, formData);
    if (data.error) {
      alert("Something Went wrong");
    }
  };
  useEffect(() => {
    if (loading) {
      setIsloading(true);
    } else {
      setIsloading(false);
    }
  }, [loading]);
  const deleteIssue = async (id) => {
    const { data } = await deleteIssueAPI(id);
    if (data.success) {
    }
  };
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
                value={searchText}
                className="p-inputtext-sm text-xs h-2rem"
                placeholder="Search this board"
                onChange={(e) => setsearchText(e.target.value)}
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
                >
                  {todo.map((data, index) => (
                    <DragableComponent
                      setdeleted={setdeleted}
                      setissueId={setissueId}
                      data={data}
                      provided={provided}
                      seteditIssueModal={seteditIssueModal}
                      draggableId={String(data.id)}
                      index={index}
                      issueKey={keys}
                      key={data.id}
                      deleteIssue={deleteIssue}
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
                      setdeleted={setdeleted}
                      setissueId={setissueId}
                      data={data}
                      provided={provided}
                      seteditIssueModal={seteditIssueModal}
                      draggableId={String(data.id)}
                      index={index}
                      issueKey={keys}
                      key={data.id}
                      deleteIssue={deleteIssue}
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
                      setdeleted={setdeleted}
                      setissueId={setissueId}
                      data={data}
                      provided={provided}
                      seteditIssueModal={seteditIssueModal}
                      draggableId={String(data.id)}
                      index={index}
                      issueKey={keys}
                      key={data.id}
                      deleteIssue={deleteIssue}
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
