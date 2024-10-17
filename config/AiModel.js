const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// async function run() {
export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling marketplace in ancient Rome, with merchants selling their wares, people walking by, and the Colosseum in the background.\",\n    \"ContentText\": \"In the heart of ancient Rome, a bustling marketplace hummed with activity. Merchants hawked their wares, the air thick with the smells of spices and fresh bread. But amidst the chaos, a young woman named Cornelia, wife of the Roman general Scipio, stood alone, her face etched with grief.\"\n  },\n  {\n    \"imagePrompt\": \"Cornelia, a beautiful Roman woman in traditional clothing, stands in a marketplace, holding a locket with a picture of her late husband.\",\n    \"ContentText\": \"Scipio, her beloved husband, had fallen in battle just a few weeks prior. Cornelia, a woman known for her strength and intelligence, was devastated. She was a Roman noblewoman, but her true wealth, she believed, lay in her children.\"\n  },  \n  {\n    \"imagePrompt\": \"Cornelia surrounded by her three children, playing in a garden with a view of the Roman countryside.\",\n    \"ContentText\": \"She had three young children - two sons and a daughter - and she devoted herself to their upbringing. She taught them history, literature, and philosophy, nurturing their minds and preparing them for the future.\"\n  }, \n  {\n    \"imagePrompt\": \"A group of Roman matrons, dressed in elegant togas, gossiping and comparing their jewelry. One of them, Cornelia, holds a book while the others laugh and admire a piece of jewelry.\",\n    \"ContentText\": \"One day, another Roman matron approached Cornelia, boasting about her expensive jewelry and fine clothes. \"You are so lucky to have such beautiful things,\" she said. \"What are your treasures?\" \n  },\n  {\n    \"imagePrompt\": \"Cornelia smiling and holding up her three children, who look up at her with affection, while the other Roman matron looks on with a mixture of envy and admiration.\",\n    \"ContentText\": \"Cornelia smiled gently. \"My treasures,\" she replied, \"are these,\" and she gestured towards her children. \"They are my jewels.\"\n  }\n]\n```\n\n**Explanation of the Script:**\n\nThis JSON script contains five scenes, each with an `imagePrompt` and `ContentText` field. The script tells the story of Cornelia, a Roman noblewoman who valued her children above all else. \n\n**Image Prompts:**\n\n* The prompts are designed to be realistic and visually appealing, evoking the setting and atmosphere of ancient Rome.\n* They provide clear instructions for the AI image generator to create images that align with the script's narrative.\n\n**Content Text:**\n\n* The text is concise and engaging, providing the context and dialogue for each scene.\n* It emphasizes the themes of love, family, and the enduring legacy of Cornelia's values.\n\n**Creating the Video:**\n\n1. **Generate Images:** Use an AI image generator (like Midjourney or Dall-E 2) to create images based on the `imagePrompt`s.\n2. **Edit Images:** Enhance the generated images if needed, adjust the colors, and ensure consistency.\n3. **Add Text:** Add the `ContentText` to each image using a video editing software. Consider using a voiceover to narrate the story.\n4. **Assemble Scenes:** Combine the images and text to create a cohesive video.\n5. **Add Music:** Choose appropriate background music to enhance the emotional impact of the story.\n\n**Final Output:**\n\nThe resulting video will be a 30-second visual narrative of Cornelia's story, bringing ancient Rome to life and showcasing the enduring values of family and love. \n" },
            ],
        },
    ],
});

//     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     console.log(result.response.text());
// }

// run();