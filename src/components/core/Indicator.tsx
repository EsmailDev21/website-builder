import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const Indicator = ({ children }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<React.MutableRefObject<HTMLDivElement>>(null);

  return (
    <Box
      onMouseLeave={() => setIsMouseOver(false)}
      onMouseEnter={() => setIsMouseOver(true)}
      onDoubleClick={() => setIsFocused(!isFocused)}
      borderWidth={isMouseOver || isFocused ? "2px" : 0}
      borderColor={"green.500"}
      borderStyle={"dashed"}
      style={{
        height: children.props.height,
        width: children.props.width,
        marginTop: children.props.marginTop,
        marginBottom: children.props.marginBottom,
        marginLeft: children.props.marginLeft,
        marginRight: children.props.marginRight,
        padding: "10px",
        fontSize: "12px",
        lineHeight: "12px",
      }}
    >
      {children}
    </Box>
  );
};

export default Indicator;
