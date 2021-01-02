export interface BodyItem {
  key: string;
  type: string;
  description: string;
}
export interface DataTable {
  headers: string[];
  body: BodyItem[];
}
