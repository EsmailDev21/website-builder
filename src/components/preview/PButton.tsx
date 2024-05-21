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
import { PText } from "./PText";

export const PButton = ({
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

  return (
    <button
      id={_id}
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
      <PText
        text={text}
        fontSize={textFontSize}
        color={textColor}
        fontWeight={textFontWeight}
        _id={""}
      />
    </button>
  );
};
