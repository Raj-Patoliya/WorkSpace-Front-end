import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import pdf from "../../assets/images/icons/pdf.png";
import text from "../../assets/images/icons/text.png";
import json from "../../assets/images/icons/json.png";
import csv from "../../assets/images/icons/csv.png";
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
import { useEffect } from "react";
import { getIssueById } from "../../../redux/slice/issueSlice";
import { Menu, MenuItem } from "@mui/material";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { updateIssueAPI } from "../../../redux/api";
const EditIssue = ({ show, seteditIssueModal, issueId, data }) => {
  const dispatch = useDispatch();
  const { keys } = useParams();
  const { access } = useSelector((state) => state.auth.token);
  const issueReq = useSelector((state) => state.issue.singleIssue);
  const [editSummary, seteditSummary] = useState(false);
  const [editDiscription, seteditDiscription] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(show);
  const [issue, setIssue] = useState({});
  const [urls, setUrls] = useState([]);
  const [summary, setSummary] = useState("");
  const [project, setProject] = useState([]);
  const [status, setStatus] = useState([]);
  const [priority, setpriority] = useState([]);
  const [issue_type, setissue_type] = useState([]);
  const [description, setDescription] = useState("");
  const [assignee, setassignee] = useState([]);
  const [reporter, setreporter] = useState([]);
  const [attachments, setattachments] = useState([]);
  const [comments, setcomments] = useState([]);
  const [tempDescription, setTempDescription] = useState("");
  useEffect(() => {
    setIssue(data);
    setProject(data.project);
    setStatus(data.status);
    setpriority(data.priority);
    setissue_type(data.issue_type);
    setSummary(data.issue_summary);
    setDescription(data.issue_description);
    setassignee(data.assignee);
    setreporter(data.reporter);
    setattachments(data.attachment);
    setcomments(data.comment);
  }, [data]);
  useEffect(() => {
    const url = attachments.map(
      (data) => "http://127.0.0.1:8000" + data.attachment_file
    );
    setUrls(url);
  }, [attachments]);
  const onHide = (name) => {
    seteditIssueModal(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function downloadAllFiles() {
    const zip = new JSZip();
    let fileIndex = 1;
    Promise.all(urls.map((url) => fetch(url))).then((responses) => {
      responses.forEach((response) => {
        zip.file(`file${fileIndex}`, response.blob());
        fileIndex++;
      });
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        FileSaver.saveAs(blob, `${project[0].key} -${issue.id}.zip`);
      });
    });
  }

  const toast = useRef(null);
  const updateHandler = async (field, value) => {
    const formData = new FormData();
    formData.append("field", field);
    formData.append("value", value);
    const { data } = await updateIssueAPI(access, issue.id, formData);
    if (data) {
      toast.current.show({
        severity: "success",
        summary: "Updated",
        detail: `${field} update successfully`,
      });
    }
  };

  const renderPreview = (file) => {
    if (!file) {
      return null;
    }
    const url = "http://127.0.0.1:8000" + file.attachment_file;
    let imageIcons = null;
    if (file.attachment_file.includes(".pdf")) {
      imageIcons = pdf;
    } else if (file.attachment_file.includes(".csv")) {
      imageIcons = csv;
    } else if (file.attachment_file.includes(".txt")) {
      imageIcons = text;
    } else if (file.attachment_file.includes(".docx")) {
      imageIcons = text;
    } else if (file.attachment_file.includes(".json")) {
      imageIcons = json;
    } else {
      imageIcons = url;
    }
    return (
      <div key={file.name} class="col-sm">
        <Image
          src={imageIcons}
          alt={file.name}
          width="80"
          height="60"
          onClick={() => {
            const newWindow = window.open(url, "_blank", "noopener,noreferrer");
            if (newWindow) newWindow.opener = null;
          }}
        />
        <p>{file.name}</p>
      </div>
    );
  };

  const header = () => {
    return (
      <>
        <div className="text-sm text-secondary">
          <p className="">
            <img src={issue_type.icon} width="15px" alt="hdhd" />{" "}
            {project[0].key} -{issue.id}
          </p>
        </div>
      </>
    );
  };
  return (
    <div>
      <Toast ref={toast} />
      <Dialog
        header={header}
        visible={displayBasic2}
        closeOnEscape={true}
        style={{ width: "80vw", marginTop: "3rem", height: "85vh" }}
        onHide={() => onHide()}
        draggable={false}
      >
        <div className="row">
          <div className="col-8">
            <div>
              <div class="flex align-items-center justify-content-center card-container flex-column">
                <div
                  class="overflow-auto surface-overlay p-3"
                  style={{ maxHeight: "85vh" }}
                >
                  <p className="pl-2 -mt-3 mb-0 text-xs text-color-primary font-bold">
                    Summary
                  </p>
                  {!editSummary && (
                    <div
                      className="h-2rem px-2  text-base issues-summary"
                      onClick={() => seteditSummary(true)}
                    >
                      <p>{summary}</p>
                    </div>
                  )}
                  {editSummary && (
                    <div>
                      <InputTextarea
                        value={summary}
                        rows={1}
                        cols={60}
                        style={{ maxHeight: "20rem" }}
                        onChange={(e) => {
                          setSummary(e.target.value);
                        }}
                        onBlur={async () => {
                          seteditSummary(false);
                          updateHandler("issue_summary", summary);
                        }}
                      />
                    </div>
                  )}
                  <p className="pl-2 mt-2  mb-0 text-xs text-color-primary font-bold">
                    Description
                  </p>
                  {!editDiscription && (
                    <div
                      className="issues-summary"
                      onClick={() => seteditDiscription(true)}
                    >
                      <div
                        className="pl-2 mb-0"
                        dangerouslySetInnerHTML={{
                          __html: description,
                        }}
                      ></div>
                    </div>
                  )}
                  {editDiscription && (
                    <div className="text-xs">
                      <Editor
                        value={description}
                        onTextChange={(e) => {
                          setTempDescription(e.htmlValue);
                        }}
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
                          onClick={() => {
                            seteditDiscription(false);
                            setDescription(tempDescription);
                            updateHandler("issue_description", tempDescription);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <p className="pl-2 mt-4  mb-0 text-xs text-color-primary font-bold">
                    Attachments (2)
                    <MoreHorizIcon
                      style={{
                        float: "right",
                      }}
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={downloadAllFiles}>
                        Download All
                      </MenuItem>
                    </Menu>
                  </p>
                  <div className="row mt-3 pl-2">
                    {attachments.map(renderPreview)}
                  </div>
                  <div className="row pl-2 ">
                    <div className="col">
                      <p className="mt-2 -mb-2 text-xs text-color-primary font-bold">
                        Comments
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Editor />
                      <br />
                      <Button
                        label="Post"
                        size="small"
                        className="h-10px w-3rem p-0 -mt-4 ml-2 mb-2  text-xs"
                        onClick={() =>
                          setcomments((prevState) => [
                            ...prevState,
                            {
                              id: 2,
                              commentator: [
                                {
                                  id: 4,
                                  profile:
                                    "https://res.cloudinary.com/dilgnd55s/image/upload/v1/media/avtar/Screenshot_from_2023-04-14_11-22-27_up8maq",
                                  fullName: "Garima Bhutra",
                                },
                              ],
                              comment_text: "Hello Issues",
                              created_date: "2023-05-13T05:17:17.570047Z",
                              issue_id: 34,
                              user_id: 4,
                            },
                          ])
                        }
                      />
                    </div>
                  </div>
                  {comments.map((data) => {
                    return (
                      <div className="comments pb-2">
                        <div className="row pl-2 mt-0 text-sm align-items-center">
                          <div className="col-md-auto font-bold text-left">
                            <div className="row align-items-center">
                              <div className="col-md-auto text-right ">
                                <Avatar
                                  image={data.commentator[0].profile}
                                  shape="circle"
                                  size="small"
                                  onClick={() => {}}
                                />
                              </div>
                              <div className="col -ml-3 text-xs ">
                                {data.commentator[0].fullName}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-auto text-xs">
                            {data.created_date}
                          </div>
                        </div>
                        <div className="row pl-3 mt-0">
                          <div
                            classNameclassName="col-md-auto "
                            dangerouslySetInnerHTML={{
                              __html: data.comment_text,
                            }}
                          ></div>
                        </div>
                        <div>
                          <Button
                            severity="secondary"
                            label="Edit"
                            size="small"
                            text
                            className="h-1rem w-2rem p-0 text-xs "
                            onClick={() => seteditDiscription(false)}
                          />
                          <Button
                            severity="danger"
                            label="Delete"
                            size="small"
                            text
                            className="h-1rem w-3rem p-0 text-xs "
                            onClick={() => seteditDiscription(false)}
                          />
                        </div>
                      </div>
                    );
                  })}
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
