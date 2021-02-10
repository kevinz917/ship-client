import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";

const StyledNavLink = styled(NavLink)`
  padding: 0.5rem 3rem 0.5rem 0rem;
  transition: 0.1s;
  color: ${({ theme }) => theme.text[1]};
  font-weight: 500;
  &:hover {
    text-decoration: none !important;
    color: ${({ theme }) => theme.text[0]};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 450px) {
    padding: 0.5rem 2rem 0.5rem 0rem;
  }
`;

const ShipNavbar = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm" sticky="top">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <StyledNavLink to="/leaderboard">Leaderboard 🔥 </StyledNavLink>
          <StyledNavLink to="/ship">Ship!</StyledNavLink>
          <StyledNavLink to="/profile">My Ships</StyledNavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ShipNavbar;

// <FiUser size={23} />
