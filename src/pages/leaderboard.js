import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Header1 } from "../global_styles/typography";
import { MainInput } from "../global_styles/other";
import { fetchShips } from "../api/ship";
import VoteCard from "../components/VoteCard";
import { Spinner } from "../components/LoadingSpinner";
import { SET_VAL } from "../redux/masterReducer";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../api/user";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";

const sortFunc = (a, b) => {
  return a.votes > b.votes ? -1 : 1;
};

const Leaderboard = () => {
  const dispatch = useDispatch();
  const ships = useSelector((state) => state.state.ships);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userVal, setUserVal] = useState(false);

  const fetchSortShips = async () => {
    let fetchedShips = await fetchShips(searchText);
    fetchedShips.sort(sortFunc);
    dispatch(SET_VAL("ships", fetchedShips));
  };

  useEffect(() => {
    const onMount = async () => {
      setIsLoading(true);

      // Fetch ships
      fetchSortShips();

      // Fetch user info
      let fetchedUser = await fetchUser();
      setUserVal(fetchedUser);

      setIsLoading(false);
    };
    onMount();
  }, [searchText, dispatch]);

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
                setSearchText(e.target.value);
              }}
            />
          </Row>
          <Row className="mx-auto mt-4 justify-content-center">
            <div className="mx-auto" style={{ width: "700px" }}>
              <Row className="mx-auto justify-content-center">
                {ships.map((ship, index) => (
                  <VoteCard
                    ship={ship}
                    userVotes={userVal.votes}
                    key={ship._id}
                    rerender={fetchSortShips}
                  />
                ))}
              </Row>
            </div>
          </Row>
        </div>
      )}
    </Col>
  );
};

export default Leaderboard;
