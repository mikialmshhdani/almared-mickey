export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GENIE_SYSTEM_PROMPT = `أنت المارد ميكي، مساعد ذكي باللهجة العراقية.

تكلم باللهجة العراقية الطبيعية.
قول:
هلا شلونك؟
شلون أگدر أساعدك؟
شنو تحتاج؟
تمام حبيبي.

استخدم كلمات عراقية:
هلا، شلونك، شنو، أگدر، يمعود، خوش، تمام.

لا تستخدم الفصحى إلا إذا طلب المستخدم.

لا تعطِ ردود قصيرة ثابتة فقط.
جاوب على سؤال المستخدم بشكل طبيعي ومفيد.
ناقش المستخدم وافهم كلامه.
إذا سأل عن تصميم أو تسويق أو محتوى، أعطه جواب عملي واضح باللهجة العراقية.`;

export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
  error?: {
    message?: string;
    status?: string;
  };
}

export async function sendMessageToGemini(
  userMessage: string,
  conversationHistory: GeminiMessage[] = []
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return "المفتاح مال Gemini مو موجود بـ Vercel. تأكد من VITE_GEMINI_API_KEY.";
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const contents: GeminiMessage[] = [
    {
      role: "user",
      parts: [{ text: GENIE_SYSTEM_PROMPT }],
    },
    {
      role: "model",
      parts: [{ text: "هلا شلونك؟ شلون أگدر أساعدك؟" }],
    },
    ...conversationHistory,
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.85,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data: GeminiResponse = await response.json();

    if (data.error) {
      return `صار خطأ من Gemini: ${data.error.message || data.error.status || "غير معروف"}`;
    }

    if (!response.ok) {
      return `صار خطأ بالاتصال: ${response.status}`;
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return "ما وصلني رد من Gemini، جرّب تكتب سؤالك مرة ثانية.";
    }

    return reply.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "صار خطأ بالاتصال ويا Gemini. تأكد من الإنترنت والمفتاح.";
  }
}

export { GENIE_SYSTEM_PROMPT };