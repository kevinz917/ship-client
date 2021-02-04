import React, { useEffect, useState, useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { Header1 } from "../global_styles/typography";
import { MainInput } from "../global_styles/other";
import { fetchShips } from "../api/ship";
import VoteCard from "../components/VoteCard";
import { Spinner } from "../components/LoadingSpinner";
import { SET_VAL } from "../redux/masterReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../api/user";
import { List, WindowScroller, AutoSizer } from "react-virtualized";
import { isMobile } from "react-device-detect";
import { sendAmplitudeData } from "../util/amplitude";
import Select from "react-select";

const sortFunc = (a, b) => {
  return a.votes > b.votes ? -1 : 1;
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

const Leaderboard = () => {
  sendAmplitudeData("visit_leaderboard");
  const dispatch = useDispatch();
  const ships = useSelector((state) => state.state.ships);
  const [userEmail, setUserEmail] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userVotes, setUserVotes] = useState([]);
  const [shipInfo, setShipInfo] = useState([]);
  const [filteredShips, setFilteredShips] = useState(ships);
  const [selectedCollege, setSelectedCollege] = useState();

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

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);

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
    };
    onMount();
  }, [dispatch]);

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
            ))
      );
    });

    setFilteredShips(filtered);
  }, [searchText, shipInfo, selectedCollege]);

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
          />
        );
      }
      return (
        <div key={key} style={style}>
          <Row className="mx-auto justify-content-center">{temp_row}</Row>
        </div>
      );
    },
    [filteredShips, handleVote, updateShip, userVotes, ncol, userEmail]
  );

  return (
    <Col className="p-0 fade-in w-100">
      <Row className="mx-auto justify-content-center mt-lg-5 mt-3">
        <Header1>Leaderboard ✌️</Header1>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Row className="mx-auto mt-3 justify-content-center">
            <MainInput
              placeholder="Search friends' names, etc..."
              onChange={(e) => {
                setSearchText(e.target.value.toLowerCase());
              }}
              onClick={() => sendAmplitudeData("click_filter")}
            />
          </Row>
          <Row className="mx-auto my-4 justify-content-center">
            <div style={{ width: "250px", maxWidth: "250px" }}>
              <Select
                options={colleges}
                isClearable={true}
                value={selectedCollege}
                onChange={(college) => {
                  setSelectedCollege(college);
                }}
                placeholder="Select a res college..."
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
                    rowHeight={156}
                    rowRenderer={renderRow}
                    style={{ outline: "none" }}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
          {/* {items} */}
        </div>
      )}
    </Col>
  );
};

export default Leaderboard;

// // CHANGE LAUNCH DATE
// let launchDateStr = "01-Jan-2021";
// var launchDate = new Date(Date.parse(launchDateStr.replace(/-/g, " ")));

// if (launchDate >= new Date()) {
//   return (
//     <div className="w-100 d-flex flex-column align-items-center mt-lg-5 mt-3">
//       <Header1>Coming soon ✌️</Header1>
//     </div>
//   );
// }
