import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { buildPrompt } from "@/helpers/geminiPrompt";
import { TPromptAttributes } from "@/types/idea";

const schema = {
  description: "List of gift ideas categorized by type",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      category: {
        type: SchemaType.STRING,
        description: "Name of the gift category",
        nullable: false,
      },
      ideas: {
        type: SchemaType.ARRAY,
        description: "List of ideas within this category",
        items: {
          type: SchemaType.STRING,
          description: "A single gift idea",
          nullable: false,
        },
        nullable: false,
      },
    },
    required: ["category", "ideas"],
  },
};

const initGenerativeModel = () => {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY as string,
  );
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You only come up with ideas for gifts/presents. The response must be in JSON format. Always suggest at least 3 ideas for each category.`,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
};

export const getGeminiResponse = async (attributes: TPromptAttributes) => {
  const model = initGenerativeModel();
  const structuredPrompt = buildPrompt(attributes);

  const result = await model.generateContent(structuredPrompt);
  return result.response.text();
};
