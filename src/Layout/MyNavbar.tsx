import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "./MyNavbar.css";

function MyNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (route: string) => {
    navigate(route);
  };

  return (
    <div>
      <Navbar bg="secondary" data-bs-theme="light">
        <Container>
          <Nav className="me-auto d-flex justify-content-between w-25 ">
            <Nav.Item
              onClick={() => {
                handleItemClick("/");
              }}
              className={location.pathname === "/" ? "active" : ""}
            >
              HOME
            </Nav.Item>
            <Nav.Item
              onClick={() => {
                handleItemClick("/todo-add");
              }}
              className={location.pathname === "/todo-add" ? "active" : ""}
            >
              ADD TASK
            </Nav.Item>
            <Nav.Item
              onClick={() => {
                handleItemClick("/complete-task");
              }}
              className={location.pathname === "/complete-task" ? "active" : ""}
            >
              COMPLETED TASK
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default MyNavbar;
