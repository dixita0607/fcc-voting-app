import {PollOption} from "./poll-option";

export interface Poll {
  id: string;
  title: string;
  author: string;
  options: PollOption[];
  voted: boolean;
}
