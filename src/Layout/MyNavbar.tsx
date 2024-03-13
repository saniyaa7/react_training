import React from "react";
import { Navbar ,Container,Nav} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MyNavbar()
{
  const navigate = useNavigate();


  const handleItemClick = (route:string) => {
    navigate(route)
  }

  return(<div>
       <Navbar bg="secondary" data-bs-theme="dark">
        <Container>
        <Nav className="me-auto d-flex justify-content-between w-25 ">
            <Nav.Item onClick={()=>{handleItemClick('/')}}>HOME</Nav.Item>
            <Nav.Item onClick={()=>{handleItemClick('/todo-add')}}>ADD TASK</Nav.Item>
            <Nav.Item onClick={()=>{handleItemClick('/complete-task')}}>COMPLETED TASK</Nav.Item>

          
            </Nav>
          
          
        </Container>
      </Navbar>

  </div>)

}
export default MyNavbar;