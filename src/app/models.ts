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

export interface JuejinColumn {
  name: string;
  id: string;
}
export interface JuejinArticle {
  index: number;
  title: string;
  html: string;
  markdown: string;
}

export interface Bookmark {
  id: number;
  context: string;
  content: string;
}

export interface Tag {
  id: number;
  name: string;
  bookmarks: number[];
}
