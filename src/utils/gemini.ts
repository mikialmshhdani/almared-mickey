const GENIE_SYSTEM_PROMPT = `أنت المارد ميكي، مساعد ذكي باللهجة العراقية.

تكلم باللهجة العراقية الطبيعية.
قول:
هلا شلونك؟
شلون أگدر أساعدك؟
شنو تحتاج؟
تمام حبيبي.

استخدم كلمات عراقية:
هلا، شلونك، شنو، أگدر، يمعود، خوش، تمام.

لا تستخدم الفصحى إلا إذا طلب المستخدم.`;

export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory: GeminiMessage[] = []
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    // Return a simulated Iraqi response if no API key
    return getSimulatedIraqiResponse(userMessage);
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const systemMessage: GeminiMessage = {
    role: "user",
    parts: [{ text: GENIE_SYSTEM_PROMPT }],
  };

  const modelResponse: GeminiMessage = {
    role: "model",
    parts: [{ text: "فهمت! راح أتكلم باللهجة العراقية. هلا شلون أگدر أساعدك؟" }],
  };

  const newUserMessage: GeminiMessage = {
    role: "user",
    parts: [{ text: userMessage }],
  };

  const contents = [systemMessage, modelResponse, ...conversationHistory, newUserMessage];

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || getSimulatedIraqiResponse(userMessage);
  } catch (error) {
    console.error("Gemini API error:", error);
    return getSimulatedIraqiResponse(userMessage);
  }
}

function getSimulatedIraqiResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  const responses: Record<string, string[]> = {
    greeting: [
      "هلا شلونك؟ تمام؟",
      "هلا والله! شلونك اليوم؟",
      "هاي يمعود! شلون أگدر أساعدك؟",
    ],
    help: [
      "خوش! شنو تحتاج مساعدة؟",
      "تمام حبيبي، أگدر أساعدك بشنو؟",
      "هاي! شلون أگدر خدمتك؟",
    ],
    thanks: [
      "عافاك! أي خدمة ثانية أهنا",
      "تمام! ما تحتاج شي ثاني؟",
      "خوش! إذا رايد شي ثاني قوللي",
    ],
    default: [
      "هلا! شلون أگدر أساعدك؟",
      "تمام، شنو الموضوع؟",
      "خوش! قولي شنو تحتاج؟",
    ],
  };

  if (lowerMessage.includes("مرحبا") || lowerMessage.includes("هلا") || lowerMessage.includes("سلام")) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }

  if (lowerMessage.includes("ساعد") || lowerMessage.includes("مساعدة") || lowerMessage.includes("احتاج")) {
    return responses.help[Math.floor(Math.random() * responses.help.length)];
  }

  if (lowerMessage.includes("شكرا") || lowerMessage.includes("شكراً") || lowerMessage.includes("عافاك")) {
    return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
  }

  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

export { GENIE_SYSTEM_PROMPT };