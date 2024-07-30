export type Province = {
  population?: number;
  name: string;
  sort: string;
  token: string;
  code: string;
};

export type Provinces = Map<Province['token'], Province>;
