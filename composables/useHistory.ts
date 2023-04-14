import type { Ref } from 'vue'
import { FormState } from '~/types';

const key = `easy-dalle2-app.history`;

export const useHistory = () => {
  const history: Ref<FormState[]> = useState('history', () => {
    const raw = localStorage?.getItem(key);
    return raw ? (JSON.parse(raw) as FormState[]).sort((a, b) => b.id - a.id) : [];
  })

  const add = (history: Ref<FormState[]>) => (value: FormState) => {
    history.value.unshift(JSON.parse(JSON.stringify(value)));
    if (localStorage) {
      localStorage.setItem(key, JSON.stringify(history.value));
    }
  }

  return {
    value: readonly(history).value,
    add: add(history),
  }
}
