export interface IColumnTypes {
  id: string;
  title: string;
  type: string;
}

export interface IColumnValueTypes {
  id: string;
  text: string;
}

export interface IItemTypes {
  id: string;
  name: string;
  column_values: IColumnValueTypes[];
}

export interface IGroupTypes {
  id: string;
  title: string;
}