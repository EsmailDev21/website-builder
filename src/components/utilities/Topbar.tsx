// Topbar.js
import React, { useState, useEffect } from "react";
import {
  Box,
  FormControlLabel,
  Switch,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar,
} from "@material-ui/core";
import { useEditor } from "@craftjs/core";
import lz from "lzutf8";
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { PContainer } from "../preview/PContainer";
import { PText } from "../preview/PText";
import { renderToStaticMarkup } from "react-dom/server";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { PScript } from "../preview/PScript";
import { PInput } from "../preview/PInput";
import { PImage } from "../preview/PImage";
import { PButton } from "../preview/PButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createNewDocument,
  fetchFoldersByProject,
  getFileFoldersState,
} from "../../redux/slices/fileFolderSlice";
import { selectUser } from "../../redux/slices/userSlice";
import {
  endtLoading,
  setProjects,
  startLoading,
} from "../../redux/slices/projectsSlice";
import axios from "axios";
import { token } from "../../utils/auth";
import { APIURL } from "../../utils/api"; // Import the new component
import SaveModal from "../UI/Save";
import { getFoldersByProjectId } from "../services/folderService";

export const Topbar = () => {
  const dispatch = useAppDispatch();
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [stateToLoad, setStateToLoad] = useState(null);
  const [data, setData] = useState();
  const user = useAppSelector(selectUser);
  const projects = useAppSelector((state) => state.projects.data);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const folders = useAppSelector(getFileFoldersState).userFolders;
  const [filename, setFilename] = useState("");

  console.log([selectedFolder, selectedProject]);

  useEffect(() => {
    const getProjects = async (ownerID) => {
      try {
        dispatch(startLoading());
        const res = await axios.get(`${APIURL}/project/byOwner/${ownerID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data) {
          dispatch(setProjects(res.data));
        }
        dispatch(endtLoading());
      } catch (error) {
        dispatch(endtLoading());
      }
    };
    getProjects(user.id);
  }, [user.id]);
  useEffect(() => {
    const getFolders = async () => {
      await dispatch(fetchFoldersByProject(selectedProject.id));
    };
    getFolders();
  }, [selectedProject]);

  const previewCode = (data) => {
    localStorage.setItem("previewData", data);
    console.log(data);
  };

  const previewPage = () => {
    navigate("/preview");
  };

  const Node = ({ node, data }) => {
    let typeName = "";
    if (typeof node.type === "object") {
      typeName = node.type.resolvedName;
    } else {
      typeName = node != null ? node.type : "";
    }

    const Children =
      node != null
        ? node.nodes.map((x) => {
            return <Node key={x} node={data[x]} data={data} />;
          })
        : null;
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
      default:
        return <PContainer {...node.props}>{Children}</PContainer>;
    }
  };

  const previewData = localStorage.getItem("previewData");

  const json = JSON.parse(previewData);
  const node = <Node node={json != null ? json.ROOT : null} data={json} />;
  const html = `<!DOCTYPE html><html>
<head>
<meta charSet="UTF-8" />
<script src="https://unpkg.com/react@latest/umd/react.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@latest/babel.min.js" crossorigin="anonymous"></script>
<!-- Fonts to support Material Design -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
<!-- Icons to support Material Design -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</head>
<body>
${renderToStaticMarkup(node)}
</body>
</html>`;

  const createDocumentFromHTML = (htmlContent) => {
    if (!selectedProject || !selectedFolder) {
      setSnackbarMessage("Please select project and folder");
      return;
    }

    dispatch(
      createNewDocument({
        dto: {
          content: htmlContent,
          folderId: selectedFolder.id,
          path: selectedFolder.path,
          extension: ".html",
          jsonContent: JSON.stringify(json),
        },
        projectId: selectedProject,
        fileName: filename + ".html",
      })
    )
      .then((response) => {
        console.log("Document created successfully:", response);
        setSnackbarMessage("Document created successfully");
      })
      .catch((error) => {
        console.error("Failed to create document:", error);
        setSnackbarMessage("Failed to create document");
      });
  };

  //const { isOpen: isSaveModalOpen, onOpen: onSaveModalOpen, onClose: onSaveModalClose } = useDisclosure();

  return (
    <>
      <Box px={1} py={1} mt={3} mb={1} bgcolor="#cbe8e7">
        <Grid container alignItems="center">
          <Grid item xs>
            <FormControlLabel
              className="enable-disable-toggle"
              control={
                <Switch
                  checked={enabled}
                  onChange={(_, value) =>
                    actions.setOptions((options) => (options.enabled = value))
                  }
                />
              }
              label="Enable"
            />
          </Grid>
          <Grid item>
            <Button
              fontFamily={"heading"}
              mt={2}
              w={"80%"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                boxShadow: "xl",
              }}
              onClick={() => {
                const json = query.serialize();
                previewCode(json);
                onOpen();
                setSnackbarMessage("State copied to clipboard");
              }}
            >
              Preview Code
            </Button>

            <Button
              className="load-state-btn"
              size="small"
              variant="outlined"
              colorScheme="blue"
              onClick={() => setDialogOpen(true)}
            >
              Load
            </Button>
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle id="alert-dialog-title">Load state</DialogTitle>
              <DialogContent>
                <TextField
                  multiline
                  fullWidth
                  placeholder='Paste the contents that was copied from the "Copy Current State" button'
                  size="small"
                  value={stateToLoad}
                  onChange={(e) => setStateToLoad(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)} colorScheme="blue">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setDialogOpen(false);
                    const json = lz.decompress(lz.decodeBase64(stateToLoad));
                    actions.deserialize(json);
                    setSnackbarMessage("State loaded");
                  }}
                  colorScheme="blue"
                  autoFocus
                >
                  Load
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              autoHideDuration={1000}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={!!snackbarMessage}
              onClose={() => setSnackbarMessage(null)}
              message={<span>{snackbarMessage}</span>}
            />
          </Grid>
        </Grid>
      </Box>

      <Modal
        size={"6xl"}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Code Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CodeBlock
              text={html}
              language={"html"}
              showLineNumbers={true}
              theme={atomOneDark}
            />
          </ModalBody>

          <ModalFooter>
            <SaveModal
              projects={projects}
              folders={folders}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
              filename={filename}
              setFilename={setFilename}
              createDocumentFromHTML={createDocumentFromHTML}
              htmlContent={html}
            />
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
