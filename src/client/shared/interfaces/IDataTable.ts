export interface IBodyItem {
  key: string;
  type: string;
  description: string;
}
export interface IDataTable {
  headers: string[];
  body: IBodyItem[];
}
