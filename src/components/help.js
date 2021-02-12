import "./help.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { BiHelpCircle } from "react-icons/bi";

const Help = () => {
  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSdxHGsyQVb2iKBtUkF0eXKMHoIyvIbbLVj7IA-IoAWQ6gIfBg/viewform?usp=sf_link"
      target="_blank"
      className="helpContainer"
      style={{ textDecoration: "none" }}
    >
      <OverlayTrigger overlay={<Tooltip>Report a problem</Tooltip>}>
        <div className="textContainer">
          <BiHelpCircle />
          <div className="ml-2">
            <b>Report</b>
          </div>
        </div>
      </OverlayTrigger>
    </a>
  );
};

export default Help;
