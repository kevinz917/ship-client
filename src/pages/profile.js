import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Header3 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { fetchUser, TogglePrivacy } from "../api/user";
import { fetchMyShips } from "../api/ship";
import { Body } from "../global_styles/typography";
import { Spinner } from "../components/LoadingSpinner";
import Votecard from "../components/VoteCard";
import { sendAmplitudeData } from "../util/amplitude";

const Profile = () => {
  sendAmplitudeData("visit_profile");

  const [userInfo, setUserInfo] = useState({ privacy: null });
  const [isLoading, setIsloading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [myShips, setMyShips] = useState([]);

  const info = {
    private: "Others will not be able to vote on ships that includes you",
    public: "Others can vote on ships that include you",
  };

  useEffect(() => {
    const onMount = async () => {
      setIsloading(true);
      let fetchedUser = await fetchUser();
      setUserInfo(fetchedUser);

      let fetchedShips = await fetchMyShips();
      setMyShips(fetchedShips);

      setIsloading(false);
    };

    onMount();
  }, []);

  const togglePrivacy = async () => {
    setIsChanging(true);
    if (userInfo.privacy === "public") {
      sendAmplitudeData("toggle_private");
      await TogglePrivacy("private");
    } else if (userInfo.privacy === "private") {
      sendAmplitudeData("toggle_public");
      await TogglePrivacy("public");
    }
    let fetchedUser = await fetchUser();
    setUserInfo(fetchedUser);
    setIsChanging(false);
  };

  const Logout = () => {
    sendAmplitudeData("log_out");
    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    // Redirect to home page and refresh as well
    window.location.pathname = "/";
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div
        style={{ maxWidth: "500px" }}
        className="ml-auto mr-auto mt-4 fade-in"
      >
        <div style={{ padding: "10px" }} className="w-100">
          <Header3 className="mb-2">My ships</Header3>
        </div>
      </div>
      <Row className="mx-auto justify-content-center">
        <div style={{ width: "900px", maxWidth: "900px" }}>
          <Row className="mx-auto justify-content-center">
            {myShips.map((ship, idx) => (
              <Votecard ship={ship} disabled={true} />
            ))}
          </Row>
        </div>
      </Row>
      <div style={{ maxWidth: "500px" }} className="ml-auto mr-auto fade-in">
        <div style={{ padding: "10px" }} className="w-100">
          <hr />
          <Header3 className="mb-2">My profile</Header3>
          <Body>Privacy setting: {info[userInfo.privacy]}</Body>
          {isChanging ? (
            <Spinner />
          ) : (
            <MainBtn secondary onClick={() => togglePrivacy()}>
              {userInfo.privacy === "public"
                ? "Toggle to private"
                : userInfo.privacy === "private"
                ? "Toggle to public"
                : null}
            </MainBtn>
          )}
          <br />
          <MainBtn primary onClick={Logout}>
            Log out
          </MainBtn>
        </div>
      </div>
    </>
  );
};

export default Profile;
