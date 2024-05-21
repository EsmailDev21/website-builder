import { useParams } from "react-router-dom";
import { PContainer } from "../../components/preview/PContainer";
import { PText } from "../../components/preview/PText";
import { PButton } from "../../components/preview/PButton";
import { PImage } from "../../components/preview/PImage";
import { CScript } from "../../components/core/CScript";
import { PScript } from "../../components/preview/PScript";
import { PInput } from "../../components/preview/PInput";

const Preview = () => {
  const data = localStorage.getItem("previewData");

  const json = JSON.parse(data);
  console.log(json);
  return (
    <div className="h-screen flex flex-col ">
      <Node node={json.ROOT} data={json} />
    </div>
  );
};

const Node = ({ node, data }) => {
  let typeName = "";
  if (typeof node.type === "object") {
    typeName = node.type.resolvedName;
  } else {
    typeName = node.type;
  }

  const Children = node.nodes.map((x, index) => {
    return <Node key={x} node={data[x]} data={data} />;
  });
  switch (typeName) {
    case "Container":
      return <PContainer {...node.props}>{Children}</PContainer>;
    case "Text":
      return <PText {...node.props} />;
    case "Button":
      return <PButton {...node.props} />;
    case "CImage":
      return <PImage {...node.props} />;
    case "CScript":
      return <PScript {...node.props} />;
    case "CInput":
      return <PInput {...node.props} />;
  }
};
export default Preview;
