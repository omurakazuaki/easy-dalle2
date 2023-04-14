import type { Ref } from 'vue'
import { FormState, Variable } from '~/types';

export const useForm = () => {
  const form: Ref<FormState> = useState('form', () => {
    return {
      id: 0,
      keyword: '',
      variables: [],
      selectedVariables: {},
      prompt: '',
      imageUrls: [],
    }
  });

  const setKeyword = ((form: Ref<FormState>) => (value: string) => {
    form.value.keyword = value;
  })(form);

  const setVariables = ((form: Ref<FormState>) => (value: Variable[]) => {
    form.value.variables = value;
    form.value.selectedVariables = {};
    form.value.imageUrls = [];
  })(form);

  const setSelectedVariables = ((form: Ref<FormState>) => (selectedVariables: Record<string, string>) => {
    form.value.selectedVariables = selectedVariables;
  })(form);

  const setPromptAndImageUrls = ((form: Ref<FormState>) => (prompt: string, imageUrls: string[]) => {
    form.value.id = Date.now();
    form.value.prompt = prompt;
    form.value.imageUrls = imageUrls;
  })(form);

  const reset = () => {
    setKeyword('');
    setVariables([]);
    setSelectedVariables({});
    setPromptAndImageUrls('', []);
  }

  return {
    value: readonly(form).value,
    reset,
    setKeyword,
    setVariables,
    setSelectedVariables,
    setPromptAndImageUrls,
  }
}
