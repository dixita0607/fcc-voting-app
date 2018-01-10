import {Component, Input, OnInit, Output} from '@angular/core';
import {Poll} from "../../models/poll";
import {PollService} from "../../services/poll.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'fcc-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss']
})
export class PollsComponent implements OnInit {

  @Input()
  polls: Poll[];

  @Output()
  refresh: EventEmitter<null> = new EventEmitter();

  constructor(public authService: AuthService,
              private pollService: PollService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  onDelete(pollId) {
    this.pollService.deletePoll(pollId).subscribe(
      response => {
        this.toastService.showToast('Poll deleted.');
      },
      error => {
        this.toastService.showToast('Could not delete poll.', true);
      },
      () => {
        this.refresh.emit();
      }
    );
  }

}
