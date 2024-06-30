import { IGroupTypes } from "./mondayViewsTypes";

export interface ParsedDataType {
  Name: string;
  Email: string;
  Phone: string;
  University: string;
  group?: IGroupTypes;
  position?: string;
}
