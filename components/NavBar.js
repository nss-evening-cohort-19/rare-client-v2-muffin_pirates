/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Rare</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>All Posts</Nav.Link>
            </Link>
            <Link passHref href={`/Posts/user/${user.id}`}>
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/Categories/categories">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/Tags">
              <Nav.Link>Tag Manager</Nav.Link>
            </Link>
            <Link passHref href="/User">
              <Nav.Link>User Manager</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
