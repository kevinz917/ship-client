import React from "react";
import styled from "styled-components";
import AsyncSelect from "react-select/async";
import { StyledSelect } from "../global_styles/select";
import { Row } from "react-bootstrap";
import { DeleteMarker } from "../global_styles/other";
import { VscLoading } from "react-icons/vsc";

const BlackHeader = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.text[0]};
  font-size: 24px;
`;

const StyledShipBox = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.surface[1]};
  border: 2.5px solid black;
  padding: 20px;
  margin: 6px 0px;
`;

const Shipcard = (props) => {
  const { masterList, studentList, idx, deleteShip, setName } = props;

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

  if (!studentList) {
    return null;
  }

  return (
    <StyledShipBox className="fade-in">
      <div className="w-100 h-100">
        <div onClick={() => deleteShip(idx)} className="mb-1">
          <DeleteMarker>✖</DeleteMarker>
        </div>
        <Row className="mx-auto">
          <BlackHeader className="mr-2">I want</BlackHeader>
          <div className="flex-grow-1">
            <AsyncSelect
              loadOptions={loadOptions}
              placeholder="first student"
              autoFocus
              onChange={(e) => {
                if (e) setName(idx, 0, { value: e.value, label: e.label });
                else setName(idx, 0, null);
              }}
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
              onChange={(e) => {
                if (e) setName(idx, 1, { value: e.value, label: e.label });
                else setName(idx, 1, null);
              }}
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
  );
};

export default Shipcard;
