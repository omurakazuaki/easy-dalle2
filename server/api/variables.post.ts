export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
  const response =  await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {role: 'system', content: `Please output the details and attributes to be determined to embody the [theme of the image] according to the [output format] *without code blocks* in Japanese.
Please do not output any extra labels or supplements.

[theme of the image]
${payload.keyword}

[output format]
\`\`\`json
[
  { "name": "画像のスタイル", "options": ["写真", "デジタルアート", "3Dレンダリング", "油絵", "水彩", "クレヨン", "浮世絵", "ステンドグラス", "アニメ", "ピクセルアート"] },
  ...
]
\`\`\`
`},
    ],
    temperature: 0,
  });
  const completion = response?.data?.choices[0]?.message?.content || '';
  console.log(completion);
  return { variables: JSON.parse(completion) };
})
