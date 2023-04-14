export default defineEventHandler(async (event) => {
  const payload = await readBody(event);
    const response =  await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {role: 'system', content: `We want to generate an image based on [theme of the image] and [variables] using the image generation AI.
Please output only the prompt [output format] in English to generate the image.
Please do not output any extra labels or supplements.

[theme of the image]
${payload.keyword}

[variables]
${Object.entries(payload.selectedVariables).map(([ name, value ]) => `${name}=${value}`).join('\n')}

[output format]
{Description of the image We want to generate}, {Comma Separated Keywords}

[prompt example]
* 3D render of a floating futuristic castle in a clear sky, digital art
* A beautiful house in tropical modernism style inside of a forest and full of trees and plants
* a cowboy gunslinger walking the neon lit streets and alleys of a futuristic tokyo covered in a dense fog
* portrait of a young woman, brown medium hair, clean skin, hazel eyes, intricate artwork by Joaquin Sorolla, soft natural light, 85mm, sunshine on her face, lights and shadows
* Ultrawide, « lake of Annecy » with golden ratio style, 4K , foreground is prairie, light is Golden hour, sky with red Clouds, ultrarealistic, CinémaScope, ultra wide format, ratio 16/9, 1/1000 sec, maximum resolution, Sharp details
* an expressive gouache painting of San Francisco bay bridge, sunset, photorealistic
* A ktm motorcycle in a narrow cyberpunk street, photography
* hot dark hair girl, looking at viewer, portrait, photography, detailed skin, realistic, photo-realistic, 8k, highly detailed, full length frame, piercing, diffused soft lighting, shallow depth of field, sharp focus, hyperrealism, cinematic lighting
`},
      ],
      temperature: 0,
    });

    const prompt = response?.data?.choices[0]?.message?.content || '';
    console.log(prompt);
    const imageResponse = await openai.createImage({
      prompt,
      n: 4,
      size: "512x512",
    });
    const imageUrls = imageResponse.data.data.map((data: any) => data.url)
    console.log(imageUrls);
  return { imageUrls, prompt };
})
