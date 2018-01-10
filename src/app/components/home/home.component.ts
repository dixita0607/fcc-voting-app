import {Component, OnInit} from '@angular/core';
import {PollService} from "../../services/poll.service";
import {Poll} from "../../models/poll";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  polls: Poll[];

  constructor(private pollService: PollService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.getPolls();
  }

  getPolls() {
    this.pollService.getPolls()
      .subscribe(
        response => this.polls = response,
        error => {
          this.toastService.showToast('Could not get polls.', true);
        }
      );
  }

  onRefresh() {
    this.getPolls();
  }


}
