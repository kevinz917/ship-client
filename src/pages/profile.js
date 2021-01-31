import { Header2 } from "../global_styles/typography";
import { MainBtn } from "../global_styles/button";
const Profile = () => {
  return (
    <div style={{ width: "500px" }} className="ml-auto mr-auto mt-4">
      <div>
        <Header2>My profile</Header2>
        <div>Hello there</div>
        <br />
        <MainBtn primary>Log out</MainBtn>
      </div>
    </div>
  );
};

export default Profile;
