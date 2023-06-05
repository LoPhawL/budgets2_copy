import { ChangeDetectionStrategy, Component, Input, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-bulk-transcation-add-lable',
  templateUrl: './bulk-transcation-add-lable.component.html',
  styleUrls: ['./bulk-transcation-add-lable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkTranscationAddLableComponent {
  icon = faTimesCircle;
  labels: string[] = [];

  @Input()
  disable: boolean = false;

  @Output()
  onCancelled = new Subject<void>();

  @Output()
  onAdded = new Subject<string[]>();

  onLabelAdded(event: Event){
    const inputElement = <HTMLInputElement>event.target;
    const label = inputElement.value.replaceAll(' ', '');
    
    if (label) {
      this.labels.push(inputElement.value);
      inputElement.value = '';
    }
  }

  removeLabel(label: string) {
    this.labels.splice(this.labels.indexOf(label), 1);
  }

  cancel() {
    this.onCancelled.next();
  }

  save() {
    if(this.labels.length) {
      this.onAdded.next(this.labels);
    }
  }
}
