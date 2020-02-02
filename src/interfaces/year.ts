import { Participant } from '@/interfaces/participant';
import { Question } from '@/interfaces/question';

export interface Year {
  participants: Participant[];
  questions: Question[];
}
