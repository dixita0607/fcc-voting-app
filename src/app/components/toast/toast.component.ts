import {Component, OnInit} from '@angular/core';
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'fcc-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(public toastService: ToastService) {
  }

  ngOnInit() {
  }

}
