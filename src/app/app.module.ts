import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {PollService} from "./services/poll.service";
import {PollsComponent} from './components/polls/polls.component';
import {HomeComponent} from './components/home/home.component';
import {UserPollsComponent} from './components/user-polls/user-polls.component';
import {AuthService} from "./services/auth.service";
import {PollComponent} from './components/poll/poll.component';
import {AddOptionComponent} from './components/add-option/add-option.component';
import {CreatePollComponent} from './components/create-poll/create-poll.component';
import {PollChartComponent} from './components/poll-chart/poll-chart.component';
import {ToastComponent} from './components/toast/toast.component';
import {ToastService} from "./services/toast.service";
import {EmojiPipe} from './pipes/emoji.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PollsComponent,
    HomeComponent,
    UserPollsComponent,
    PollComponent,
    AddOptionComponent,
    CreatePollComponent,
    PollChartComponent,
    ToastComponent,
    EmojiPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PollService,
    AuthService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
