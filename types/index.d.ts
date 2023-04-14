export interface Variable {
  name: string;
  options: string[];
  value?: string;
}

export type FormState = {
  id: number;
  keyword: string;
  variables: Variable[];
  selectedVariables: Record<string, string>;
  prompt: string;
  imageUrls: string[];
}

export type PostVariablesRequest = Pick<FormState, 'keyword'>

export type PostImagesRequest = Pick<FormState, 'keyword' | 'selectedVariables'>
