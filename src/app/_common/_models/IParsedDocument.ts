import { DocumentChangeType } from "firebase/firestore";
import { INamedDocumentsMap, NamedDocument } from "./INamedDocument";

export interface IParsedDocument<T extends NamedDocument> {
  keys: string[];
  values: INamedDocumentsMap<T>;
  length: number;
  raw: Partial<T>[];
  rawChangeSet: { [key: string]: Partial<{ type: DocumentChangeType, doc: T}> }
}
