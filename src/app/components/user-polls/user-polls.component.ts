import {Component, OnInit} from '@angular/core';
import "rxjs/add/operator/map";
import {Poll} from "../../models/poll";
import {PollService} from "../../services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'fcc-user-polls',
  templateUrl: 'user-polls.component.html',
  styleUrls: ['user-polls.component.scss']
})
export class UserPollsComponent implements OnInit {

  polls: Poll[] = [];
  loading: boolean = true;

  constructor(private pollService: PollService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.getUserPolls(params['username']));
  }

  getUserPolls(username: string): void {
    this.pollService.getByUser(username).subscribe(
      response => {
        this.polls = response;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.router.navigate(['/home']);
      }
    );
  }

}
