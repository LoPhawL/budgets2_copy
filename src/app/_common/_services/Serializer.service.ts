import { Injectable } from "@angular/core";
import { DocumentChange, DocumentChangeType, QuerySnapshot } from "firebase/firestore";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { INamedDocumentsMap, NamedDocument } from "../_models/INamedDocument";
import { IParsedDocument } from "../_models/IParsedDocument";

@Injectable({
  providedIn: 'root'
})
export class SerializerService {

  constructor(private _toastr: ToastrService) {}

  public serializeDocumentsInCollectionAndEmit<T, T1 extends NamedDocument>(
    col: QuerySnapshot<T>,
    localDataStore: INamedDocumentsMap<T1>,
    entityName: string,
    emittable: BehaviorSubject<IParsedDocument<T1>>
  ) {
    const rawDocsData: Partial<T1>[] = Object.values(localDataStore);
    let dcChanges = col.docChanges();
    const rawChangeSet: { [key: string]: Partial<{ type: DocumentChangeType, doc: T1 }> } = {};
    for (let docChange of dcChanges) {
      const doc = docChange.doc;
      rawChangeSet[doc.id] = {
        type: docChange.type,
      };

      const namedDocName = localDataStore[doc.id]?.name;
      if (docChange.type === 'removed') {
        if(namedDocName) {
          this._toastr.info(`The ${entityName.toLowerCase()} '${namedDocName}' is deleted.`);
        }
        delete localDataStore[doc.id];
      } else if (localDataStore[doc.id]) { // docChange.type === 'modified'
        const t = doc.data({}) as unknown as T1;
        localDataStore[doc.id] = t;
        rawChangeSet[doc.id].doc = t;
        localDataStore[doc.id].id = doc.id;
        rawDocsData.push(t);
        if (namedDocName) {
          this._toastr.info(`The ${entityName.toLowerCase()} '${namedDocName}' just got updated.`);
        }
      } else {
        const t = doc.data() as unknown as T1;
        rawChangeSet[doc.id].doc = t;
        rawDocsData.push(t);
        localDataStore[doc.id] = t;
        localDataStore[doc.id].id = doc.id;
      }
    }
    const keys = Object.keys(localDataStore);
    emittable.next({ keys, values: localDataStore, length: keys.length, raw: rawDocsData, rawChangeSet });
}
}
