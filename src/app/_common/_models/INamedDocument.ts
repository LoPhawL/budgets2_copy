export interface INamedDocument {
  name: string;
}

export interface INamedDocumentMap<T> {
  [key:string]: Partial<T>;
}
