import { Image } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import { FormControl, FormLabel, Input, Slider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
export const PImage = ({
  src,
  height,
  width,
  borderRadius,
  _id,
}: {
  _id: string;
  src: string;
  height: number | string;
  width: number | string;
  borderRadius: number;
}) => {
  return (
    <div>
      <Image
        id={_id}
        src={src}
        style={{ height: height, width: width, borderRadius: borderRadius }}
      />
    </div>
  );
};
