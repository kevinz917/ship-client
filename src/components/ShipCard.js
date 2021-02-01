import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AsyncSelect from "react-select/async";
import { StyledSelect } from "../global_styles/select";
import { Row } from "react-bootstrap";
import { DeleteMarker } from "../global_styles/other";

const BlackHeader = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text[0]};
  font-size: 24px;
`;

const StyledShipBox = styled.div`
  width: 400px;
  background-color: ${({ theme }) => theme.surface[1]};
  border-radius: 8px;
  padding: 20px;
  margin: 6px 0px;
`;

const Shipcard = (props) => {
  const { masterList, studentList, idx, deleteShip, setName } = props;

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
    <div className="fade-in">
      <StyledShipBox>
        <div className="w-100 h-100">
          <Row className="w-100" onClick={() => deleteShip(idx)}>
            <DeleteMarker className="float-right">✖️</DeleteMarker>
          </Row>
          <Row className="mx-auto ">
            <BlackHeader className="mr-2">I want</BlackHeader>
            <div className="flex-grow-1">
              <AsyncSelect
                loadOptions={loadOptions}
                placeholder="first student"
                autoFocus
                onChange={(e) =>
                  setName(idx, 0, { value: e.value, label: e.label })
                }
                isClearable={true}
                value={masterList[idx][0]}
                styles={StyledSelect}
              />
            </div>
          </Row>
          <Row className="mx-auto mt-1">
            <BlackHeader className="mr-2">and</BlackHeader>
            <div className="flex-grow-1">
              <AsyncSelect
                loadOptions={loadOptions}
                placeholder="second student"
                autoFocus
                onChange={(e) =>
                  setName(idx, 1, { value: e.value, label: e.label })
                }
                isClearable={true}
                value={masterList[idx][1]}
                styles={StyledSelect}
              />
            </div>
          </Row>
          <Row className="mx-auto mt-1">
            <BlackHeader>to be shipped.</BlackHeader>
          </Row>
        </div>
      </StyledShipBox>
    </div>
  );
};

export default Shipcard;