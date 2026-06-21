import { useState } from "react";
import { GenieAvatar } from "./components/GenieAvatar";
import { ChatView } from "./components/ChatView";
import { ServiceWorkflow } from "./components/ServiceWorkflow";

function App() {
  const [activeTab, setActiveTab] = useState<"chat" | "services">("chat");

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header with Avatar */}
      <header className="flex items-center justify-between p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-white">
          مرحباً بك
        </h1>
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-cyan-400">
            المارد ميكي
          </h2>
          <GenieAvatar />
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="flex gap-2 p-4 bg-slate-800 border-b border-slate-700">
        <button
          onClick={() => setActiveTab("chat")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === "chat"
              ? "bg-cyan-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          المحادثة
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            activeTab === "services"
              ? "bg-cyan-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          الخدمات
        </button>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "chat" ? <ChatView /> : <ServiceWorkflow />}
      </main>
    </div>
  );
}

export default App;