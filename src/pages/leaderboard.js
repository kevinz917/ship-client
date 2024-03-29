import React, { useEffect, useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Header2 } from "../global_styles/typography";
import { MainInput } from "../global_styles/other";
import { fetchShips, removeShip } from "../api/ship";
import VoteCard from "../components/VoteCard";
import { Spinner } from "../components/LoadingSpinner";
import { SET_VAL } from "../redux/masterReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../api/user";
import { List, WindowScroller, AutoSizer } from "react-virtualized";
import { isMobile } from "react-device-detect";
import { sendAmplitudeData } from "../util/amplitude";
import Select from "react-select";
import { StyledSelect } from "../global_styles/select";
import { HiOutlineRefresh } from "react-icons/hi";

import styled from "styled-components";

const StyledRefresh = styled.span`
  cursor: pointer;
  transition: transform 0.5s;
  color: ${({ theme }) => theme.orange};
  &:hover {
    transform: rotate(-180deg);
  }
`;

const sortFunc = (a, b) => {
  const a_votes = a.votes + 10 * ((a.shippers ? a.shippers : 1) - 1);
  const b_votes = b.votes + 10 * ((b.shippers ? b.shippers : 1) - 1);
  return a_votes > b_votes ? -1 : 1;
};

const colleges = [
  { label: "Benjamin Franklin", value: "New kids suck" },
  { label: "Branford", value: "Shittiest dining hall" },
  { label: "Ezra Stiles", value: "Kevin the goat" },
  { label: "Jonathan Edwards", value: "Alright college ig" },
  { label: "Pauli Murray", value: "New kids suck" },
  { label: "Saybrook", value: "Suck at intramurals" },
  { label: "Timothy Dwight", value: "Fucking GOATED" },
  { label: "Berkeley", value: "Nice pizza ig" },
  { label: "Davenport", value: "Got hella friends here" },
  { label: "Grace Hopper", value: "Forgot this college existed" },
  { label: "Morse", value: "Harshal the goat" },
  { label: "Pierson", value: "L dub sucks ass" },
  { label: "Silliman", value: "Inferior TD" },
  { label: "Trumbull", value: "Late lunches ftw" },
];

const years = [
  { label: "2021", value: "old ppl" },
  { label: "2022", value: "juniors r cool" },
  { label: "2023", value: "kool kids" },
  { label: "2024", value: "scum freshman and '23 traitors" },
];

