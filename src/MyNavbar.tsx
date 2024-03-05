import React from "react";
import { Navbar ,Container,Nav} from "react-bootstrap";

function MyNavbar()
{
  return(<div>
       <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Brand href="/todo-add">Add Todo</Navbar.Brand>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          
        </Container>
      </Navbar>

  </div>)

}
export default MyNavbar;