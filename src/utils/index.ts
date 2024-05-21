import { Folder } from "../types";

export const checkFolderAlreadyExist = (
  folderName: string,
  currentFolder: any,
  folders: Folder[]
) => {
  if (currentFolder === "root") {
    const folderPresent = folders.find((folder) => folder.name === folderName);

    if (folderPresent) {
      return true;
    } else {
      return false;
    }
  } else {
    const folderPresent = folders.find(
      (folder) => folder.name === folderName && folder.parent === currentFolder
    );
    if (folderPresent) {
      return true;
    } else {
      return false;
    }
  }
};