const Leaderboard = () => {
  const dispatch = useDispatch();
  const ships = useSelector((state) => state.state.ships);
  const [userEmail, setUserEmail] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userVotes, setUserVotes] = useState([]);
  const [shipInfo, setShipInfo] = useState([]);
  const [filteredShips, setFilteredShips] = useState(ships);
  const [selectedCollege, setSelectedCollege] = useState();
  const [selectedYear, setSelectedYear] = useState();

  const handleVote = useCallback(
    (id) => {
      let temp = [...userVotes];
      const indx = temp.indexOf(id);
      if (indx > -1) {
        temp.splice(indx, 1);
      } else temp.push(id);
      setUserVotes(temp);
    },
    [userVotes]
  );

  const updateShip = useCallback(
    (indx, change) => {
      let temp = [...shipInfo];
      temp[indx].votes += change;
      temp.sort(sortFunc);
      setShipInfo(temp);
      dispatch(SET_VAL("ships", temp));
    },
    [dispatch, shipInfo]
  );

  const deleteShip = useCallback(
    async (shipId, indx) => {
      // remove from shipList
      let temp = [...shipInfo];
      temp.splice(indx, 1);
      temp.sort(sortFunc);
      setShipInfo(temp);
      dispatch(SET_VAL("ships", temp));

      await removeShip(shipId);
    },
    [dispatch, shipInfo]
  );

  const onMount = useCallback(async () => {
    setIsLoading(true);
    sendAmplitudeData("visit_leaderboard");
    // Fetch ships info
    let fetchedShips = await fetchShips();
    fetchedShips.sort(sortFunc);
    setShipInfo(fetchedShips);
    dispatch(SET_VAL("ships", fetchedShips));

    // Fetch user info
    let fetchedUser = await fetchUser();
    setUserEmail(fetchedUser.email);
    setUserVotes(fetchedUser.votes);
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    onMount();
  }, [dispatch, onMount]);

  useEffect(() => {
    const filtered = shipInfo.filter((ship) => {
      return (
        (ship.userNames[0].toLowerCase().includes(searchText) ||
          ship.userNames[1].toLowerCase().includes(searchText)) &&
        (ship.userLabels[0]
          .toLowerCase()
          .includes(
            selectedCollege ? selectedCollege.label.toLowerCase() : ""
          ) ||
          ship.userLabels[1]
            .toLowerCase()
            .includes(
              selectedCollege ? selectedCollege.label.toLowerCase() : ""
            )) &&
        (ship.userLabels[0].includes(
          selectedYear ? selectedYear.label.slice(-2) : ""
        ) ||
          ship.userLabels[1].includes(
            selectedYear ? selectedYear.label.slice(-2) : ""
          ))
      );
    });

    setFilteredShips(filtered);
  }, [searchText, shipInfo, selectedCollege, selectedYear]);

  let ncol = 2;

  if (isMobile) {
    ncol = 1;
  }

  const renderRow = useCallback(
    ({ index, key, style }) => {
      const temp_row = [];
      for (
        let j = index * ncol;
        j < Math.min(filteredShips.length, (index + 1) * ncol);
        j++
      ) {
        const ship = filteredShips[j];
        temp_row.push(
          <VoteCard
            ship={ship}
            userVotes={userVotes}
            handleVote={handleVote}
            updateShip={updateShip}
            key={ship._id}
            indx={j}
            disabled={false}
            userEmail={userEmail}
            deleteShip={deleteShip}
          />
        );
      }
      return (
        <div key={key} style={style}>
          <Row className="mx-auto justify-content-center">{temp_row}</Row>
        </div>
      );
    },
    [
      filteredShips,
      handleVote,
      updateShip,
      userVotes,
      ncol,
      userEmail,
      deleteShip,
    ]
  );

  return (
    <Col
      className="w-100"
      style={{
        padding: "10px",
        backgroundColor: "#f6ebff",
        minHeight: "100vh",
      }}
    >
      <Row className="mx-auto justify-content-center">
        <Header2 className="d-flex">Leaderboard ✌️ </Header2>
      </Row>
      <Row className="mx-auto justify-content-center">
        Refresh{" "}
        <StyledRefresh className="my-auto ml-2" onClick={onMount}>
          <HiOutlineRefresh style={{ display: "block" }} />
        </StyledRefresh>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="fade-in">
          <Row className="mx-auto mt-3 justify-content-center">
            <MainInput
              placeholder="Search friends' names, etc..."
              onChange={(e) => {
                setSearchText(e.target.value.toLowerCase());
              }}
              onClick={() => sendAmplitudeData("click_filter")}
            />
          </Row>
          <Row className="mx-auto justify-content-center mt-1">
            <div style={{ width: "350px", maxWidth: "400px" }}>
              Showing {filteredShips.length} results...
            </div>
          </Row>
          <Row className="mx-auto my-4 justify-content-center">
            <div style={{ width: "200px", maxWidth: "200px" }} className="mr-2">
              <Select
                options={colleges}
                isClearable={true}
                value={selectedCollege}
                onChange={(college) => {
                  setSelectedCollege(college);
                }}
                placeholder="Res College..."
                styles={StyledSelect}
              />
            </div>
            <div style={{ width: "100px", maxWidth: "100px" }}>
              <Select
                options={years}
                isClearable={true}
                value={selectedYear}
                onChange={(year) => {
                  setSelectedYear(year);
                }}
                placeholder="Grad Year..."
                styles={StyledSelect}
              />
            </div>
          </Row>
          <WindowScroller>
            {({ height, isScrolling, onChildScroll, scrollTop }) => (
              // Make infinite list take up 100% of its container
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    autoHeight
                    width={width}
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowCount={Math.ceil(filteredShips.length / ncol)}
                    rowHeight={147}
                    rowRenderer={renderRow}
                    style={{ outline: "none" }}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        </div>
      )}
    </Col>
  );
};

export default Leaderboard;
