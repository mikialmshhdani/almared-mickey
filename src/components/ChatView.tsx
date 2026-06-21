import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "genie";
  timestamp: Date;
}

const GENIE_PERSONALITY = `أنت المارد ميكي، مساعد ذكي باللهجة العراقية.

تكلم باللهجة العراقية الطبيعية.
قول:
هلا شلونك؟
شلون أگدر أساعدك؟
شنو تحتاج؟
تمام حبيبي.

استخدم كلمات عراقية:
هلا، شلونك، شنو، أگدر، يمعود، خوش، تمام.

لا تستخدم الفصحى إلا إذا طلب المستخدم.`;

const IRAQI_RESPONSES = [
  "هلا شلونك؟ شلون أگدر أساعدك؟",
  "تمام حبيبي، شنو تحتاج؟",
  "خوش! أگدر أساعدك بشنو تريد؟",
  "هلا يمعود! شلون أگدر خدمتك؟",
  "تمام تمام، شنو الموضوع؟",
  "هاي! شلونك اليوم؟ شنو تحتاج؟",
  "هلا والله! خوش تسألني، شنو عندك؟",
];

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "هلا شلونك؟ أنا المارد ميكي، مساعدك الذكي. شلون أگدر أساعدك اليوم؟",
      sender: "genie",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = (): string => {
    return IRAQI_RESPONSES[Math.floor(Math.random() * IRAQI_RESPONSES.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate genie response with Iraqi dialect
    setTimeout(() => {
      const genieResponse: Message = {
        id: messages.length + 2,
        text: getRandomResponse(),
        sender: "genie",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, genieResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-slate-700 px-6 py-4 border-b border-slate-600">
          <h3 className="text-xl font-bold text-white">المحادثة مع المارد ميكي</h3>
          <p className="text-slate-400 text-sm mt-1">مساعدك الذكي باللهجة العراقية</p>
        </div>

        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-slate-600 text-white rounded-tr-none"
                    : "bg-cyan-500 text-white rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString("ar-SA", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-slate-700 px-4 py-4 border-t border-slate-600">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 bg-slate-600 text-white placeholder-slate-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-500 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-lg transition-all"
            >
              إرسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}