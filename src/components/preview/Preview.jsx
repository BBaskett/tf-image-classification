import * as React from "react";

import placeholderImg from "../../images/placeholder.png";

import "./Preview.css";

const Preview = React.forwardRef((props, ref) => {
  const { data } = props;
  if (data) {
    return <img src={data.url} alt={data.name} ref={ref} />;
  }

  return <img src={placeholderImg} alt="placeholder_img" />;
});

/* function Preview({ data }) {
  if (data) {
    return <img src={data.url} alt={data.name} />;
  }

  return <img src={placeholderImg} alt="placeholder_img" />;
} */

export default Preview;
