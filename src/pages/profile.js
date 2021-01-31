import { Header2 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
const Profile = () => {
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

  return (
    <div style={{ width: "500px" }} className="ml-auto mr-auto mt-4">
      <div>
        <Header2>My profile</Header2>
        <div>Hello there</div>
        <br />
        <MainBtn primary onClick={Logout}>
          Log out
        </MainBtn>
      </div>
    </div>
  );
};

export default Profile;
