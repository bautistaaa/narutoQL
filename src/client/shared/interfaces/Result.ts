export interface Draft {
  id: string;
  timeStamp: number;
  changes: {
    key: string;
    newValue: string;
  }[];
}
interface Result {
  _id: number;
  age: number;
  avatarSrc: string;
  description: string;
  firstAnimeAppearance: string;
  firstMangaAppearance: string;
  name: string;
  nameMeaning: string;
  notableQuotes: string;
  rank: string;
  village: string;
  drafts?: Draft[];
}

export default Result;
