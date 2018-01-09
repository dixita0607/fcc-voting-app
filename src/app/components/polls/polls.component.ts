import {Component, Input, OnInit} from '@angular/core';
import {Poll} from "../../models/poll";
import {PollService} from "../../services/poll.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  @Input()
  polls: Poll[] = [];

  constructor(public authService: AuthService,
              private pollService: PollService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.getPolls();
  }

  getPolls() {
    this.pollService.getPolls()
      .subscribe(
        response => this.polls = response
      );
  }

  onDelete(pollId) {
    this.pollService.deletePoll(pollId).subscribe(
      response => {
        this.getPolls();
        this.toastService.showToast('Poll deleted.');
      },
      error => {
        this.toastService.showToast('Could not delete poll.', true);
      }
    );
  }

}
