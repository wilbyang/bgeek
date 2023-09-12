export interface Column {
  title: string;
  cid: number;
  count: number;
  id: number;

}
export interface Article {
  id: number;
  columnId: number;
  title: string;
  summary: string;
  content: string;
}
