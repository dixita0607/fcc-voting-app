import {Component, OnInit, OnChanges} from '@angular/core';
import "rxjs/add/operator/map";
import {Poll} from "../../models/poll";
import {PollService} from "../../services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-user-polls',
  templateUrl: 'user-polls.component.html',
  styleUrls: ['user-polls.component.scss']
})
export class UserPollsComponent implements OnInit {

  polls: Poll[] = [];

  constructor(private pollService: PollService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getPolls();
    })
  }

  getPolls(): void {
    this.pollService.getByUser(this.activatedRoute.snapshot.params.username)
      .subscribe(
        response => {
          this.polls = response;
        },
        error => {
          this.toastService.showToast('Could not get polls.', true);
        }
      );
  }

  onRefresh() {
    this.getPolls();
  }

}
