// components/SettingsPanel.js
import React from "react";
import {
  Box,
  Badge,
  Stack,
  Text,
  Button as MaterialButton,
  FormControl,
  FormLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

export const SettingsPanel = () => {
  return (
    <Box bgColor="rgba(0, 0, 0, 0.06)" mt={2} px={2} py={2}>
      <Stack direction="column" spacing={0}>
        <Stack direction={"row"} alignItems="center">
          <Box width={"xs"}>
            <Text variant="subtitle1">Selected</Text>
          </Box>
          <Box>
            <Badge colorScheme="messenger">Selected</Badge>
          </Box>
        </Stack>
        <FormLabel>Prop</FormLabel>
        <Slider
          margin={2}
          aria-label="slider-ex-1"
          min={0}
          max={1000}
          step={1}
          defaultValue={30}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <MaterialButton variant="solid" colorScheme="red">
          Delete
        </MaterialButton>
      </Stack>
    </Box>
  );
};
