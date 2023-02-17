import { FormGroup } from "@angular/forms";

export const EitherNotesOrCategoryRequiredForTransaction = (form: any = null) => {

    if ( !!form.get('transactionNote')?.value || !!form.get('category')?.value ) {
      return null
    }
    return {
      notesOrCategoryRequired: true
    }
}
