export class NamedDocument {

  public id: string;
  public name?: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface INamedDocumentsMap<T extends NamedDocument> {
  [key:string]: Partial<T>;
}
