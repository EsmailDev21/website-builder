import { Box } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Input, Slider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { v4 } from "uuid";
export const Text = ({
  text,
  fontSize,
  textAlign = "center",
  color,
  fontWeight,
  _id,
}: {
  text: string;
  fontSize: any;
  textAlign?: string;
  color: string;
  fontWeight: any;
  _id: string;
}) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    hasDraggedNode,
    actions: { setProp },
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(false);
  }, [hasSelectedNode]);
  const [mouseOver, setMouseOver] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <Box
      cursor={"grab"}
      borderStyle={"dashed"}
      width={"fit-content"}
      padding={2}
      borderColor={"blue.400"}
      borderWidth={mouseOver || focused ? "3px" : 0}
      onClick={() => setFocused(!focused)}
      onMouseLeave={() => setMouseOver(false)}
      onMouseEnter={() => setMouseOver(true)}
    >
      <div ref={(ref) => connect(drag(ref))}>
        <ContentEditable
          onDoubleClick={() => setEditable(true)}
          disabled={!editable}
          html={text}
          id={_id}
          onChange={(e) =>
            setProp(
              (props) =>
                (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
            )
          }
          tagName="span"
          style={{ fontSize: `${fontSize}px`, textAlign, color, fontWeight }}
        />
      </div>
    </Box>
  );
};
const TextSettings = () => {
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
        <FormLabel component="legend">Font size</FormLabel>
        <Slider
          value={props.fontSize || 12}
          step={1}
          min={1}
          max={50}
          onChange={(_, value) => {
            setProp((props) => (props.fontSize = value));
          }}
        />
      </FormControl>
      <FormControl size="small" component="fieldset">
        <FormLabel component="legend">Font Weight</FormLabel>
        <Slider
          value={props.fontWeight || 300}
          step={100}
          min={100}
          max={900}
          onChange={(_, value) => {
            setProp((props) => (props.fontWeight = value));
          }}
        />
      </FormControl>
      <FormLabel component="legend">Color</FormLabel>
      <Input
        type="color"
        value={props.color}
        onChange={(e) => {
          setProp((props) => (props.color = e.target.value));
        }}
      />
    </>
  );
};
Text.craft = {
  props: {
    _id: "",
    text: "Hi",
    fontSize: 20,
    color: "#000000",
  },
  rules: {
    canDrag: (node) => node.data.props.text != "Drag",
  },
  related: {
    settings: TextSettings,
  },
};
