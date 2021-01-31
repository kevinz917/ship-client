import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  padding: 0.5rem 1rem 0.5rem 0rem;
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
`;

const ShipNavbar = () => {
  return (
    <Navbar expand="md" className="shadow-sm px-3">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="d-flex justify-content-end">
        <StyledNavLink to="/leaderboard">Leaderboard</StyledNavLink>
        <StyledNavLink to="/ship">Ship</StyledNavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ShipNavbar;
