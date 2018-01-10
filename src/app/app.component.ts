import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ActivationEnd, NavigationEnd, Router} from "@angular/router";
import {CreatePollComponent} from "./components/create-poll/create-poll.component";
import {UserPollsComponent} from "./components/user-polls/user-polls.component";

@Component({
  selector: 'fcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title: string = 'FCC Voting App';
  showCreatePoll: boolean;
  showMyPolls: boolean;

  constructor(public authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd)
        switch (event.snapshot.component) {
          case CreatePollComponent:
            this.showMyPolls = true;
            this.showCreatePoll = false;
            break;
          case UserPollsComponent:
            this.showCreatePoll = true;
            this.showMyPolls = this.authService.user && this.authService.user.username != event.snapshot.params.username;
            break;
          default:
            this.showMyPolls = true;
            this.showCreatePoll = true;
            break;
        }
    });
  }

  onLogout() {
    this.authService.logOut().subscribe(response => this.router.navigate(['/']));
  }

  onCreatePoll() {
    this.router.navigate([`/users/${this.authService.user.username}/polls/create`]);
  }

  onClickMyPolls() {
    this.router.navigate([`/users/${this.authService.user.username}/polls`])
  }

}
