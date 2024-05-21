import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Input, Slider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
export const PText = ({
  text,
  fontSize,
  textAlign = "center",
  color,
  _id,
}: {
  text: string;
  fontSize: any;
  textAlign?: string;
  color;
  _id;
}) => {
  return (
    <div>
      <ContentEditable
        id={_id}
        html={text}
        onChange={(e) => {}}
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign, color }}
      />
    </div>
  );
};
