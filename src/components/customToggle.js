import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer" }}
  >
    {children}
    <FiMoreHorizontal />
  </a>
));

export default CustomToggle;
