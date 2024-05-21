import { Box } from "@chakra-ui/react";

export const PContainer = ({
  background,
  padding = 0,
  children,
  height,
  width,
  top,
  bottom,
  left,
  right,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  display,
  flexDirection,
  justifyContent,
  alignItems,
  _id,
}) => {
  console.log(background);

  return (
    <Box
      id={_id}
      style={{
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
        background,
        position: "relative",
        padding: `${padding}px`,
        height: `${height}px`,
        width: `${width}px`,
        top: `${top}px`,
        bottom: `${bottom}px`,
        left: `${left}px`,
        right: `${right}px`,
        display: display,
        alignItems: alignItems,
        justifyContent: justifyContent,
        flexDirection: flexDirection,
      }}
    >
      {children}
    </Box>
  );
};
export const ContainerDefaultProps = {
  _id: "",
  background: "#ffffff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 5,
  marginRight: 5,
  padding: 3,
  height: 2000,
  width: 500,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};
PContainer.craft = {
  props: ContainerDefaultProps,
};
