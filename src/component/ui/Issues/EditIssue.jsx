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
import { formatDistanceToNow } from "date-fns";

import { Divider } from "primereact/divider";

import {
  getIssueById,
  getIssueType,
  getPriority,
  getStatus,
} from "../../../redux/slice/issueSlice";
import { Menu, MenuItem } from "@mui/material";
import JSZip from "jszip";
import FileSaver from "file-saver";
import {
  createCommentAPI,
  deleteCommentAPI,
  updateCommentAPI,
  updateIssueAPI,
} from "../../../redux/api";
import IssueTeamList from "../components/userTeamList";
const EditIssue = ({ show, seteditIssueModal, issueId, data, teams }) => {
  const dispatch = useDispatch();
  const { keys } = useParams();
  const toast = useRef(null);
  const { access } = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const issueReq = useSelector((state) => state.issue.singleIssue);
  const typeList = useSelector((state) => state.issue.type);
  const statusList = useSelector((state) => state.issue.status);
  const priorityList = useSelector((state) => state.issue.priority);

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
  const [newComment, setnewComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [editedComment, setEditedComment] = useState(null);
  const [editAssignee, setEditAssignee] = useState(null);
  const [editReporter, setEditReporter] = useState(null);
  const [ago, setAgo] = useState("");
  const [updateDate, setUpdateDate] = useState("");

  useEffect(() => {
    dispatch(getStatus(access));
    dispatch(getPriority(access));
    dispatch(getIssueType(access));
  }, [dispatch, access]);

  useEffect(() => {
    setStatus(statusList);
    setpriority(priorityList);
    setissue_type(typeList);
  }, [statusList, typeList, priorityList]);
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
    setUpdateDate(data.updated_date);
  }, [data]);

  useEffect(() => {
    console.log(data.updated_date);
    const dt = new Date(data.updated_date);
    const ago = formatDistanceToNow(dt, {
      addSuffix: true,
    });
    setAgo(ago);
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

  const commentHandler = async (commentMessage) => {
    const formData = new FormData();
    formData.append("comment_text", commentMessage);
    formData.append("user_id", currentUser.id);
    formData.append("issue_id", issue.id);
    const { data } = await createCommentAPI(access, formData);
    setcomments((prevState) => [data.lastcomment, ...prevState]);
    setnewComment(null);
  };

  const updateCommentHandler = async (comment, id) => {
    setEditComment(null);
    const formData = new FormData();
    formData.append("comment_text", comment);
    const { data } = await updateCommentAPI(access, id, formData);
    const commentArray = comments.map((data) => {
      if (data.id === id) {
        const updated = { ...data, comment_text: comment };
        return { ...updated };
      } else {
        return data;
      }
    });
    setcomments(commentArray);
  };
  const deleteCommentHandler = async (id) => {
    console.log(id);
    const { data } = await deleteCommentAPI(access, id);
    if (data.success) {
      toast.current.show({
        severity: "info",
        summary: "Deleted",
        detail: `Comment deleted SuccessFully`,
      });
      const commentArray = comments.filter((data) => data.id !== id);
      setcomments(commentArray);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Something Went Wrong`,
      });
    }
  };

  const updateHandler = async (field, value) => {
    const formData = new FormData();
    formData.append("field", field);
    formData.append("value", value);
    console.log(formData);
    const { data } = await updateIssueAPI(access, issue.id, formData);
  };

  const updateDropDownHandler = async (name, id) => {
    const formData = new FormData();
    formData.append("field", name);
    formData.append("value", Number(id));
    console.log(formData);
    // const { data } = await updateIssueAPI(access, issue.id, formData);
    console.log(data);
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
                        className="h-6rem"
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
                    Attachments ({attachments.length})
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
                      <Editor
                        value={newComment}
                        onTextChange={(e) => setnewComment(e.htmlValue)}
                      />
                      <br />
                      <Button
                        label="Post"
                        size="small"
                        className="h-10px w-3rem p-0 -mt-4 ml-2 mb-2  text-xs"
                        onClick={() => {
                          if (!newComment) {
                            toast.current.show({
                              severity: "error",
                              summary: "Error",
                              detail: `Please Enter Comment Message`,
                            });
                          } else {
                            commentHandler(newComment);
                          }
                        }}
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
                            {formatDistanceToNow(new Date(data.created_date), {
                              addSuffix: true,
                            })}
                          </div>
                        </div>
                        <div className="row pl-3 mt-0">
                          {editComment === data.id && (
                            <div className="row pl-3 mt-0">
                              <div classNameclassName="col-md-auto ">
                                <Editor
                                  value={data.comment_text}
                                  onTextChange={(e) =>
                                    setEditedComment(e.htmlValue)
                                  }
                                />
                                <div className="mt-1 mb-1">
                                  <Button
                                    severity="danger"
                                    label="Discard"
                                    size="small"
                                    text
                                    className="h-24px w-4rem p-0 text-xs"
                                    onClick={() => setEditComment(null)}
                                  />
                                  <Button
                                    label="Update"
                                    size="small"
                                    text
                                    severity="warning"
                                    className="h-24px w-4rem p-0 ml-2  text-xs"
                                    // onClick={() => setEditComment(null)}
                                    onClick={() => {
                                      //
                                      updateCommentHandler(
                                        editedComment,
                                        data.id
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {editComment !== data.id && (
                            <div className="row pl-3 mt-0">
                              <div
                                classNameclassName="col-md-auto "
                                dangerouslySetInnerHTML={{
                                  __html: data.comment_text,
                                }}
                              ></div>
                              {currentUser.id === data.commentator[0].id && (
                                <div>
                                  <Button
                                    severity="secondary"
                                    label="Edit"
                                    size="small"
                                    text
                                    className="h-1rem w-2rem p-0 text-xs "
                                    onClick={() => setEditComment(data.id)}
                                  />
                                  <Button
                                    severity="danger"
                                    label="Delete"
                                    size="small"
                                    text
                                    className="h-1rem w-3rem p-0 text-xs "
                                    onClick={() => {
                                      deleteCommentHandler(data.id);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col overflow-hidden">
            <div className="row card">
              <span className="mt-2 text-xs">Status</span>
              <div className="col-md-auto">
                <DropdownTemplate
                  className="col-md-auto"
                  data={statusList}
                  optionLabel="Status"
                  placeholder="Issue Status"
                  defaultValue={issue.status}
                  onSelected={updateHandler}
                  name="status"
                />
              </div>
              <span className="mt-2 text-xs">Priority</span>
              <div className="col-md-auto mb-0">
                <DropdownTemplate
                  className="col-md-auto"
                  data={priorityList}
                  optionLabel="Priority"
                  placeholder="Issue Priority"
                  defaultValue={issue.priority}
                  onSelected={updateHandler}
                  name="priority"
                />
              </div>
              <Divider />
              <Panel header="Details" toggleable>
                <div className="row align-items-center ">
                  <div className="col-4 text-xs -mb-3">Assignee</div>
                  <div className="col text-primary">
                    <div className="row align-items-center">
                      <div className="col-md-auto">
                        {/* <Avatar
                          image="https://secure.gravatar.com/avatar/a4ed0c44beb6fc40891e61f3394921ba?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png"
                          shape="circle"
                          size="small"
                          onClick={() => {}}
                        /> */}
                        <IssueTeamList
                          teams={teams}
                          issueId={issue.id}
                          defaultValue={data.assignee}
                          name="assignee"
                          onSelected={updateHandler}
                        />
                      </div>
                      {/* <div className="col-md-auto">
                        <span>Raj Patoliya</span>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-4 text-xs -mb-3">Reporter</div>
                  <div className="col text-primary">
                    <div className="row align-items-center">
                      <div className="col-md-auto">
                        {/* <Avatar
                          image="https://secure.gravatar.com/avatar/a4ed0c44beb6fc40891e61f3394921ba?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FRP-4.png"
                          shape="circle"
                          size="small"
                          onClick={() => {}}
                        /> */}
                        <IssueTeamList
                          teams={teams}
                          issueId={issue.id}
                          name="reporter"
                          onSelected={updateHandler}
                          defaultValue={data.reporter}
                        />
                      </div>
                      {/* <div className="col-md-auto">
                        <span>Raj Patoliya</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Panel>
              <div>
                <p className="text-xs mt-2 ml-1 text-secondary">
                  Created{" "}
                  {formatDistanceToNow(new Date(data.created_date), {
                    addSuffix: true,
                  })}
                  <br />
                  Updated {ago}
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
