import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PollService} from "../../services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Poll} from "../../models/poll";
import {AuthService} from "../../services/auth.service";
import {connectableObservableDescriptor} from "rxjs/observable/ConnectableObservable";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  poll: Poll;
  addingOption: boolean = false;
  pollId: string;
  optionsForm: FormGroup;
  location: string;

  @ViewChild('link')
  link: ElementRef;

  constructor(private pollsService: PollService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.pollId = params['id'];
      this.getPoll(this.pollId);
    });
    this.createOptionsForm();
    this.location = window.location.href;
  }

  createOptionsForm() {
    this.optionsForm = this.fb.group({
      option: ''
    })
  }

  getPoll(id: string) {
    this.pollsService.getById(id).subscribe(
      response => {
        this.poll = response;
      },
      error => console.log(error)
    );
  }

  onAddClick() {
    this.addingOption = true;
  }

  onOptionAddHandler() {
    this.addingOption = false;
    this.getPoll(this.pollId);
  }

  vote() {
    return this.pollsService.votePoll(this.pollId, this.optionsForm.controls['option'].value)
      .subscribe(
        response => {
          this.getPoll(this.pollId);
          this.toastService.showToast('Voted successfully.');
        },
        error => {
          this.toastService.showToast('Could not vote.', true);
        });
  }

  copyUrl() {
    this.link.nativeElement.select();
    document.execCommand('Copy');
    this.toastService.showToast('Link copied.');
  }
}
