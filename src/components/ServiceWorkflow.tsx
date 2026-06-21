import { useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: "available" | "busy" | "offline";
}

export function ServiceWorkflow() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      title: "كتابة المحتوى",
      description: "إنشاء مقالات ونصوص احترافية باللغة العربية والإنجليزية",
      icon: "✍️",
      status: "available",
    },
    {
      id: 2,
      title: "تحليل البيانات",
      description: "تحليل وتفسير البيانات مع تقارير مفصلة",
      icon: "📊",
      status: "available",
    },
    {
      id: 3,
      title: "الترجمة",
      description: "ترجمة احترافية بين اللغات المختلفة",
      icon: "🌐",
      status: "busy",
    },
    {
      id: 4,
      title: "البرمجة",
      description: "مساعدة في كتابة وتصحيح الأكواد البرمجية",
      icon: "💻",
      status: "available",
    },
    {
      id: 5,
      title: "التصميم",
      description: "نصائح وأفكار للتصميم الجرافيكي وواجهات المستخدم",
      icon: "🎨",
      status: "offline",
    },
    {
      id: 6,
      title: "التلخيص",
      description: "تلخيص النصوص الطويلة بشكل موجز وواضح",
      icon: "📝",
      status: "available",
    },
  ];

  const getStatusColor = (status: Service["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: Service["status"]) => {
    switch (status) {
      case "available":
        return "متاح";
      case "busy":
        return "مشغول";
      case "offline":
        return "غير متاح";
      default:
        return "";
    }
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setShowDetails(true);
  };

  const handleStartService = () => {
    alert(`جاري بدء خدمة: ${selectedService?.title}`);
    setShowDetails(false);
    setSelectedService(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-700 px-6 py-4 border-b border-slate-600">
          <h3 className="text-xl font-bold text-white">الخدمات المتاحة</h3>
          <p className="text-slate-400 text-sm mt-1">اختر الخدمة التي تحتاجها</p>
        </div>

        {/* Services Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className={`bg-slate-700 rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-600 border border-slate-600 hover:border-cyan-500 ${
                  selectedService?.id === service.id ? "ring-2 ring-cyan-500" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{service.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                    <span className="text-xs text-slate-400">{getStatusText(service.status)}</span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
                <p className="text-sm text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {showDetails && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold text-white">{selectedService.title}</h4>
              <button
                onClick={() => setShowDetails(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <span className="text-4xl">{selectedService.icon}</span>
            </div>
            <p className="text-slate-300 mb-6">{selectedService.description}</p>
            <div className="flex items-center gap-2 mb-6">
              <span className={`w-3 h-3 rounded-full ${getStatusColor(selectedService.status)}`} />
              <span className="text-slate-400">الحالة: {getStatusText(selectedService.status)}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-medium py-3 rounded-lg transition-all"
              >
                إلغاء
              </button>
              <button
                onClick={handleStartService}
                disabled={selectedService.status === "offline"}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-500 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all"
              >
                بدء الخدمة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}