// components/user/Container.js
import React from "react";
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
export const PInput = ({
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
  value,
  onChange,
  placeholder,
  type,
  _id,
}) => {
  console.log(background);

  return (
    <Input
      id={_id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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
    </Input>
  );
};
