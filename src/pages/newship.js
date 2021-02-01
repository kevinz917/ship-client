import React, { useState, useEffect } from "react";
import { Header1, Header3 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { Row, Collapse } from "react-bootstrap";
import styled from "styled-components";
import { fetchStudents } from "../api/user";
import { addShip } from "../api/ship";
import AsyncSelect from "react-select/async";
import { StyledSelect } from "../global_styles/select";
import Shipcard from "../components/ShipCard";

const BlackHeader = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text[0]};
  font-size: 24px;
`;

const StyledShipBox = styled.div`
  width: 400px;
  background-color: ${({ theme }) => theme.surface[1]};
  border-radius: 8px;
  padding: 16px;
`;

const NewShip = () => {
  const [studentList, setStudentList] = useState();
  const [student1, setStudent1] = useState();
  const [student2, setStudent2] = useState();
  useEffect(() => {
    const onMount = async () => {
      let fetchedStudentList = await fetchStudents();
      setStudentList(fetchedStudentList);
    };
    onMount();
  }, []);

  const submitShip = async () => {
    let newShip = await addShip(student1.label, student2.label);
  };

  return (
    <div style={{ width: "500px" }} className="ml-auto mr-auto mt-4">
      <Row className="mx-auto justify-content-center">
        <Header1>Create a new ship</Header1>
      </Row>
      <div style={{ width: "400px" }} className="ml-auto mr-auto">
        <Row className="mx-auto mt-4 justify-content-center">
          <Shipcard studentList={studentList} />
        </Row>
        <br />
        <MainBtn primary style={{ width: "100%" }} onClick={submitShip}>
          Add new ship
        </MainBtn>
        <Row className="mx-auto mt-3 justify-content-center">
          {student1 && student2 && (
            <div
              className="d-flex justify-content-center"
              style={{ width: "400px" }}
            >
              <MainBtn primary style={{ width: "100%" }} onClick={submitShip}>
                Save
              </MainBtn>
            </div>
          )}
        </Row>
      </div>
    </div>
  );
};

export default NewShip;
