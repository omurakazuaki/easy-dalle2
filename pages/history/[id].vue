<template>
<div>
  <a-row>
    <a-col>
      <a-form-item>
        <a-button @click="copy">Copy</a-button>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row>
    <a-col>
      <a-form-item>
        <a-statistic title="Keyword" :value="form.keyword"/>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row>
    <a-col v-for="variable in form.variables" :key="variable.name" :span="12">
      <a-form-item>
        <a-statistic :title="variable.name" :value="form.selectedVariables[variable.name]"/>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row>
    <a-col>
      <a-form-item>
        <a-statistic title="prompt" :value="form.prompt"/>
      </a-form-item>
    </a-col>
    <a-col>
      <a-form-item>
        <a-space v-for="(imageUrl, index) in form.imageUrls" :key="index">
          <img :src="imageUrl" />
        </a-space>
      </a-form-item>
    </a-col>
  </a-row>
</div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const copyForm = useForm();
const history = useHistory();
const form = history.value.find(data => data.id === Number(route.params.id));
const copy = () => {
  copyForm.reset();
  copyForm.setKeyword(form.keyword);
  copyForm.setVariables(form.variables);
  copyForm.setSelectedVariables(form.selectedVariables);
  router.push('/new');
}
</script>
