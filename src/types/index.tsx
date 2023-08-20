export interface Question {
  id: number;
  title: string;
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface ModelSet {
  id: number;
  questions: Question[];
  set_name: string;
}
