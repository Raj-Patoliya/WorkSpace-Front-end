import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Editor } from "primereact/editor";
import { InputTextarea } from "primereact/inputtextarea";
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";
import "./editIssue.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownTemplate from "../components/Dropdwon";
const EditIssue = ({ show, seteditIssueModal }) => {
  const dispatch = useDispatch();
  const { keys } = useParams();
  const { access } = useSelector((state) => state.auth.token);
  const [editSummary, seteditSummary] = useState(false);
  const [editDiscription, seteditDiscription] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(show);
  const onHide = (name) => {
    setDisplayBasic2(false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => {
            onHide(name);
            seteditIssueModal(false);
          }}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };
  const header = () => {
    return (
      <>
        <div className="text-sm text-secondary">
          <p>IssueTypeIcon + Project Key + Issues Id </p>
        </div>
      </>
    );
  };
  return (
    <div>
      <Dialog
        header={header}
        visible={displayBasic2}
        closeOnEscape={true}
        style={{ width: "80vw", marginTop: "3rem", height: "85vh" }}
        footer={renderFooter()}
        onHide={() => onHide()}
      >
        <div className="row">
          <div className="col-8">
            <div>
              <div class="flex align-items-center justify-content-center card-container flex-column">
                <div
                  class="overflow-auto surface-overlay p-3 "
                  style={{ maxHeight: "23rem" }}
                >
                  <p className="pl-2 mb-0 text-color-primary font-bold">
                    Summary
                  </p>
                  {!editSummary && (
                    <div
                      className="h-2rem px-2  text-2xl issues-summary"
                      onDoubleClick={() => seteditSummary(true)}
                    >
                      <p>
                        Issue Summary <b>onDouble Click there will be Editor</b>
                      </p>
                    </div>
                  )}
                  {editSummary && (
                    <div>
                      <InputTextarea
                        value="Issue Summary <b>onDouble Click there will be Editor</b>"
                        rows={1}
                        cols={60}
                        style={{ maxHeight: "20rem" }}
                        onBlur={() => seteditSummary(false)}
                      />
                    </div>
                  )}
                  <p className="pl-2 mt-4  mb-0 text-color-primary font-bold">
                    Description
                  </p>
                  {!editDiscription && (
                    <div
                      className="issues-summary"
                      onDoubleClick={() => seteditDiscription(true)}
                    >
                      <div
                        className="pl-2 mt-3 mb-0"
                        dangerouslySetInnerHTML={{
                          __html:
                            '<h1>Hey This my first issues</h1><p><img src="data:image/png;base64,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" ></p>',
                        }}
                      ></div>
                    </div>
                  )}
                  {editDiscription && (
                    <div className="mt-3">
                      <Editor
                        value='<h1>Hey This my first issues</h1><p><img src="data:image/png;base64,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" ></p>'
                        onBlur={() => seteditDiscription(false)}
                      />
                      <div className="mt-5 mb-5">
                        <Button
                          severity="danger"
                          label="Discard"
                          size="small"
                          outlined
                          className="h-2rem w-5rem "
                          onClick={() => seteditDiscription(false)}
                        />
                        <Button
                          label="Save"
                          size="small"
                          className="h-2rem w-5rem ml-2"
                          onClick={() => seteditDiscription(false)}
                        />
                      </div>
                    </div>
                  )}
                  <p className="pl-2 mt-4  mb-0 text-color-primary font-bold">
                    Attachments (2)
                    <MoreHorizIcon
                      style={{
                        float: "right",
                      }}
                    />
                  </p>
                  <div className="row mt-3">
                    <div key={"file.name"} class="col-sm">
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        alt={"file.name"}
                        width="80"
                        height="60"
                        onClick={() => {
                          var win = window.open();
                          win.document.write(
                            '<iframe src="' +
                              "https://www.iconplc.com/site-files/cms-templates/images/open-graph/OG_Facebook.png" +
                              '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
                          );
                        }}
                      />
                      <p>{"file.name"}</p>
                    </div>
                    <div key={"file.name"} class="col-sm">
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        alt={"file.name"}
                        width="80"
                        height="60"
                        onClick={() => {
                          var win = window.open();
                          win.document.write(
                            '<iframe src="' +
                              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" +
                              '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
                          );
                        }}
                      />
                      <p>{"file.name"}</p>
                    </div>
                    <div key={"file.name"} class="col-sm">
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        alt={"file.name"}
                        width="80"
                        height="60"
                        onClick={() => {
                          var win = window.open();
                          win.document.write(
                            '<iframe src="' +
                              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" +
                              '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
                          );
                        }}
                      />
                      <p>{"file.name"}</p>
                    </div>
                    <div key={"file.name"} class="col-sm">
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        alt={"file.name"}
                        width="80"
                        height="60"
                        onClick={() => {
                          var win = window.open();
                          win.document.write(
                            '<iframe src="' +
                              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" +
                              '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
                          );
                        }}
                      />
                      <p>{"file.name"}</p>
                    </div>
                    <div key={"file.name"} class="col-sm">
                      <Image
                        src={
                          "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                        }
                        alt={"file.name"}
                        width="80"
                        height="60"
                        onClick={() => {
                          var win = window.open();
                          win.document.write(
                            '<iframe src="' +
                              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80" +
                              '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
                          );
                        }}
                      />
                      <p>{"file.name"}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <p className="pl-2 mt-4  mb-0 text-color-primary font-bold">
                        Comments
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Editor />
                    </div>
                  </div>
                  <div className="comments pb-2">
                    <div className="row pl-2 mt-0 text-sm align-items-center">
                      <div className="col-md-auto font-bold text-left">
                        <div className="row align-items-center">
                          <div className="col-md-auto text-right ">
                            <Avatar
                              image="https://secure.gravatar.com/avatar/a4ed0c44beb6fc40891e61f3394921ba?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png"
                              shape="circle"
                              size="small"
                              onClick={() => {}}
                            />
                          </div>
                          <div className="col -ml-3">Huzefa Multanpurwala</div>
                        </div>
                      </div>
                      <div className="col-md-auto">Comment Time</div>
                    </div>
                    <div className="row pl-3 mt-0">
                      <div
                        classNameclassName="col-md-auto "
                        dangerouslySetInnerHTML={{
                          __html: "<h1>Hey This my first issues</h1>",
                        }}
                      ></div>
                    </div>
                    <div>
                      <Button
                        severity="secondary"
                        label="Edit"
                        size="small"
                        text
                        className="h-1rem w-4rem p-0"
                        onClick={() => seteditDiscription(false)}
                      />
                      <Button
                        severity="danger"
                        label="Delete"
                        size="small"
                        text
                        className="h-1rem w-4rem p-0"
                        onClick={() => seteditDiscription(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col overflow-hidden">
            <div className="">
              <DropdownTemplate
                // data={status}
                optionLabel="Status"
                placeholder="Issue Status"
                // onSelected={handlSelect}
                name="statusValue"
              />

              <Panel header="Details" toggleable>
                <div className="row align-items-center">
                  <div className="col-3 text-sm">Assignee</div>
                  <div className="col text-primary">
                    <div className="row align-items-center">
                      <div className="col-md-auto">
                        <Avatar
                          image="https://secure.gravatar.com/avatar/a4ed0c44beb6fc40891e61f3394921ba?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png"
                          shape="circle"
                          size="small"
                          onClick={() => {}}
                        />
                      </div>
                      <div className="col-md-auto">
                        <span>Raj Patoliya</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-3 text-sm">Reporter</div>
                  <div className="col text-primary">
                    <div className="row align-items-center">
                      <div className="col-md-auto">
                        <Avatar
                          image="https://secure.gravatar.com/avatar/a4ed0c44beb6fc40891e61f3394921ba?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png"
                          shape="circle"
                          size="small"
                          onClick={() => {}}
                        />
                      </div>
                      <div className="col-md-auto">
                        <span>Raj Patoliya</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-3 text-sm">Creator</div>
                  <div className="col text-primary">
                    <div className="row align-items-center">
                      <div className="col-md-auto">
                        <Avatar
                          image="https://secure.gravatar.com/avatar/a4ed0c44beb6fc40891e61f3394921ba?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png"
                          shape="circle"
                          size="small"
                          onClick={() => {}}
                        />
                      </div>
                      <div className="col-md-auto">
                        <span>Raj Patoliya</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>
              <div>
                <p className="text-xs mt-2 ml-1 text-secondary">
                  Created May 5, 2023 at 12:26 PM <br />
                  Updated May 11, 2023 at 7:09 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditIssue;
