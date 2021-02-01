import React, { useState, useEffect } from "react";
import { Header1, Header3 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { Row, Collapse } from "react-bootstrap";
import styled from "styled-components";
import { fetchStudents } from "../api/user";
import { addShip } from "../api/ship";
import AsyncSelect from "react-select/async";
import { StyledSelect } from "../global_styles/select";

const BlackHeader = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text[0]};
  font-size: 26px;
`;

const StyledShipBox = styled.div`
  width: 400px;
  background-color: ${({ theme }) => theme.surface[1]};
  border-radius: 8px;
  padding: 16px;
`;

const NewShip = () => {
  const [students, setStudents] = useState();
  const [student1, setStudent1] = useState();
  const [student2, setStudent2] = useState();
  useEffect(() => {
    const onMount = async () => {
      let studentList = await fetchStudents();
      setStudents(studentList);
    };
    onMount();
  }, []);

  const filterStudents = (inputValue) => {
    return students.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterStudents(inputValue));
    }, 1000);
  };

  const onInputChange1 = (e) => {
    if (!e) setStudent1(null);
    else setStudent1({ value: e.value, label: e.label });
  };

  const onInputChange2 = (e) => {
    if (!e) setStudent2(null);
    else setStudent2({ value: e.value, label: e.label });
  };

  const submitShip = async () => {
    let newShip = await addShip(student1.label, student2.label);
  };

  return (
    <div style={{ width: "500px" }} className="ml-auto mr-auto mt-4">
      <Row className="mx-auto justify-content-center">
        <Header1>Create a new ship</Header1>
      </Row>
      <Row className="mx-auto mt-4 justify-content-center">
        <StyledShipBox>
          <Row className="mx-auto">
            <BlackHeader className="mr-2">I want</BlackHeader>
            <div className="flex-grow-1">
              <AsyncSelect
                loadOptions={loadOptions}
                placeholder="Student 1"
                autoFocus
                onChange={onInputChange1}
                isClearable={true}
                value={
                  student1
                    ? {
                        value: student1.value,
                        label: student1.label,
                      }
                    : null
                }
                styles={StyledSelect}
              />
            </div>
          </Row>
          <Row className="mx-auto mt-1">
            <BlackHeader className="mr-2">and</BlackHeader>
            <div className="flex-grow-1">
              <AsyncSelect
                loadOptions={loadOptions}
                placeholder="Student 2"
                autoFocus
                onChange={onInputChange2}
                isClearable={true}
                value={
                  student2
                    ? {
                        value: student2.value,
                        label: student2.label,
                      }
                    : null
                }
                styles={StyledSelect}
              />
            </div>
          </Row>
          <Row className="mx-auto mt-1">
            <BlackHeader>to be shipped.</BlackHeader>
          </Row>
        </StyledShipBox>
      </Row>
      <Row className="mx-auto mt-3 justify-content-center">
        {student1 && student2 && (
          <div
            className="d-flex justify-content-center"
            style={{ width: "400px" }}
          >
            <MainBtn primary style={{ width: "100%" }} onClick={submitShip}>
              Submit
            </MainBtn>
          </div>
        )}
      </Row>
    </div>
  );
};

export default NewShip;
