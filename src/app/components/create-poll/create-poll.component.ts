import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PollService} from "../../services/poll.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {

  formGroup: FormGroup;

  enableCreate: boolean = false;

  constructor(private fb: FormBuilder,
              private pollService: PollService,
              private router: Router,
              private authService: AuthService,
              private toastService: ToastService) {
    if (!this.authService.user) this.router.navigate(['/polls']);
  }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      title: this.fb.control(''),
      options: this.fb.array([
        this.fb.control(''),
        this.fb.control('')
      ])
    });
  }

  addOption() {
    const options = <FormArray> this.formGroup.controls['options'];
    options.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.formGroup);
    this.pollService.createPoll(this.formGroup.value).subscribe(response => {
      this.router.navigate([`/users/${this.authService.user.username}/polls`]);
      this.toastService.showToast('Poll added.');
    }, error => {
      this.toastService.showToast('Could not add poll.', true);
    });
  }

}
