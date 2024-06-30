export interface IColumnTypes {
  id: string;
  title: string;
  type: string;
  settings_str: string;
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

export interface ICommentHistory {
  id: string;
  body: string;
  created_at: string;
  creator: {
    id: string;
    name: string;
  };
}
