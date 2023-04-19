import React from "react";
import "./login.css";
import LoginBackground from "../assets/images/backgrounds/Wavy_Tech-28_Single-10.jpg";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
const Login = () => {
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
      const { data } = await axios.post(
        "http://127.0.0.1:8000/user/login/token/",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      );
      if (data.access) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        alert("Login Successfully Done");
      }
      if (data.error) {
        console.log("datta======", data.error);
      }
    },
  });
  return (
    <div className="container" id="registration-form">
      <div
        className="image"
        style={{ backgroundImage: `url(${LoginBackground})`, height: "26rem" }}
      ></div>
      <div className="frm">
        <h1 className="text-center"> Sign Up Here</h1>
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
                  placeholder="Create password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
