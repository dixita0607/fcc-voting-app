import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {PollsComponent} from "./components/polls/polls.component";
import {HomeComponent} from "./components/home/home.component";
import {UserPollsComponent} from "./components/user-polls/user-polls.component";
import {PollComponent} from "./components/poll/poll.component";
import {CreatePollComponent} from "./components/create-poll/create-poll.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'users/:username/polls', component: UserPollsComponent},
  {path: 'users/:username/polls/create', component: CreatePollComponent},
  {path: 'polls/:id', component: PollComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
