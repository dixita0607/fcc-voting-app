import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs/Observable";
import {Poll} from "../models/poll";
import {PollForm} from "../models/poll-form";

@Injectable()
export class PollService {

  constructor(private httpClient: HttpClient) {
  }

  private pollsUrl = '/api/polls';

  getPolls(): Observable<Poll[]> {
    return this.httpClient.get<Poll[]>(this.pollsUrl);
  }

  getByUser(username: string): Observable<Poll[]> {
    return this.httpClient.get<Poll[]>(`/api/users/${username}/polls`);
  }

  getById(pollId: string): Observable<Poll> {
    return this.httpClient.get<Poll>(`${this.pollsUrl}/${pollId}`);
  }

  createPoll(pollForm: PollForm): Observable<string> {
    return this.httpClient.post(this.pollsUrl, pollForm, {responseType: 'text'});
  }

  deletePoll(pollId: string) {
    return this.httpClient.delete(`${this.pollsUrl}/${pollId}`, {responseType: 'text'});
  }

  votePoll(pollId: string, title: string): Observable<string> {
    return this.httpClient.post(
      `${this.pollsUrl}/${pollId}/vote`,
      {title},
      {responseType: 'text'}
    );
  }

  addOption(pollId: string, pollTitle: string): Observable<string> {
    return this.httpClient.post(
      `${this.pollsUrl}/${pollId}/options`,
      {title: pollTitle},
      {responseType: 'text'}
    );
  }

}
