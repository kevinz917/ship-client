import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AsyncSelect from "react-select/async";
import { StyledSelect } from "../global_styles/select";
import { Row } from "react-bootstrap";

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

const Shipcard = (props) => {
  const { studentList } = props;

  const [student1, setStudent1] = useState();
  const [student2, setStudent2] = useState();

  const filterStudents = (inputValue) => {
    return studentList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterStudents(inputValue));
    }, 1000);
  };

  const onInputChange = (setFunc) => (e) => {
    if (!e) setFunc(e);
    else setFunc({ value: e.value, label: e.label });
  };

  if (!studentList) {
    return null;
  }

  return (
    <div>
      <StyledShipBox>
        <Row className="mx-auto">
          <BlackHeader className="mr-2">I want</BlackHeader>
          <div className="flex-grow-1">
            <AsyncSelect
              loadOptions={loadOptions}
              placeholder="Student 1"
              autoFocus
              onChange={onInputChange(setStudent1)}
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
              onChange={onInputChange(setStudent2)}
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
    </div>
  );
};

export default Shipcard;
