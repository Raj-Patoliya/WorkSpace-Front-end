import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import "./login.css";
import LoginBackground from "../assets/images/backgrounds/Wavy_Tech-28_Single-10.jpg";
import { Form } from "react-bootstrap";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../layout/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import Header from "../layout/header";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const toast = useRef(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .max(50, "Must be 50 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      dispatch(login(formData));
      navigate("/");
    },
  });
  useEffect(() => {
    const showError = () => {
      toast.current.show({
        severity: "error",
        summary: "Invalid Credential",
        detail: error,
        life: 3000,
      });
    };
    if (error) {
      showError();
    }
  }, [error]);
  return (
    <>
      <Toast ref={toast} />
      <Header />
      <div className="container" id="registration-form">
        <div
          className="image"
          style={{
            backgroundImage: `url(${LoginBackground})`,
            height: "26rem",
          }}
        ></div>
        <div className="frm">
          <h1 className="text-center"> Sign In Here</h1>
          <Form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password : </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
