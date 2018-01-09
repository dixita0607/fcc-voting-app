import {Injectable} from '@angular/core';

@Injectable()
export class ToastService {

  message: string;
  showing: boolean = false;
  private timer: number;
  isError: boolean;

  constructor() {
  }

  showToast(message: string, isError: boolean = false) {
    clearTimeout(this.timer);
    this.isError = isError;
    this.showing = false;
    this.timer = setTimeout(() => {
      this.message = message;
      this.showing = true;
      this.timer = setTimeout(() => this.showing = false, 3000);
    }, 300);
  }
}
