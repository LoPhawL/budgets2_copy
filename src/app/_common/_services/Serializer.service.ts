import { Injectable } from "@angular/core";
import { QuerySnapshot } from "firebase/firestore";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject } from "rxjs";
import { INamedDocumentsMap, NamedDocument } from "../_models/INamedDocument";
import { IParsedDocument } from "../_models/IParsedDocument";

@Injectable({
  providedIn: 'root'
})
export class SerializerService {

  constructor(private _toastr: ToastrService) {}

  public serializeNamedDocumentsInCollectionAndEmit<T, T1 extends NamedDocument>(
    col: QuerySnapshot<T>,
    localDataStore: INamedDocumentsMap<T1>,
    entityName: string,
    emittable: BehaviorSubject<IParsedDocument<T1>>
  ) {
  for (let docChange of col.docChanges()) {
    const doc = docChange.doc;
    const namedDocName = localDataStore[doc.id]?.name;
    if (docChange.type === 'removed') {
      if(namedDocName) {
        this._toastr.info(`The ${entityName.toLowerCase()} '${namedDocName}' is deleted.`);
      }
      delete localDataStore[doc.id];
    } else if (localDataStore[doc.id]) {
      localDataStore[doc.id] = doc.data({}) as unknown as T1;
      if (namedDocName) {
        this._toastr.info(`The ${entityName.toLowerCase()} '${namedDocName}' just got updated.`);
      }
    } else {
      localDataStore[doc.id] = doc.data() as unknown as T1;
    }
  }
  const keys = Object.keys(localDataStore);
  emittable.next({ keys, values: localDataStore, length: keys.length });
}
}
