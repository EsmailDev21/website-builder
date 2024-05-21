export type Document = {
  id: string;
  fileName: string;
  path: string;
  content: string;
  jsonContent: string;
  savedAt: Date;
  folderId: string;
  projectId: string;
  parent: string; //folderId
  extension: string;
  createdAt: Date;
};

export type Project = {
  id: string;
  name: string;
  ownerID: string;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  joinedAt: Date;
  role: Role;
};

export type Role = "ADMIN" | "USER";

export class Folder {
  id: string;
  projectId: string;
  name: string;
  parentID: string;
  createdBy: string;
  createdAt: Date;
  path: any;
  /**
   *
   */
  constructor(
    projectId: string,
    name: string,
    parent: string,
    createdBy: string,
    path: any
  ) {
    this.projectId = projectId;
    this.name = name;
    this.parentID = parent;
    this.createdBy = createdBy;
    this.createdAt = new Date();
    this.path = path;
  }
}
