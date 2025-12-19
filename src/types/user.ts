export interface User {
  uuid: string
  name: string;
  email: string;
  image: string;
  isFavorite: boolean;
  pageFetched: number;
}