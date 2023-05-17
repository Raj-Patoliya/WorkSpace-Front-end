import React from "react";
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
import { changePasswordAPI } from "../../redux/api";
import { useRef } from "react";
import { Toast } from "primereact/toast";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required."),
  newPassword: Yup.string()
    .required("New password is required.")
    .min(6, "New password must be at least 6 characters long."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
    .required("Confirm password is required."),
});

const Profile = ({ name, email }) => {
  const toast = useRef(null);
  const { access } = useSelector((state) => state.auth.token);
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
      const { data } = await changePasswordAPI(access, formData);
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
      <Toast ref={toast} />
      <div className="h-10rem -ml-4 -mt-4 bg-blue-200 pt-3">
        <Avatar
          shape="circle"
          style={{ width: "250px", height: "250px", marginLeft: "2rem " }}
        />
      </div>
      <div style={{ marginTop: "7rem", marginLeft: "2rem" }}>
        <h1>Raj Patoliya</h1>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Card title="Information" style={{ width: "45rem" }} header="">
          <p className="m-0">
            <span>
              <i className="pi pi-envelope"></i> Email
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
                <div className="text-red-800">{formik.errors.newPassword}</div>
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
        <Card title="Worked on" className="w-50 mr-3">
          <Card className="mt-3"></Card>
        </Card>
        <Card title="Place you work" className="w-50">
          <Card className="mt-3"></Card>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
