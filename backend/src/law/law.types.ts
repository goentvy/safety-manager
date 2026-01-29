export interface LawItem {
  title: string;
  content: string;
}

export interface LawResponse {
  response?: {
    body?: {
      items?: {
        item?: LawItem[];
      };
    };
  };
}
