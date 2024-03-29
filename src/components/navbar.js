import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { useLocation } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  padding: 0.5rem 3rem 0.5rem 0rem;
  transition: 0.1s;
  font-size: 28px;
  color: ${({ theme }) => theme.primaryDark};
  font-weight: 500;
  &:hover {
    text-decoration: none !important;
    color: ${({ theme }) => theme.orange};
  }
  &.active {
    color: ${({ theme }) => theme.orange};
  }

  @media (max-width: 450px) {
    padding: 0.5rem 2rem 0.5rem 0rem;
  }
`;

const ShipNavbar = () => {
  const location = useLocation();

  return (
    <Navbar
      expand="lg"
      style={{
        zIndex: 69,
        padding: "1.5rem 1rem",
        backgroundColor:
          location.pathname === "/faq" || location.pathname === "/login"
            ? "transparent"
            : "#F6EBFF",
      }}
    >
      <Navbar.Brand as={Link} to="/faq" style={{ marginLeft: "1rem" }}>
        <img src={Logo} height={40} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <StyledNavLink to="/faq">about</StyledNavLink>
          <StyledNavLink to="/leaderboard">leaderboard</StyledNavLink>
          <StyledNavLink to="/ship">ship!</StyledNavLink>
          <StyledNavLink to="/profile">my matches</StyledNavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ShipNavbar;

// <FiUser size={23} />
