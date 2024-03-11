import React from "react";
import { Navbar ,Container,Nav} from "react-bootstrap";

function MyNavbar()
{
  return(<div>
       <Navbar bg="secondary" data-bs-theme="dark">
        <Container>
        <Nav className="me-auto"> 
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/todo-add">ADD TASK</Nav.Link>
            <Nav.Link href="/complete-task">COMPLETED TASK</Nav.Link></Nav>
          
          
        </Container>
      </Navbar>

  </div>)

}
export default MyNavbar;