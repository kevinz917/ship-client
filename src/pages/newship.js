import React, { useState, useEffect } from "react";
import { Header2 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import { fetchStudents } from "../api/user";
import { addShip } from "../api/ship";
import Shipcard from "../components/ShipCard";
import { Spinner } from "../components/LoadingSpinner";

const NewShip = () => {
  const [studentList, setStudentList] = useState();
  const [masterList, setMasterList] = useState([[null, null]]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);
      let fetchedStudentList = await fetchStudents();
      setStudentList(fetchedStudentList);
      setIsLoading(false);

      // fetch saved ships from user
    };
    onMount();
  }, []);

  const addShip = () => {
    if (masterList.length === 3) return;
    setMasterList([...masterList, [null, null]]);
  };

  const deleteShip = (idx) => {
    let copy = [...masterList];
    copy.splice(idx, 1);
    setMasterList(copy);
  };

  const setName = (idx1, idx2, value) => {
    let copy = [...masterList];
    copy[idx1][idx2] = value;
    setMasterList(copy);
  };

  const submitShip = async () => {
    // let newShip = await addShip(student1.label, student2.label);
  };

  return (
    <div style={{ width: "500px" }} className="ml-auto mr-auto mt-4 fade-in">
      <Row className="mx-auto justify-content-center">
        <Header2>Create your ships </Header2>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ width: "400px" }} className="ml-auto mr-auto">
          <Row className="mx-auto mt-4 justify-content-center">
            {masterList.map((ship, idx) => (
              <Shipcard
                studentList={studentList}
                idx={idx}
                ship={ship}
                deleteShip={deleteShip}
                setName={setName}
                masterList={masterList}
              />
            ))}
          </Row>
          <br />
          <MainBtn secondary width="100%" onClick={addShip}>
            Add new ship
          </MainBtn>
          <MainBtn primary width="100%" onClick={submitShip}>
            Save
          </MainBtn>
        </div>
      )}
    </div>
  );
};

export default NewShip;
