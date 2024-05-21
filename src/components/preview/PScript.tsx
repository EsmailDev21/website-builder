import { useNode } from "@craftjs/core";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Slider,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Input } from "@chakra-ui/react";
import SettingsDrawer from "../UI/SettingsDrawer";

export const PScript = ({ value, type }: { value: string; type?: string }) => {
  console.log({ value1: value });
  return (
    <div>
      <p>Script here</p>
      <script type={type}>{value}</script>
    </div>
  );
};
