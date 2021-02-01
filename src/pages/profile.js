import { useEffect, useState } from "react";
import { Header2 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
import { fetchUser, TogglePrivacy } from "../api/user";
import { Body } from "../global_styles/typography";
import { Spinner } from "../components/LoadingSpinner";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ privacy: null });
  const [isLoading, setIsloading] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const info = {
    private: "Others will not be able to vote on ships that includes you",
    public: "Others can vote on ships that include you",
  };

  useEffect(() => {
    const onMount = async () => {
      setIsloading(true);
      let fetchedUser = await fetchUser();
      setUserInfo(fetchedUser);
      setIsloading(false);
    };

    onMount();
  }, []);

  const togglePrivacy = async () => {
    setIsChanging(true);
    if (userInfo.privacy === "public") {
      let toggled = await TogglePrivacy("private");
    } else if (userInfo.privacy === "private") {
      let toggled = await TogglePrivacy("public");
    }
    let fetchedUser = await fetchUser();
    setUserInfo(fetchedUser);
    setIsChanging(false);
  };

  const Logout = () => {
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
    <div style={{ width: "500px" }} className="ml-auto mr-auto mt-4 fade-in">
      <div>
        <Header2>My profile</Header2>
        <br />
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
        <hr />
        <MainBtn primary onClick={Logout}>
          Log out
        </MainBtn>
      </div>
    </div>
  );
};

export default Profile;
