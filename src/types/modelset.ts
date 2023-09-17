export interface QuestionA {
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

export interface ModelSetA {
  id: number;
  questions: QuestionA[];
  set_name: string;
  model_set_link: string;
}
