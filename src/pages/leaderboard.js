import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  const [userVal, setUserVal] = useState(false);
  const [filteredShips, setFilteredShips] = useState(ships);

  const fetchSortInfo = useCallback(async () => {
    // Fetch ship info
    let fetchedShips = await fetchShips();
    fetchedShips.sort(sortFunc);
    dispatch(SET_VAL("ships", fetchedShips));
    // Fetch user info
    let fetchedUser = await fetchUser();
    setUserVal(fetchedUser);
  }, [dispatch]);

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);

      // Fetch ships and user info
      fetchSortInfo();

      setIsLoading(false);
    };
    onMount();
  }, [fetchSortInfo, dispatch]);

  useEffect(() => {
    const filtered = ships.filter((ship) => {
      return (
        ship.userNames[0].toLowerCase().includes(searchText) ||
        ship.userNames[1].toLowerCase().includes(searchText)
      );
    });
    setFilteredShips(filtered);
  }, [searchText, ships]);

  const ncol = 2;
  const items = useMemo(() => {
    const temp_items = [];
    for (let i = 0; i < filteredShips.length; i += ncol) {
      const temp_row = [];
      for (let j = i; j < Math.min(filteredShips.length, i + ncol); j++) {
        const ship = filteredShips[j];
        temp_row.push(
          <VoteCard
            ship={ship}
            userVotes={userVal.votes}
            key={ship._id}
            rerender={fetchSortInfo}
          />
        );
      }
      temp_items.push(
        <Row className="mx-auto justify-content-center">{temp_row}</Row>
      );
    }
    return temp_items;
  }, [fetchSortInfo, filteredShips, userVal.votes]);

  console.log(items);

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
          {items}
        </div>
      )}
    </Col>
  );
};

export default Leaderboard;
