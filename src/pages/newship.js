import React, { useState, useEffect } from "react";
import { Header2, Body, SubtitleMain } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { Row } from "react-bootstrap";
import { HeaderBlock } from "../global_styles/other";
import { fetchStudents, fetchShips } from "../api/user";
import { saveShips } from "../api/ship";
import Shipcard from "../components/ShipCard";
import { Spinner } from "../components/LoadingSpinner";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const NewShip = () => {
  const [studentList, setStudentList] = useState();
  const [masterList, setMasterList] = useState([[null, null]]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);
      let fetchedStudentList = await fetchStudents();
      setStudentList(fetchedStudentList);
      let fetchedShips = await fetchShips();

      setMasterList(fetchedShips);
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
    await saveShips(masterList);
  };

  return (
    <div style={{ width: "700px" }} className="ml-auto mr-auto mt-4 fade-in">
      <HeaderBlock />
      <br />
      <div className="ml-auto mr-auto text-center">
        <Header2>Create your ships </Header2>
        <SubtitleMain>Up to 3 pairs</SubtitleMain>
      </div>
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
