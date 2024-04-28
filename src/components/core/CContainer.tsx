import { Container } from "@chakra-ui/react";
import { useNode } from "@craftjs/core";
import React, { ReactNode } from "react";

export interface CContainerProps {
  padding: number;
  bgColor: string;
  margin: number;
  children?: ReactNode;
}
const CContainer: React.FC<CContainerProps> = ({
  bgColor = "white",
  margin = 0,
  padding = 0,
  children = "Container",
}: CContainerProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Container
      ref={(ref) => connect(drag(ref))}
      margin={margin}
      padding={padding}
      bgColor={bgColor}
    >
      {children}
    </Container>
  );
};

export default CContainer;
