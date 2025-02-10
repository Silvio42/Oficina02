export type Params = { name: string; workshop: string; email: string };
export type Response = void;

export interface ICreateVolunteersData {
  create(params: Params): Promise<Response>;
}
