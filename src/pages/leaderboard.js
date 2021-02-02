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

const sortFunc = (a, b) => {
  return a.votes > b.votes ? -1 : 1;
};

const Leaderboard = () => {
  const dispatch = useDispatch();
  const ships = useSelector((state) => state.state.ships);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userVotes, setUserVotes] = useState([]);
  const [shipInfo, setShipInfo] = useState([]);
  const [filteredShips, setFilteredShips] = useState(ships);

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
      setUserVotes(fetchedUser.votes);
      setIsLoading(false);
    };
    onMount();
  }, [dispatch]);

  useEffect(() => {
    const filtered = shipInfo.filter((ship) => {
      return (
        ship.userNames[0].toLowerCase().includes(searchText) ||
        ship.userNames[1].toLowerCase().includes(searchText)
      );
    });
    setFilteredShips(filtered);
  }, [searchText, shipInfo]);

  const ncol = 2;

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
          />
        );
      }
      return (
        <div key={key} style={style}>
          <Row className="mx-auto justify-content-center">{temp_row}</Row>
        </div>
      );
    },
    [filteredShips, handleVote, updateShip, userVotes]
  );

  // CHANGE LAUNCH DATE
  let launchDateStr = "01-Jan-2021";
  var launchDate = new Date(Date.parse(launchDateStr.replace(/-/g, " ")));

  if (launchDate >= new Date()) {
    return (
      <div className="w-100 d-flex flex-column align-items-center mt-lg-5 mt-3">
        <Header1>Coming soon ✌️</Header1>
      </div>
    );
  }

  return (
    <Col className="p-0 fade-in w-100">
      <Row className="mx-auto justify-content-center mt-lg-5 mt-3">
        <Header1>Leaderboard ✌️</Header1>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <Row className="mx-auto mt-3 mb-4 justify-content-center">
            <MainInput
              placeholder="Search friends' names, etc..."
              onChange={(e) => {
                setSearchText(e.target.value.toLowerCase());
              }}
            />
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
