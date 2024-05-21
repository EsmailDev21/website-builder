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
import { Element, useEditor, useNode } from "@craftjs/core";
import { Text } from "./CText";
import { Box, Button, Input } from "@chakra-ui/react";
import { Card } from "./CCard";
import SettingsDrawer from "../UI/SettingsDrawer";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { v4 } from "uuid";
import { CTHead } from "./cTable/CTHead";
import { CTBody } from "./cTable/CTBody";
import { Cth } from "./cTable/Cth";
import { Ctr } from "./cTable/Ctr";
import { Ctd } from "./cTable/Ctd";
import Dropdown from "../UI/Dropdown";
export const CTable = ({
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
  borderWidth,
  borderRadius,
  borderColor,
  shadow,
  shadowColor,
  shadowRadius,
  shadowBlur,
  type,
  _id,
  ths,
  tds,
  trs,
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
      <Box
        id={_id}
        ref={(ref) => connect(drag(ref))}
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
        {children}
      </Box>
    </Box>
  );
};
export const CTableSettings = () => {
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
    _id,
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
  }));
  const { connectors, query } = useEditor();
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
      <Dropdown rightIcon={null} title={"Table components"}>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component={"legend"}>Table head</FormLabel>
          <Button
            ref={(ref) =>
              connectors.create(
                ref,
                <Element
                  canvas
                  is={CTHead}
                  children={undefined}
                  background={undefined}
                  height={undefined}
                  width={undefined}
                  top={undefined}
                  bottom={undefined}
                  left={undefined}
                  right={undefined}
                  marginTop={undefined}
                  marginBottom={undefined}
                  marginLeft={undefined}
                  marginRight={undefined}
                  display={undefined}
                  flexDirection={undefined}
                  justifyContent={undefined}
                  alignItems={undefined}
                  borderWidth={undefined}
                  borderRadius={undefined}
                  borderColor={undefined}
                  shadow={undefined}
                  shadowColor={undefined}
                  shadowRadius={undefined}
                  shadowBlur={undefined}
                  _id={undefined}
                />
              )
            }
            fontFamily={"heading"}
            my={2}
            w={"full"}
            bgGradient="linear(to-r, blue.400,cyan.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, blue.400,cyan.400)",
              boxShadow: "xl",
            }}
          >
            Table head
          </Button>
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component={"legend"}>Table body</FormLabel>
          <Button
            ref={(ref) =>
              connectors.create(
                ref,
                <Element
                  canvas
                  is={CTBody}
                  children={undefined}
                  background={undefined}
                  height={undefined}
                  width={undefined}
                  top={undefined}
                  bottom={undefined}
                  left={undefined}
                  right={undefined}
                  marginTop={undefined}
                  marginBottom={undefined}
                  marginLeft={undefined}
                  marginRight={undefined}
                  display={undefined}
                  flexDirection={undefined}
                  justifyContent={undefined}
                  alignItems={undefined}
                  borderWidth={undefined}
                  borderRadius={undefined}
                  borderColor={undefined}
                  shadow={undefined}
                  shadowColor={undefined}
                  shadowRadius={undefined}
                  shadowBlur={undefined}
                  _id={undefined}
                />
              )
            }
            fontFamily={"heading"}
            my={2}
            w={"full"}
            bgGradient="linear(to-r, blue.400,cyan.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, blue.400,cyan.400)",
              boxShadow: "xl",
            }}
          >
            Table body
          </Button>
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component={"legend"}>Th</FormLabel>
          <Button
            ref={(ref) =>
              connectors.create(
                ref,
                <Element
                  canvas
                  is={Cth}
                  children={undefined}
                  background={undefined}
                  height={undefined}
                  width={undefined}
                  top={undefined}
                  bottom={undefined}
                  left={undefined}
                  right={undefined}
                  marginTop={undefined}
                  marginBottom={undefined}
                  marginLeft={undefined}
                  marginRight={undefined}
                  display={undefined}
                  flexDirection={undefined}
                  justifyContent={undefined}
                  alignItems={undefined}
                  borderWidth={undefined}
                  borderRadius={undefined}
                  borderColor={undefined}
                  shadow={undefined}
                  shadowColor={undefined}
                  shadowRadius={undefined}
                  shadowBlur={undefined}
                  _id={undefined}
                />
              )
            }
            fontFamily={"heading"}
            my={2}
            w={"full"}
            bgGradient="linear(to-r, blue.400,cyan.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, blue.400,cyan.400)",
              boxShadow: "xl",
            }}
          >
            Th
          </Button>
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component={"legend"}>Table Row</FormLabel>
          <Button
            ref={(ref) =>
              connectors.create(
                ref,
                <Element
                  canvas
                  is={Ctr}
                  children={undefined}
                  background={undefined}
                  height={100}
                  width={undefined}
                  top={undefined}
                  bottom={undefined}
                  left={undefined}
                  right={undefined}
                  marginTop={undefined}
                  marginBottom={undefined}
                  marginLeft={undefined}
                  marginRight={undefined}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={undefined}
                  alignItems={undefined}
                  borderWidth={undefined}
                  borderRadius={undefined}
                  borderColor={undefined}
                  shadow={undefined}
                  shadowColor={undefined}
                  shadowRadius={undefined}
                  shadowBlur={undefined}
                  _id={undefined}
                />
              )
            }
            fontFamily={"heading"}
            my={2}
            w={"full"}
            bgGradient="linear(to-r, blue.400,cyan.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, blue.400,cyan.400)",
              boxShadow: "xl",
            }}
          >
            Table row
          </Button>
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component={"legend"}>Table column</FormLabel>
          <Button
            ref={(ref) =>
              connectors.create(
                ref,
                <Element
                  canvas
                  is={Ctd}
                  children={undefined}
                  background={undefined}
                  height={undefined}
                  width={50}
                  top={undefined}
                  bottom={undefined}
                  left={undefined}
                  right={undefined}
                  marginTop={undefined}
                  marginBottom={undefined}
                  marginLeft={undefined}
                  marginRight={undefined}
                  display={undefined}
                  flexDirection={undefined}
                  justifyContent={undefined}
                  alignItems={undefined}
                  borderWidth={2}
                  borderRadius={undefined}
                  borderColor={"#000000"}
                  shadow={undefined}
                  shadowColor={undefined}
                  shadowRadius={undefined}
                  shadowBlur={undefined}
                  _id={undefined}
                />
              )
            }
            fontFamily={"heading"}
            my={2}
            w={"full"}
            bgGradient="linear(to-r, blue.400,cyan.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, blue.400,cyan.400)",
              boxShadow: "xl",
            }}
          >
            Table column
          </Button>
        </FormControl>
      </Dropdown>
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
        <Slider
          defaultValue={padding}
          onChange={(_, value) => setProp((props) => (props.padding = value))}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Height</FormLabel>
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
          <Slider
            defaultValue={bottom}
            onChange={(_, value) => setProp((props) => (props.bottom = value))}
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal" component="fieldset">
          <FormLabel component="legend">Left</FormLabel>
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
export const CTableDefaultProps = {
  _id: "",
  background: "#ffffff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  padding: 0,
  height: 500,
  width: 600,
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
};
CTable.craft = {
  props: CTableDefaultProps,
  related: {
    settings: CTableSettings,
  },
};
