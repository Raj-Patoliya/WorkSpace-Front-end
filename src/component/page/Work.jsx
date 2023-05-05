import React, { useDebugValue, useEffect, useState } from "react";
import Layout from "../layout/layout";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
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
import { getIssuesByProjectKey, getStatus } from "../../redux/slice/issueSlice";
import { Tooltip } from "@mui/material";
import { updateIssueAPI } from "../../redux/api";
const Work = () => {
  const { keys } = useParams();
  console.log(typeof keys);
  const dispatch = useDispatch();
  const { access } = useSelector((state) => state.auth.token);
  const issue = useSelector((state) => state.issue.issues);
  const team = useSelector((state) => state.issue.team);
  const status = useSelector((state) => state.issue.status);
  const [issues, setissues] = useState([]);
  const [todo, settodo] = useState([]);
  const [inprogress, setinprogress] = useState([]);
  const [done, setdone] = useState([]);

  useEffect(() => {
    dispatch(getStatus(access));
    dispatch(getIssuesByProjectKey({ access, keys }));
  }, [dispatch, access, keys]);

  useEffect(() => {
    setissues(issue);
    console.log(issue);
    console.log(team);
  }, [issue, team]);

  useEffect(() => {
    setdone(issues.filter((data) => data.status === 1));
    setinprogress(issues.filter((data) => data.status === 2));
    settodo(issues.filter((data) => data.status === 4));
  }, [issues]);

  const onDragEnd = async (result) => {
    const formData = new FormData();
    formData.append("field", "status");
    formData.append("value", Number(result.destination.droppableId));
    const { data } = await updateIssueAPI(access, result.draggableId, formData);
    console.log(data);
    console.log(result);
    console.log(result.draggableId);
    console.log(result.source.droppableId);
    dispatch(getIssuesByProjectKey({ access, keys }));
  };
  return (
    <Layout>
      <Card title="Project Name">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-2">
              <InputText
                type="text"
                className="p-inputtext-sm text-xs h-2rem"
                placeholder="Search this board"
              />
            </div>
            <div className="col-6 d-flex " style={{ alignItems: "center" }}>
              <AvatarGroup max={4} spacing="medium">
                {team.map((data) => (
                  <Tooltip title={data.user[0].fullName}>
                    <Avatar
                      src={data.user[0].profile}
                      size="large"
                      shape="circle"
                      // className="h-2rem w-2rem"
                    />
                  </Tooltip>
                ))}{" "}
                <Tooltip title={"Add New Member"}>
                  <Avatar
                    label="+"
                    shape="circle"
                    size="large"
                    style={{ background: "grey", color: "" }}
                    // onMouseEnter={() =>  {
                    //   alert("hello");
                    // }}
                  />
                </Tooltip>
              </AvatarGroup>
              <MultiSelectDropdown data={status} />
              <Button
                label="Clear Filter"
                severity="primary"
                text
                size="small"
                className="w-3 h-1rem text-xs m-2"
              />
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
                        <p className="text-xs">{data.issue_summary}</p>
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
                        {data.issue_summary}
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
                        {data.issue_summary}
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
