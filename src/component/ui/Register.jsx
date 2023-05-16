import React, { useEffect, useRef, useState } from "react";
import "./register.css";
import LoginBackground from "../assets/images/backgrounds/Wavy_Tech-11_Single-10.jpg";
import { Form, Modal } from "react-bootstrap";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import Layout from "../layout/layout";
import Header from "../layout/header";
const Register = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .max(50, "Must be 50 characters or less")
        .required("Required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("profile", profile);
      console.log(formData);
      const { data } = await axios.post(
        "http://127.0.0.1:8000/user/create/",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      );
    },
  });
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(
    "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
  );
  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    const getImages = async () => {
      const { data } = await axios.get("http://127.0.0.1:8000/user/avtar/");
      const images = data.map((data) => {
        return data.image;
      });
      setImageArray(images);
    };
    getImages();
  }, []);
  useEffect(() => {
    console.log(imageArray);
  }, [imageArray]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Header />
      <div className="container" id="registration-form">
        <div
          className="image"
          style={{ backgroundImage: `url(${LoginBackground})` }}
        ></div>
        <div className="frm">
          <h1 className="text-center"> Sign Up Here</h1>
          <Form onSubmit={formik.handleSubmit}>
            <div>
              <div className="d-flex justify-content-center mb-4">
                <img
                  src={profile}
                  className="rounded-circle"
                  alt="example placeholder"
                  style={{ width: " 100px" }}
                  onClick={handleShow}
                />
                <br />
              </div>
              <p className="text-center">Change Profile Avtar</p>
            </div>
            <div className="row">
              <div className="col-12">
                <Form.Group className="mb-3">
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter Name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.fullName && formik.errors.fullName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
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
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password : </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create password"
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
              <div className="col-6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    value={formik.values.cpassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.cpassword && formik.errors.cpassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.cpassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select Avtar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="container">
              <div class="row">
                {imageArray.map((data) => (
                  <div key={data.id} class="col" onClick={() => {}}>
                    <img
                      key={data.id}
                      src={data}
                      title="Tap to select"
                      style={{ width: "100px" }}
                      alt="Cardcap"
                      onClick={() => {
                        setProfile(data);
                        handleClose();
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Register;
