import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Header2 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { fetchUser, TogglePrivacy } from "../api/user";
import { fetchMyShips } from "../api/ship";
import { Body } from "../global_styles/typography";
import { Spinner } from "../components/LoadingSpinner";
import Votecard from "../components/VoteCard";
import { sendAmplitudeData } from "../util/amplitude";
import { Formik, Field, Form } from "formik";
import { SaveAnswers } from "../api/user";

import "../global_styles/other.css";
// import { COOKIE_DOMAIN } from "../util/base";

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div
      style={{ maxWidth: "600px", padding: "20px" }}
      className="ml-auto mr-auto fade-in"
    >
      <Header2 className="mb-2">My matches</Header2>
      <div
        className="d-flex flex-column"
        style={{ overflow: "scroll", maxHeight: "400px" }}
      >
        {myShips.map((ship, idx) => (
          <Votecard ship={ship} disabled={true} userEmail={userInfo.email} />
        ))}
      </div>
      <br />
      <br />
      <Header2 className="mb-2">Questions</Header2>
      <Body>
        Once you fill out the questions, your ships will see your responses!{" "}
      </Body>
      <br />
      {userInfo.answers && (
        <Formik
          initialValues={{
            restaurant: userInfo.answers[0],
            study: userInfo.answers[1],
            cereal: userInfo.answers[2],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await SaveAnswers(values);
            setSubmitting(false);
          }}
        >
          {({ errors, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <Body className="mb-1">Favorite New Haven restaurant?</Body>
                <Field name="restaurant" className="otherField" />
              </div>
              <br />
              <div>
                <Body className="mb-1">Fav study spot?</Body>
                <Field name="study" className="otherField" />
              </div>
              <br />
              <div>
                <Body className="mb-1">Is cereal a soup?</Body>
                <Field name="cereal" className="otherField" />
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
