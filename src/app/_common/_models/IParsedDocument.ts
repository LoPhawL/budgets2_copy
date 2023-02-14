import { INamedDocumentsMap, NamedDocument } from "./INamedDocument";

export interface IParsedDocument<T extends NamedDocument> {
  keys: string[];
  values: INamedDocumentsMap<T>;
  length: number;
}
