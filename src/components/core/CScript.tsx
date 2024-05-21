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

export const CScript = ({ value, type }: { value: string; type?: string }) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();
  const [editable, setEditable] = useState(false);
  console.log({ value: value });
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <p>Script here</p>
      <script type={type}>{value}</script>
    </div>
  );
};
const CScriptSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <>
      <SettingsDrawer title={"Write your code here"}>
        <FormControl size="small" component="fieldset">
          <FormLabel component="legend">Code</FormLabel>
          <CodeMirror
            width="500px"
            theme={"dark"}
            value={props.value}
            onChange={(newValue) => {
              console.log(newValue);
              const sanitizedValue = newValue;
              setProp((props) => (props.value = sanitizedValue));
            }}
            height="200px"
            extensions={[javascript({ jsx: true })]}
          />
        </FormControl>
      </SettingsDrawer>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Is module</FormLabel>
        <RadioGroup
          defaultValue={props.type}
          onChange={(e) => setProp((props) => (props.type = e.target.value))}
        >
          <FormControlLabel
            label="Yes"
            value="module"
            control={<Radio size="small" color="primary" />}
          />
          <FormControlLabel
            label="No"
            value=""
            control={<Radio size="small" color="primary" />}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
CScript.craft = {
  props: {
    value: "function myFunction(){ console.log(1+2);}",
    type: "",
  },
  related: {
    settings: CScriptSettings,
  },
};
