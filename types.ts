
export interface Option {
  value: string;
  label: string;
}

export interface Lesion {
  title: string;
  details: string;
  criteria: string;
}

export interface Question {
  id: number;
  name: string;
  text: string;
  options: Option[];
  lesion?: Lesion;
}

export interface Section {
  id: number;
  title: string;
  questions: Question[];
}

export interface Answers {
  [key: string]: string;
}

export interface Diagnosis {
  title: string;
  description: string;
  recommendations: string[];
}
