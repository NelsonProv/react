import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isActive, setIsActive] = useState(0);
  const [email, setEmail] = useState(0);
  const [editID, setEditID] = useState('');
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editIsActive, setEditIsActive] = useState(0);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get('http://localhost:5276/api/Employee')
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    handleShow();
    axios.get(`http://localhost:5276/api/Employee/${id}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditAge(result.data.age);
        setEditIsActive(result.data.isActive);
        setEditID(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete employee?") === true) {
      axios.delete(`http://localhost:5276/api/Employee/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success('Employee deleted!');
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `http://localhost:5276/api/Employee/${editID}`;
    const data = {
      id: editID,
      name: editName,
      age: editAge,
      isActive: editIsActive
    };

    axios.put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success('Employee updated!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = 'http://localhost:5276/api/Employee';
    const data = {
      name: name,
      age: age,
      isActive: isActive,
      email: email
    };

    axios.post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success('Employee created!');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const sendEmail = (id) => {
    // Implement your email sending logic here
    // You can use axios or any other library to send the email
    // For example:
    axios.post(`http://localhost:5276/api/Employee/email/${id}`)
      .then((result) => {
        // Handle success response
        toast.success("Email sent!");
      })
      .catch((error) => {
        // Handle error response
        toast.error("Failed to send email");
        console.log(error);
      });
  };

  const clear = () => {
    setName('');
    setAge('');
    setIsActive(0);
    setEditName('');
    setEditAge('');
    setEditIsActive(0);
    setEditID('');
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditIsActive(1);
    } else {
      setEditIsActive(0);
    }
  };

  const handleLogout = () => {
    // Perform any necessary logout actions (e.g., clearing session data, etc.)
    // Redirect the user to the login page
    navigate('/Registration');
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive === 1 ? true : false}
              onChange={(e) => handleActiveChange(e)}
              value={isActive}
            />
          </Col>
          {/* <button className="btn btn-primary" onClick={handleLogout}>
        Log out
      </button> */}
          <Col>
            <button className="btn btn-primary" onClick={handleSave}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: '20px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>isActive</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                    <td>{item.isActive}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-success"
                        onClick={() => sendEmail(item.id)}
                      >
                        Send Email
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Age"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="checkbox"
                  checked={editIsActive === 1 ? true : false}
                  onChange={(e) => handleEditActiveChange(e)}
                  value={editIsActive}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    </Fragment>
  );
};

export default CRUD;
