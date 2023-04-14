import React, { useEffect, useState } from "react";
import "./register.css";
import { Button, Form, Modal } from "react-bootstrap";
import ImageCard from "../assets/images/Profiles/Screenshot from 2023-04-14 11-17-36.png";
import axios from "axios";
const Register = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(
    "https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
  );
  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    const getImages = async () => {
      const { data } = await axios.get("http://127.0.0.1:8000/user/avtar/");
      console.log(data);
      const images = data.map((data) => {
        return data.image;
      });
      console.log(images);
      setImageArray(images);
    };
    getImages();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = async () => setShow(true);

  return (
    <div className="container" id="registration-form">
      <div className="image"></div>
      <div className="frm">
        <h1 className="text-center"> Register Here</h1>
        <Form>
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
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Create Password</Form.Label>
                <Form.Control type="password" placeholder="Create Password" />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" />
              </Form.Group>
            </div>
          </div>
          <Form.Group
            className="mb-3 text-center"
            controlId="formBasicPassword"
          >
            <Button variant="primary" className="w-50">
              Submit
            </Button>
          </Form.Group>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Select Avtar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class="container">
                <div class="row">
                  {imageArray.map((data) => (
                    <div class="col" onClick={() => {}}>
                      <img
                        src={data}
                        title="Double Tab to select"
                        style={{ width: "100px" }}
                        alt="Cardcap"
                        onDoubleClick={() => {
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
        </Form>
      </div>
    </div>
  );
};

export default Register;
