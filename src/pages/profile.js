import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Header2 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { fetchUser, TogglePrivacy } from "../api/user";
import { fetchMyShips, removeShip } from "../api/ship";
import { Body } from "../global_styles/typography";
import { Spinner } from "../components/LoadingSpinner";
import Votecard from "../components/VoteCard";
import { sendAmplitudeData } from "../util/amplitude";
import { Formik, Field, Form } from "formik";
import { SaveAnswers } from "../api/user";
import styled from "styled-components";

import "../global_styles/other.css";
// import { COOKIE_DOMAIN } from "../util/base";

const StyledField = styled(Field)`
  @media (max-width: 450px) {
    width: 100% !important;
  }
`;

const sortFunc = (a, b) => {
  const a_votes = a.votes + 10 * ((a.shippers ? a.shippers : 1) - 1);
  const b_votes = b.votes + 10 * ((b.shippers ? b.shippers : 1) - 1);
  return a_votes > b_votes ? -1 : 1;
};

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
      fetchedShips.sort(sortFunc);
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

  const deleteShip = async (shipId, idx) => {
    // delete ship api
    console.log(myShips);
    let res = await removeShip(shipId);

    // remove from array
    let temp = [...myShips];
    temp.splice(idx, 1);
    temp.sort(sortFunc);
    setMyShips(temp);
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f6ebff",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mx-auto" style={{ maxWidth: "600px" }}>
          <Header2 className="mb-2">My Matches</Header2>
          {/* <div
        className="d-flex flex-row"
        style={{ overflow: "scroll", maxHeight: "400px" }}
      > */}
          <Row className="mx-auto flex-nowrap" style={{ overflow: "scroll" }}>
            {myShips.map((ship, indx) => (
              <Votecard
                ship={ship}
                disabled={true}
                userEmail={userInfo.email}
                userName={userInfo.name}
                deleteShip={deleteShip}
                indx={indx}
              />
            ))}
          </Row>
          {/* </div> */}
          <br />
          <br />
          <Header2 className="mb-2">Questions</Header2>
          <Body>
            Once you fill out the questions and save, your ships will see your
            responses!{" "}
          </Body>
          <br />
          {userInfo.answers && (
            <Formik
              initialValues={{
                contact: userInfo.answers[0],
                restaurant: userInfo.answers[1],
                hobby: userInfo.answers[2],
                quarantine: userInfo.answers[3],
                ask: userInfo.answers[4],
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await SaveAnswers(values);
                setSubmitting(false);
              }}
            >
              {({ errors, isSubmitting, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <Body className="mb-1">How should people contact you?</Body>
                    <StyledField name="contact" className="otherField" />
                  </div>
                  <br />
                  <div>
                    <Body className="mb-1">Favorite New Haven restaurant?</Body>
                    <StyledField name="restaurant" className="otherField" />
                  </div>
                  <br />
                  <div>
                    <Body className="mb-1">Favorite quarantine hobby?</Body>
                    <StyledField name="hobby" className="otherField" />
                  </div>
                  <br />
                  <div>
                    <Body className="mb-1">
                      First thing you'll do when quarantine ends?
                    </Body>
                    <StyledField name="quarantine" className="otherField" />
                  </div>
                  <br />
                  <div>
                    <Body className="mb-1">Ask me about ...</Body>
                    <StyledField name="ask" className="otherField" />
                  </div>
                  <br />
                  <div>
                    <MainBtn secondary type="submit" disabled={isSubmitting}>
                      Save
                    </MainBtn>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <br />
          <br />
          <Header2 className="mb-2">Privacy</Header2>
          <Body>Privacy setting: {info[userInfo.privacy]}</Body>
          {isChanging ? (
            <Spinner />
          ) : (
            <MainBtn secondary onClick={() => togglePrivacy()} className="mt-2">
              {userInfo.privacy === "public"
                ? "Toggle to private"
                : userInfo.privacy === "private"
                ? "Toggle to public"
                : null}
            </MainBtn>
          )}
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default Profile;

// const Logout = () => {
//   sendAmplitudeData("log_out");
//   // Clear cookies
//   document.cookie = `connect.sid=; expires=${new Date().toUTCString()}; domain=${COOKIE_DOMAIN}; path=/`;
//   // Redirect to home page and refresh as well
//   // window.location.pathname = "/";
// };
