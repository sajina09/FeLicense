export interface Question {
  id: number;
  title: string;
  A: string;
  B: string;
  C: string;
  D: string;
  group?: string;
  explanation?: string;
  correct_answer?: string;
}

export interface ModelSet {
  id: number;
  questions: Question[];
  set_name: string;
  model_set_link: string;
}
