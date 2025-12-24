
import React, { useState } from 'react';
import { Layout, LineChart, Users, PlayCircle, Home, Heart, ShieldAlert, Bell, PhoneCall, Droplets } from 'lucide-react';
import { VitalSign, HealthStatus, VideoRecommendation } from './types';
import { VitalCard } from './components/VitalCard';
import { ChatWidget } from './components/ChatWidget';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const MOCK_VITALS: VitalSign[] = [
  { id: 'blood_pressure', label: '血压 (收缩压)', value: 128, unit: 'mmHg', status: HealthStatus.NORMAL, trend: 'stable', icon: '' },
  { id: 'heart_rate', label: '静息心率', value: 72, unit: 'bpm', status: HealthStatus.NORMAL, trend: 'down', icon: '' },
  { id: 'blood_sugar', label: '空腹血糖', value: 6.8, unit: 'mmol/L', status: HealthStatus.SUGGESTION, trend: 'up', icon: '' },
  { id: 'blood_oxygen', label: '血氧饱和度', value: 98, unit: '%', status: HealthStatus.NORMAL, trend: 'stable', icon: '' },
  { id: 'sleep', label: '深度睡眠', value: 2.5, unit: '小时', status: HealthStatus.NORMAL, trend: 'up', icon: '' },
  { id: 'lipids', label: '总胆固醇', value: 5.4, unit: 'mmol/L', status: HealthStatus.ABNORMAL, trend: 'up', icon: '' },
];

const MOCK_CHART_DATA = [
  { time: '08:00', bp: 120, hr: 70 },
  { time: '10:00', bp: 125, hr: 75 },
  { time: '12:00', bp: 130, hr: 72 },
  { time: '14:00', bp: 128, hr: 74 },
  { time: '16:00', bp: 126, hr: 71 },
  { time: '18:00', bp: 132, hr: 78 },
  { time: '20:00', bp: 128, hr: 73 },
];

const MOCK_VIDEOS: VideoRecommendation[] = [
  { id: '1', title: '三分钟降压养生操', source: '人民医院康复科', thumbnail: 'https://picsum.photos/seed/health1/400/225', duration: '03:45' },
  { id: '2', title: '老年人晚餐禁忌与建议', source: '社区健康中心', thumbnail: 'https://picsum.photos/seed/health2/400/225', duration: '05:20' },
  { id: '3', title: '如何改善失眠：专家讲堂', source: '省中医院', thumbnail: 'https://picsum.photos/seed/health3/400/225', duration: '08:15' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'trends' | 'family' | 'media'>('home');

  const renderHome = () => (
    <div className="space-y-6 animate-fadeIn pb-24">
      {/* Header Profile */}
      <div className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <img src="https://picsum.photos/seed/elderly/100" alt="Avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-50" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">王志强 爷爷</h1>
            <p className="text-sm text-gray-500">康养机器人已在线 • 守护中</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                <ShieldAlert size={24} />
            </button>
            <button className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">
                <Bell size={24} />
            </button>
        </div>
      </div>

      {/* Summary Alert */}
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl text-white shadow-lg">
        <h2 className="text-lg font-bold mb-1">今日健康简报</h2>
        <p className="text-indigo-50 text-sm mb-4">AI 检测到您的血脂偏高，已自动为您排期社区上门检查。</p>
        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            查看详情建议
        </button>
      </div>

      {/* Vital Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {MOCK_VITALS.map(v => <VitalCard key={v.id} vital={v} />)}
      </div>

      {/* Video Suggestions for Elderly */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-gray-800">为您推荐</h2>
            <button className="text-indigo-600 text-sm font-medium">换一换</button>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            {MOCK_VIDEOS.map(video => (
                <div key={video.id} className="min-w-[280px] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="relative aspect-video">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                                <PlayCircle className="text-white" />
                            </div>
                        </div>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded">
                            {video.duration}
                        </span>
                    </div>
                    <div className="p-3">
                        <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{video.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{video.source}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6 pb-24">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4">血压趋势 (24小时)</h2>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                        <defs>
                            <linearGradient id="colorBp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip />
                        <Area type="monotone" dataKey="bp" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBp)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-4">AI 慢病预测分析</h2>
            <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <Heart className="text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-indigo-900">心血管风险预测</h4>
                        <p className="text-sm text-indigo-700">根据近期数据分析，您的心脏功能保持良好，未来一个月风险评级为：<span className="font-bold">低</span></p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        {/* Fix: Added Droplets to imports above to fix "Cannot find name 'Droplets'" */}
                        <Droplets className="text-yellow-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-yellow-900">血糖波动预警</h4>
                        <p className="text-sm text-yellow-700">最近3日餐后血糖略有超标。AI 建议您减少含糖主食，多摄入膳食纤维。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  const renderFamily = () => (
    <div className="space-y-6 pb-24">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="relative">
                <img src="https://picsum.photos/seed/son/200" alt="Family" className="w-32 h-32 rounded-full border-4 border-white shadow-xl mb-4" />
                <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            <h2 className="text-xl font-bold">儿子 (王小明)</h2>
            <p className="text-gray-500 mb-6">实时连接中 • 在线</p>
            <div className="flex gap-4 w-full">
                <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200">
                    <PhoneCall size={20} />
                    语音通话
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold shadow-sm">
                    实时监控
                </button>
            </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-lg mb-4">亲友圈消息</h3>
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                        <Users size={20} />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none flex-1">
                        <p className="text-sm font-bold">王小明 留言：</p>
                        <p className="text-sm text-gray-600 mt-1">爸，您的体检报告我收到了。AI 说指标还不错，记得按时吃降压药，我这周末带孩子去看您！</p>
                        <span className="text-[10px] text-gray-400 mt-2 block">10:45 AM</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 max-w-lg mx-auto relative shadow-2xl overflow-hidden flex flex-col">
      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'trends' && renderTrends()}
        {activeTab === 'family' && renderFamily()}
        {activeTab === 'media' && (
             <div className="space-y-4 pb-24">
                <h2 className="text-2xl font-bold px-1">健康视频</h2>
                <div className="grid grid-cols-1 gap-6">
                    {MOCK_VIDEOS.concat(MOCK_VIDEOS).map((video, idx) => (
                        <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                            <div className="relative aspect-video">
                                <img src={video.thumbnail + `?t=${idx}`} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-110">
                                        <PlayCircle size={40} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1">{video.title}</h3>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{video.source}</span>
                                    <span>{video.duration}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        )}
      </main>

      <ChatWidget />

      {/* Navigation Bar */}
      <nav className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-4 flex justify-between items-center z-40">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <Home size={24} fill={activeTab === 'home' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold">概览</span>
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'trends' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <LineChart size={24} />
          <span className="text-[10px] font-bold">趋势</span>
        </button>
        <button
          onClick={() => setActiveTab('family')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'family' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <Users size={24} fill={activeTab === 'family' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold">亲友</span>
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'media' ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <PlayCircle size={24} fill={activeTab === 'media' ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold">视频</span>
        </button>
      </nav>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
