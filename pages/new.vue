<template>
<div>
  <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
    <a-form-item label="Keyword">
      <a-input v-model:value="keyword" @pressEnter="generateVariables" type="text"/>
    </a-form-item>
    <a-form-item v-for="variable in form.value.variables" :key="variable.name" :label="variable.name">
      <a-select v-model:value="selectedVariables[variable.name]">
        <a-select-option v-for="option in variable.options" :key="option">{{ option }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-if="form.value.variables.length > 0" :wrapper-col="{ offset: 4, span: 20 }">
      <a-button @click="generateImages">Generate Images</a-button>
    </a-form-item>
    <a-form-item v-if="form.value.variables.length > 0" :wrapper-col="{ offset: 4, span: 20 }">
      <a-button @click="reset">Reset</a-button>
    </a-form-item>
  </a-form>
  <a-row v-if="isLoading" style="font-size: 48px; justify-content: center">
    <loading-outlined />
  </a-row>
</div>
<rocket-outlined />
</template>

<script setup>
import {
  LoadingOutlined,
} from "@ant-design/icons-vue";
const form = useForm();
const history = useHistory();
const isLoading = useState('isLoading', () => false);
const keyword = ref(form.value.keyword);
const selectedVariables = ref({...form.value.selectedVariables});
const setLoading = value => isLoading.value = value;
const router = useRouter();
const generateVariables = async () => {
  form.setKeyword(keyword.value);
  setLoading(true);
  const { data } = await useFetch('/api/variables', {
    method: 'POST',
    body: {
      keyword: keyword.value,
    }
  });
  selectedVariables.value = {};
  form.setVariables(data.value.variables);
  setLoading(false);
};
const generateImages = async () => {
  console.log(selectedVariables.value)
  form.setSelectedVariables(selectedVariables.value);
  setLoading(true);
  const { data } = await useFetch('/api/images', {
    method: 'POST',
    body: {
      keyword: form.value.keyword,
      selectedVariables: form.value.selectedVariables,
    }
  });
  form.setPromptAndImageUrls(data.value.prompt, data.value.imageUrls);
  history.add(form.value);
  router.push(`/history/${form.value.id}`);
  setLoading(false);
  form.reset();
}
const reset = () => {
  form.reset();
  keyword.value = '';
  selectedVariables.value = {};
}
</script>
