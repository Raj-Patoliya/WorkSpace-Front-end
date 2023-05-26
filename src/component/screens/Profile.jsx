import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import "./profile.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { UserIssueBasicDetailsAPI, changePasswordAPI } from "../../redux/api";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch } from "react-redux";
import { getProjects } from "../../redux/slice/projectSlice";
import { ProgressSpinner } from "primereact/progressspinner";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required."),
  newPassword: Yup.string()
    .required("New password is required.")
    .min(6, "New password must be at least 6 characters long."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

const Profile = () => {
  const toast = useRef(null);
  const [user, setuser] = useState({ allIssue: [] });
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.allProjectList);
  const [projectList, setprojectList] = useState({});
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await UserIssueBasicDetailsAPI();
      dispatch(getProjects());
      setuser(data);
    })();
  }, [dispatch]);
  useEffect(() => {
    setprojectList(projects);
    setisLoading(false);
  }, [projects]);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("currentPassword", values.currentPassword);
      formData.append("newPassword", values.newPassword);
      const { data } = await changePasswordAPI(formData);
      if (data.error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: data.error,
          life: 3000,
        });
      } else {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: data.success,
          life: 3000,
        });
      }
    },
  });

  return (
    <Layout>
      {isLoading && <ProgressSpinner />}
      {!isLoading && (
        <>
          <Toast ref={toast} />
          <div className="h-10rem -ml-4 -mt-4 bg-blue-200 pt-3">
            <Avatar
              image={user.profile}
              shape="circle"
              style={{ width: "250px", height: "250px", marginLeft: "2rem " }}
            />
          </div>
          <div style={{ marginTop: "7rem", marginLeft: "2rem" }}>
            <h1>{user.fullName}</h1>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Card title="Information" style={{ width: "45rem" }} header="">
              <p className="m-0">
                <span>
                  <i className="pi pi-envelope"></i> {user.email}
                </span>
              </p>
              <Divider align="left">
                <div className="inline-flex align-items-center">
                  <b>Change Password</b>
                </div>
              </Divider>
              <Card>
                <form onSubmit={formik.handleSubmit}>
                  <Password
                    id="currentPassword"
                    type="password"
                    className="w-full mt-1"
                    toggleMask
                    feedback={false}
                    placeholder="Current Password"
                    {...formik.getFieldProps("currentPassword")}
                  />
                  {formik.touched.currentPassword &&
                  formik.errors.currentPassword ? (
                    <div className="text-red-800">
                      {formik.errors.currentPassword}
                    </div>
                  ) : null}
                  <Divider align="center">
                    <b>New Password</b>
                  </Divider>
                  <Password
                    id="newPassword"
                    type="password"
                    className="w-full mt-1"
                    toggleMask
                    placeholder="Create Password"
                    {...formik.getFieldProps("newPassword")}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword ? (
                    <div className="text-red-800">
                      {formik.errors.newPassword}
                    </div>
                  ) : null}
                  <Password
                    id="confirmPassword"
                    type="password"
                    className="w-full mt-1"
                    toggleMask
                    feedback={false}
                    placeholder="Confirm Password"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-red-800">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                  <div className="py-1">
                    <Button
                      label="Save"
                      icon="pi pi-check"
                      className="w-8rem mx-auto"
                    />
                  </div>
                </form>
              </Card>
            </Card>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Card title="Worked on" className="w-50 mr-3 bg-light">
              <Card>
                {user.allIssue.map((data) => (
                  <div className="w-full mb-3 d-flex p-1 border-round transition-colors transition-duration-500 bg-white-300 hover:bg-gray-100 text-white hover:text-gray-900">
                    <div className="w-fit">
                      <img
                        src={data.issue_type.icon}
                        alt={data.issue_type.icon}
                        width={"25px"}
                      />
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-bold h-1rem text-700">
                        {data.issue_summary}
                        <br />
                        <span className="text-xs text-500 font-light mt-0">
                          {data.project.key} - {data.id}
                        </span>
                      </p>
                    </div>
                    <span
                      className="text-500"
                      style={{
                        position: "absolute",
                        marginLeft: "36%",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {data.status.name}
                    </span>
                  </div>
                ))}
              </Card>
            </Card>
            <Card title="Place you work" className="w-50 bg-light">
              <Card>
                {projectList.hasOwnProperty("results") &&
                  projectList.results.map((data) => (
                    <div className="w-full mb-3 d-flex p-1 border-round transition-colors transition-duration-500 bg-white-300 hover:bg-gray-100 text-white hover:text-gray-900">
                      <div className="ml-2">
                        <p className="text-sm font-bold h-1rem text-700">
                          {data.title}
                          <br />
                          <span className="text-xs text-500 font-light mt-0">
                            {data.key} - {data.id}
                          </span>
                        </p>
                      </div>
                      <div
                        className="text-500 d-flex align-items-center"
                        style={{
                          position: "absolute",
                          marginLeft: "30%",
                          fontSize: "15px",
                        }}
                      >
                        <div className="w-fit">
                          <img
                            src={data.owner[0].profile}
                            alt={data.owner[0].profile}
                            width={"25px"}
                          />
                        </div>
                        <span className="w-fit mt-1">
                          {data.owner[0].fullName}
                        </span>
                      </div>
                    </div>
                  ))}
              </Card>
            </Card>
          </div>{" "}
        </>
      )}
    </Layout>
  );
};

export default Profile;
