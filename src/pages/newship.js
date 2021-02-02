import React, { useState, useEffect } from "react";
import { Header2, SubtitleMain } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { Row } from "react-bootstrap";
import { fetchStudents, fetchShips, fetchUser } from "../api/user";
import { saveShips } from "../api/ship";
import Shipcard from "../components/ShipCard";
import { Spinner } from "../components/LoadingSpinner";
import { NewshipContainer } from "../global_styles/other";
import Shipbanner from "../assets/shipbanner.png";
import { VscLoading } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "../redux/masterReducer";

const NewShip = () => {
  const dispatch = useDispatch();
  const studentList = useSelector((state) => state.state.students);
  const [masterList, setMasterList] = useState([[null, null]]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [ready, setReady] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);
      if (studentList.length === 0) {
        let fetchedStudentList = await fetchStudents();
        dispatch(SET_VAL("students", fetchedStudentList));
      }

      let fetchedShips = await fetchShips();
      setMasterList(fetchedShips);

      setIsLoading(false);
    };
    onMount();
  }, []);

  useEffect(() => {
    for (let i = 0; i < masterList.length; i++) {
      for (let j = 0; j < masterList[i].length; j++) {
        if (!masterList[i][j]) {
          setReady(false);
          return;
        }
      }
    }
    setReady(true);
  }, [masterList]);

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
    setIsSaving(true);
    await saveShips(masterList);
    setIsSaving(false);
  };

  // <HeaderBlock />

  return (
    <div
      style={{ maxWidth: "700px", padding: "10px" }}
      className="ml-auto mr-auto mt-lg-4 mt-1 fade-in"
    >
      <img src={Shipbanner} alt="Ship banner" style={{ maxWidth: "100%" }} />
      <div className="ml-auto mr-auto mt-lg-4 mt-2 text-center">
        <Header2>Create your ships </Header2>
        <SubtitleMain>Up to 3 pairs</SubtitleMain>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <NewshipContainer>
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
          {ready && (
            <MainBtn primary width="100%" onClick={submitShip}>
              {isSaving ? (
                <VscLoading
                  size={20}
                  className="rotate-fast"
                  style={{ color: "white" }}
                />
              ) : (
                "Save"
              )}
            </MainBtn>
          )}
        </NewshipContainer>
      )}
    </div>
  );
};

export default NewShip;
