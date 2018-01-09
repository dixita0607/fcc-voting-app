import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PollService} from "../../services/poll.service";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss']
})
export class AddOptionComponent implements OnInit {

  formGroup: FormGroup;
  adding: boolean = false;

  @Output()
  optionAdd: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private pollService: PollService,
              private activatedRoutes: ActivatedRoute,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.createAddOptionForm();
  }

  createAddOptionForm() {
    this.formGroup = this.fb.group({
      option: ''
    });
  }

  onSubmit() {
    let pollId: string;
    this.adding = true;
    this.activatedRoutes.params.subscribe(params => pollId = params['id']);
    this.pollService.addOption(pollId, this.formGroup.controls['option'].value).subscribe(response => {
      this.toastService.showToast('Option added.');
      this.adding = false;
    }, error => {
      this.toastService.showToast('Could not add option.', true);
      this.adding = false;
    }, () => {
      this.optionAdd.emit();
    });
  }
}
