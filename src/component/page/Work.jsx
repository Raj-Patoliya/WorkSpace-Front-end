import React, { useDebugValue, useEffect, useState } from "react";
import Layout from "../layout/layout";
import { Card } from "primereact/card";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const Work = () => {
  const [issues, setissues] = useState([
    { name: "task1", status: "todo" },
    { name: "task2", status: "inprogress" },
    { name: "task3", status: "done" },
    { name: "task4", status: "todo" },
    { name: "task5", status: "inprogress" },
    { name: "task6", status: "done" },
    { name: "task7", status: "todo" },
    { name: "task8", status: "inprogress" },
    { name: "task9", status: "done" },
    { name: "task10", status: "todo" },
  ]);
  const [todo, settodo] = useState([]);
  const [inprogress, setinprogress] = useState([]);
  const [done, setdone] = useState([]);
  useEffect(() => {
    setdone(issues.filter((data) => data.status === "done"));
    setinprogress(issues.filter((data) => data.status === "inprogress"));
    settodo(issues.filter((data) => data.status === "todo"));
  }, [issues]);
  const onDragEnd = (result) => {
    console.log(result);
  };
  return (
    <Layout>
      <Card title="Project Name">
        <div className="container">
          <div className="row justify-content-start">
            <div className="col-3">
              <InputText
                type="text"
                className="p-inputtext-sm"
                placeholder="Search this board"
              />
            </div>
            <div className="col-2">
              <AvatarGroup max={4} spacing="medium" className="">
                <Avatar
                  src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                  size="large"
                  shape="circle"
                />
                <Avatar
                  src="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
                  size="large"
                  shape="circle"
                />
                <Avatar
                  src="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
                  size="large"
                  shape="circle"
                />
                <Avatar
                  src="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png"
                  size="large"
                  shape="circle"
                />
                <Avatar
                  src="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png"
                  size="large"
                  shape="circle"
                />
                <Avatar
                  label="+"
                  shape="circle"
                  size="large"
                  style={{ backgroundColor: "gery", color: "" }}
                />
              </AvatarGroup>
            </div>
          </div>
        </div>
      </Card>
      <br />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row justify-content-start">
          <Droppable droppableId="todo">
            {(provided) => (
              <Card
                subTitle="TO DO"
                ref={provided.innerRef}
                className="col-3 bg-light"
                {...provided.droppableProps}
              >
                <Divider />
                {todo.map((data, index) => (
                  <Draggable
                    draggableId={data.name}
                    index={index}
                    key={data.name}
                  >
                    {(provided) => (
                      <Card
                        className="mb-2"
                        role="region"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {data.name}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
          <Droppable droppableId="inprogress">
            {(provided) => (
              <Card
                className="col-3 bg-light"
                ref={provided.innerRef}
                subTitle="inprogress"
                {...provided.droppableProps}
              >
                <Divider />
                {inprogress.map((data, index) => (
                  <Draggable
                    draggableId={data.name}
                    index={index}
                    key={data.name}
                  >
                    {(provided) => (
                      <Card
                        className="mb-2"
                        role="region"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {data.name}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
          <Droppable droppableId="done">
            {(provided) => (
              <Card
                subTitle="Done Issues"
                ref={provided.innerRef}
                className="col-3 bg-light"
                {...provided.droppableProps}
              >
                <Divider />
                {done.map((data, index) => (
                  <Draggable
                    draggableId={data.name}
                    index={index}
                    key={data.name}
                  >
                    {(provided) => (
                      <Card
                        className="mb-2"
                        role="region"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        {data.name}
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
