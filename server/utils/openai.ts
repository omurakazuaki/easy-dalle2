import { Configuration, OpenAIApi } from 'openai';
const { openaiApiKey: apiKey } = useRuntimeConfig()
const configuration = new Configuration({apiKey});
export const openai = new OpenAIApi(configuration);
