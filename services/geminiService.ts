
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Standard model for complex reasoning and elder care assistance.
const MODEL_NAME = 'gemini-3-pro-preview';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initializing with named parameter as required.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateHealthAdvice(prompt: string): Promise<string> {
    try {
      // Calling generateContent with model name and prompt directly.
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          systemInstruction: "你是一个专业的AI康养助理，专门为老年人及其家属提供健康建议。语气要亲切、耐心、通俗易懂。如果用户咨询紧急医疗状况，必须提示立即就医。",
          temperature: 0.7,
        }
      });
      // Accessing text as a property.
      return response.text || "抱歉，我现在无法提供建议。";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "连接AI助理失败，请稍后再试。";
    }
  }

  async getChatResponse(history: {role: 'user'|'model', text: string}[], message: string): Promise<string> {
    try {
      const chat = this.ai.chats.create({
        model: MODEL_NAME,
        config: {
            systemInstruction: "你是一个智能康养机器人，名字叫'小悦'。你负责监测老年人的健康并提供暖心对话。保持简洁、温馨且关注健康细节。"
        }
      });
      
      // sendMessage only accepts message parameter as per guidelines.
      const response = await chat.sendMessage({ message });
      // Accessing text as a property.
      return response.text || "我没听清，请再说一遍？";
    } catch (error) {
      console.error("Chat Error:", error);
      return "服务繁忙，请稍等一下。";
    }
  }
}

export const geminiService = new GeminiService();
