// components/user/Container.js
import React, { useState } from "react";
import {
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  Typography,
  RadioGroup,
} from "@material-ui/core";
import { FormControl, FormLabel, Slider } from "@material-ui/core";
import ColorPicker from "material-ui-color-picker";
import { Element, useNode } from "@craftjs/core";
import { Box, Input } from "@chakra-ui/react";
import SettingsDrawer from "../UI/SettingsDrawer";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { v4 } from "uuid";
import { Text } from "./CText";

export const Button = ({
  background,
  padding = 0,
  textColor,
  textFontWeight,
  textFontSize,
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
  borderWidth,
  borderRadius,
  borderColor,
  shadow,
  shadowColor,
  shadowRadius,
  shadowBlur,
  onClick,
  text,
  type,
  _id,
}) => {
  console.log(background);
  const {
    connectors: { connect, drag },
  } = useNode();

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
      <button
        id={_id}
        ref={(ref) => connect(drag(ref))}
        type={type}
        onClick={onClick}
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
          boxShadow: `${shadow}px ${shadow}px ${shadowBlur}px ${shadowRadius}px ${shadowColor}`,
          borderWidth: `${borderWidth}px`,
          borderRadius: `${borderRadius}px`,
          borderColor: borderColor,
        }}
      >
        <Text
          text={text}
          fontSize={textFontSize}
          color={textColor}
          fontWeight={textFontWeight}
          _id={""}
        />
      </button>
    </Box>
  );
};
export const CInputSettings = () => {
  const {
    background,
    padding,
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
    borderWidth,
    borderRadius,
    borderColor,
    shadow,
    shadowColor,
    shadowRadius,
    shadowBlur,
    onClick,
    type,
    text,
    _id,
    textColor,
    textFontWeight,
    textFontSize,
    actions: { setProp },
  } = useNode((node) => ({
    _id: node.data.props.id,
    background: node.data.props.background,
    padding: node.data.props.padding,
    height: node.data.props.height,
    width: node.data.props.width,
    top: node.data.props.top,
    bottom: node.data.props.bottom,
    left: node.data.props.left,
    right: node.data.props.right,
    marginTop: node.data.props.marginTop,
    marginBottom: node.data.props.marginBottom,
    marginLeft: node.data.props.marginLeft,
    marginRight: node.data.props.marginRight,
    display: node.data.props.display,
    flexDirection: node.data.props.flexDirection,
    justifyContent: node.data.props.justifyContent,
    alignItems: node.data.props.alignItems,
    borderWidth: node.data.props.borderWidth,
    borderRadius: node.data.props.borderRadius,
    borderColor: node.data.props.borderColor,
    shadow: node.data.props.shadow,
    shadowColor: node.data.props.shadowColor,
    shadowRadius: node.data.props.shadowRadius,
    shadowBlur: node.data.props.shadowBlur,
    onClick: node.data.props.onClick,
    type: node.data.props.type,
    text: node.data.props.text,
    textColor: node.data.props.textColor,
    textFontWeight: node.data.props.textFontWeight,
    textFontSize: node.data.props.textFontSize,
  }));
  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Identifier</FormLabel>
        <Input
          type="text"
          value={_id}
          onChange={(e) => {
            setProp((props) => (props._id = e.target.value));
          }}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Text</FormLabel>
        <Input
          type="text"
          value={text}
          onChange={(e) => {
            setProp((props) => (props.text = e.target.value));
          }}
        />
      </FormControl>
      <SettingsDrawer title="Text Styles">
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Font size</FormLabel>
          <Input
            width={"100px"}
            value={textFontSize || 14}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.textFontSize = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            value={textFontSize || 14}
            step={1}
            min={0}
            max={50}
            onChange={(_, value) => {
              setProp((props) => (props.textFontSize = value));
            }}
          />
        </FormControl>
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Font Weight</FormLabel>
          <Input
            width={"100px"}
            value={textFontWeight || 500}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.textFontWeight = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            value={textFontWeight || 500}
            step={100}
            min={100}
            max={900}
            onChange={(_, value) => {
              setProp((props) => (props.textFontWeight = value));
            }}
          />
        </FormControl>
        <FormLabel component="legend">Color</FormLabel>
        <Input
          type="color"
          value={textColor}
          onChange={(e) => {
            setProp((props) => (props.textColor = e.target.value));
          }}
        />
      </SettingsDrawer>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <Input
          type="color"
          value={background}
          onChange={(e) => {
            setProp((props) => (props.background = e.target.value));
          }}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Display</FormLabel>
        <RadioGroup
          defaultValue={display}
          onChange={(e) => setProp((props) => (props.display = e.target.value))}
        >
          <FormControlLabel
            label="flex"
            value="flex"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="grid"
            value="grid"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="block"
            value="block"
            control={<Radio size="small" color="primary" />}
          />
        </RadioGroup>
      </FormControl>
      <Divider />
      <SettingsDrawer title={"Input Type"}>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Button Type</FormLabel>
          <RadioGroup
            defaultValue={type}
            onChange={(e) => setProp((props) => (props.type = e.target.value))}
          >
            <FormControlLabel
              label="Submit"
              value="submit"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Reset"
              value="reset"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Button"
              value="button"
              control={<Radio size="small" color="primary" />}
            />
          </RadioGroup>
        </FormControl>
      </SettingsDrawer>
      <Divider />

      <SettingsDrawer title={"Button Click Callback"}>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Button Click Callback</FormLabel>
          <CodeMirror
            value={onClick}
            onChange={(newValue) =>
              setProp((props) => (props.onClick = newValue))
            }
            height="200px"
            extensions={[javascript({ jsx: true })]}
          />
        </FormControl>
      </SettingsDrawer>
      <Divider />
      <SettingsDrawer title={"Justify Content"}>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Justify Content</FormLabel>
          <RadioGroup
            defaultValue={justifyContent}
            onChange={(e) =>
              setProp((props) => (props.justifyContent = e.target.value))
            }
          >
            <FormControlLabel
              label="Space between"
              value="space-between"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Space Around"
              value="space-around"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Flex start"
              value="flex-start"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Flex end"
              value="flex-end"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Space Evenly"
              value="space-evenly"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Center"
              value="center"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Normal"
              value="normal"
              control={<Radio size="small" color="primary" />}
            />
          </RadioGroup>
        </FormControl>
      </SettingsDrawer>
      <SettingsDrawer title="Align Items">
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Align Items</FormLabel>
          <RadioGroup
            defaultValue={alignItems}
            onChange={(e) =>
              setProp((props) => (props.alignItems = e.target.value))
            }
          >
            <FormControlLabel
              label="Space between"
              value="space-between"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Space Around"
              value="space-around"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Flex start"
              value="flex-start"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Flex end"
              value="flex-end"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Space Evenly"
              value="space-evenly"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Center"
              value="center"
              control={<Radio size="small" color="primary" />}
            />
            <FormControlLabel
              label="Normal"
              value="normal"
              control={<Radio size="small" color="primary" />}
            />
          </RadioGroup>
        </FormControl>
      </SettingsDrawer>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Flex Direction</FormLabel>
        <RadioGroup
          defaultValue={flexDirection}
          onChange={(e) =>
            setProp((props) => (props.flexDirection = e.target.value))
          }
        >
          <FormControlLabel
            label="Row"
            value="row"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="Column"
            value="column"
            control={<Radio size="small" color="primary" />}
          />
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Input
          width={"100px"}
          value={padding}
          min={0}
          type="number"
          onChange={(e) => {
            setProp((props) => (props.padding = e.target.value));
          }}
        />{" "}
        {"px"}
        <Slider
          defaultValue={padding}
          onChange={(_, value) => setProp((props) => (props.padding = value))}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Height</FormLabel>
        <Input
          width={"100px"}
          value={height}
          min={0}
          type="number"
          onChange={(e) => {
            setProp((props) => (props.height = e.target.value));
          }}
        />{" "}
        {"px"}
        <Slider
          min={0}
          max={5000}
          step={1}
          defaultValue={height}
          onChange={(_, value) => setProp((props) => (props.height = value))}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Width</FormLabel>
        <Input
          width={"100px"}
          value={width}
          min={0}
          type="number"
          onChange={(e) => {
            setProp((props) => (props.width = e.target.value));
          }}
        />{" "}
        {"px"}
        <Slider
          step={1}
          min={0}
          max={1000}
          defaultValue={width}
          onChange={(_, value) => setProp((props) => (props.width = value))}
        />
      </FormControl>
      <SettingsDrawer title={"Margins"}>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Margin Top</FormLabel>
          <Input
            width={"100px"}
            value={marginTop}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.marginTop = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={marginTop}
            onChange={(_, value) =>
              setProp((props) => (props.marginTop = value))
            }
          />
        </FormControl>
        <Divider />
        <Typography>Margins</Typography>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Margin Bottom</FormLabel>
          <Input
            width={"100px"}
            value={marginBottom}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.marginBottom = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={marginBottom}
            onChange={(_, value) =>
              setProp((props) => (props.marginBottom = value))
            }
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Margin Left</FormLabel>
          <Input
            width={"100px"}
            value={marginLeft}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.marginLeft = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={marginLeft}
            onChange={(_, value) =>
              setProp((props) => (props.marginLeft = value))
            }
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Margin Right</FormLabel>
          <Input
            width={"100px"}
            value={marginRight}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.marginRight = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={marginRight}
            onChange={(_, value) =>
              setProp((props) => (props.marginRight = value))
            }
          />
        </FormControl>
      </SettingsDrawer>
      <Divider />
      <SettingsDrawer title={"Positioning"}>
        <Typography>Positioning</Typography>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Top</FormLabel>
          <Input
            width={"100px"}
            value={top}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.top = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={top}
            onChange={(_, value) => setProp((props) => (props.top = value))}
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Bottom</FormLabel>
          <Input
            width={"100px"}
            value={bottom}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.bottom = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            defaultValue={bottom}
            onChange={(_, value) => setProp((props) => (props.bottom = value))}
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Left</FormLabel>
          <Input
            width={"100px"}
            value={left}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.left = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={left}
            onChange={(_, value) => setProp((props) => (props.left = value))}
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Right</FormLabel>
          <Input
            width={"100px"}
            value={right}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.right = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={right}
            onChange={(_, value) => setProp((props) => (props.right = value))}
          />
        </FormControl>
      </SettingsDrawer>
      <Divider />
      <SettingsDrawer title="Border">
        <Typography>Border</Typography>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Border Color</FormLabel>
          <Input
            value={borderColor}
            type="color"
            onChange={(e) =>
              setProp((props) => (props.borderColor = e.target.value))
            }
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Border Width</FormLabel>
          <Input
            width={"100px"}
            value={borderWidth}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.borderWidth = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={borderWidth}
            onChange={(_, value) =>
              setProp((props) => (props.borderWidth = value))
            }
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Border Radius</FormLabel>
          <Input
            width={"100px"}
            value={borderRadius}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.borderRadius = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={1000}
            step={1}
            defaultValue={borderRadius}
            onChange={(_, value) =>
              setProp((props) => (props.borderRadius = value))
            }
          />
        </FormControl>
      </SettingsDrawer>
      <Divider />
      <SettingsDrawer title={"Box Shadow"}>
        <Typography>Box Sahdow</Typography>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Shadow</FormLabel>
          <Input
            width={"100px"}
            value={shadow}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.shadow = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={shadow}
            onChange={(_, value) => setProp((props) => (props.shadow = value))}
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Shadow Rdius</FormLabel>
          <Input
            width={"100px"}
            value={shadowRadius}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.shadowRadius = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={shadowRadius}
            onChange={(_, value) =>
              setProp((props) => (props.shadowRadius = value))
            }
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Shadow Blur</FormLabel>
          <Input
            width={"100px"}
            value={shadowBlur}
            min={0}
            type="number"
            onChange={(e) => {
              setProp((props) => (props.shadowBlur = e.target.value));
            }}
          />{" "}
          {"px"}
          <Slider
            min={0}
            max={100}
            step={1}
            defaultValue={shadowBlur}
            onChange={(_, value) =>
              setProp((props) => (props.shadowBlur = value))
            }
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Shadow Color</FormLabel>
          <Input
            value={shadowColor}
            type="color"
            onChange={(e) =>
              setProp((props) => (props.shadowColor = e.target.value))
            }
          />
        </FormControl>
      </SettingsDrawer>
    </div>
  );
};
export const ButtonDefaultProps = {
  _id: "",
  background: "#ffffff",
  display: "block",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  padding: 0,
  height: 30,
  width: 100,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  borderWidth: 2,
  borderRadius: 0,
  borderColor: "#000000",
  shadow: 0,
  shadowColor: "#000000",
  shadowRadius: 0,
  shadowBlur: 0,
  text: "Click Me",
  onClick: () => console.log("clicked"),
  textColor: "#000000",
  textFontWeight: 500,
  textFontSize: 14,
};
Button.craft = {
  props: ButtonDefaultProps,
  related: {
    settings: CInputSettings,
  },
};
