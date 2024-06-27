export interface ParsedDataType {
  Name: string;
  Email: string;
  Phone: string;
  University: string;
  position?: IPosition;
}

export interface IPosition {
  groupId: string;
  groupTitle: string;
}