import { Box, Image } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Input, Slider } from "@material-ui/core";
import { useState } from "react";
import { v4 } from "uuid";
export const CImage = ({
  src,
  height,
  width,
  borderRadius,
  _id,
}: {
  src: string;
  height: number | string;
  width: number | string;
  borderRadius: number;
  _id: string;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  console.log("image");
  const [mouseOver, setMouseOver] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <Box
      cursor={"grab"}
      borderStyle={"dashed"}
      borderRadius={borderRadius}
      width={width + 20}
      padding={2}
      borderColor={"blue.400"}
      borderWidth={mouseOver || focused ? "3px" : 0}
      onClick={() => setFocused(!focused)}
      onMouseLeave={() => setMouseOver(false)}
      onMouseEnter={() => setMouseOver(true)}
    >
      <Image
        id={_id}
        ref={(ref) => connect(drag(ref))}
        src={src}
        style={{ height: height, width: width, borderRadius: borderRadius }}
      />
    </Box>
  );
};
const CImageSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Identifier</FormLabel>
        <Input
          type="text"
          value={props._id}
          onChange={(e) => {
            setProp((props) => (props._id = e.target.value));
          }}
        />
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Source</FormLabel>
        <Input
          type={"file"}
          onChange={(e) => {
            setProp((props) => (props.src = e.target.value));
          }}
        />
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Height</FormLabel>
        <Slider
          value={props.height || "auto"}
          step={1}
          min={10}
          max={5000}
          onChange={(_, value) => {
            setProp((props) => (props.height = value));
          }}
        />
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Width</FormLabel>
        <Slider
          value={props.width || "auto"}
          step={1}
          min={10}
          max={5000}
          onChange={(_, value) => {
            setProp((props) => (props.width = value));
          }}
        />
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Radius</FormLabel>
        <Slider
          value={props.borderRadius || 0}
          step={1}
          min={10}
          max={5000}
          onChange={(_, value) => {
            setProp((props) => (props.borderRadius = value));
          }}
        />
      </FormControl>
    </>
  );
};
CImage.craft = {
  props: {
    _id: "",
    src: `https://unsplash.it/600/400`,
    height: "auto",
    width: "auto",
    borderRadius: 0,
  },
  related: {
    settings: CImageSettings,
  },
};
