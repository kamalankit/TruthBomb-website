import React, { useState } from 'react';
import { Home, BookOpen, Target, MessageCircle, User, Sparkles } from 'lucide-react';

const screens = [
  {
    id: 'home',
    title: 'Home',
    description: 'Your daily sanctuary for growth and reflection with personalized truths',
    icon: Home,
    showInNav: true,
    content: (
      <div className="h-full bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col">
        <div className="text-center mb-6 px-4 pt-4">
          <div className="text-2xl mb-2">🌅</div>
          <h3 className="font-semibold text-gray-900">Good Morning!</h3>
          <p className="text-sm text-gray-600">Ready for today's growth?</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4 mb-4 mx-4">
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Today's Truth</h4>
          <p className="text-gray-600 text-xs leading-relaxed italic mb-2">
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </p>
          <p className="text-xs text-yellow-600 font-medium">— Chinese Proverb</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4 px-4">
          <div className="bg-gradient-to-r from-yellow-600 to-rose-400 text-white p-3 rounded-xl text-center">
            <div className="text-lg font-semibold">7</div>
            <div className="text-xs opacity-90">Day Streak</div>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white p-3 rounded-xl text-center">
            <div className="text-lg font-semibold">3</div>
            <div className="text-xs opacity-90">Active Goals</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-3 mx-4">
          <p className="text-xs text-gray-600 mb-1">Today's Intention</p>
          <p className="text-sm text-gray-900 italic">"Focus on progress, not perfection"</p>
        </div>
      </div>
    )
  },
  {
    id: 'journal',
    title: 'Journal',
    description: 'Guided prompts, pattern recognition, and personalized insights',
    icon: BookOpen,
    showInNav: true,
    content: (
      <div className="h-full bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col px-4 pt-4">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-gray-900 mb-1">Evening Reflection</h3>
          <p className="text-xs text-gray-600">Today's guided prompt</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4 mb-4">
          <p className="text-sm text-gray-900 font-medium mb-3">
            "What moment today made you feel most proud of yourself?"
          </p>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-700">
              Finally stood up for myself in that meeting. It felt scary but empowering.
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">AI Insight</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            "You've mentioned 'confidence' in 4 entries this week. Your self-advocacy skills are growing! 🌱"
          </p>
        </div>

        <div className="flex space-x-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-3 flex-1 text-center">
            <div className="text-sm font-semibold text-gray-900">12</div>
            <div className="text-xs text-gray-600">This month</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-3 flex-1 text-center">
            <div className="text-sm font-semibold text-gray-900">89</div>
            <div className="text-xs text-gray-600">Total entries</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'goals',
    title: 'Goals',
    description: 'Visual progress tracking, milestone celebrations, and achievement badges',
    icon: Target,
    showInNav: true,
    content: (
      <div className="h-full bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col px-4 pt-4">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-gray-900 mb-1">Your Goals</h3>
          <p className="text-xs text-gray-600">Track your growth journey</p>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 text-sm">Daily Meditation</h4>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">3 months</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-yellow-600 to-rose-400 h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
            <p className="text-xs text-gray-600">78% complete • 23 days streak</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 text-sm">Read 12 Books</h4>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">1 year</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full" style={{width: '42%'}}></div>
            </div>
            <p className="text-xs text-gray-600">5 of 12 books • On track</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 text-sm">Learn Guitar</h4>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">6 months</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-blue-400 to-emerald-400 h-2 rounded-full" style={{width: '25%'}}></div>
            </div>
            <p className="text-xs text-gray-600">Basic chords mastered 🎯</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex space-x-2">
            <span className="text-lg">🏆</span>
            <span className="text-lg">⭐</span>
            <span className="text-lg">🎯</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Achievement badges earned</p>
        </div>
      </div>
    )
  },
  {
    id: 'mood',
    title: 'Reflection',
    description: 'Track emotions, build intelligence, and discover patterns with AI insights',
    icon: MessageCircle,
    showInNav: true,
    content: (
      <div className="h-full bg-gradient-to-br from-rose-50 to-pink-50 flex flex-col justify-center px-4">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">How are you feeling?</h3>
          <p className="text-sm text-gray-600">Tap to track your mood</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {['😊', '😌', '😔', '😤', '🤔', '😴'].map((emoji, i) => (
            <button key={i} className="text-2xl p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:scale-105 transition-transform">
              {emoji}
            </button>
          ))}
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4 mb-4">
          <p className="text-xs text-gray-600 mb-2">Weekly Pattern</p>
          <div className="flex space-x-1 items-end">
            {[3, 5, 4, 5, 3, 4, 5].map((level, i) => (
              <div key={i} className={`w-4 bg-gradient-to-t from-yellow-600 to-rose-400 rounded-sm`} style={{height: `${level * 6}px`}}></div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Quick reflection... (optional)</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Anonymous wisdom sharing, peer support, and authentic connections',
    icon: User,
    showInNav: true,
    content: (
      <div className="h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col px-4 pt-4">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-gray-900 mb-1">SparkFeed</h3>
          <p className="text-xs text-gray-600">Anonymous insights from others</p>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">#Growth</span>
              <span className="text-xs text-gray-600">😊</span>
            </div>
            <p className="text-sm text-gray-900 mb-2">"Started meditation today. Small steps count!"</p>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Anonymous • 2h ago</span>
              <span className="text-red-500">❤️ 23</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">#Truth</span>
              <span className="text-xs text-gray-600">😌</span>
            </div>
            <p className="text-sm text-gray-900 mb-2">"Grateful for family time this weekend."</p>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Anonymous • 5h ago</span>
              <span className="text-red-500">❤️ 17</span>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">#Healing</span>
              <span className="text-xs text-gray-600">🤔</span>
            </div>
            <p className="text-sm text-gray-900 mb-2">"Learning to be patient with myself."</p>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Anonymous • 1d ago</span>
              <span className="text-red-500">❤️ 41</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'premium',
    title: 'Profile',
    description: 'Advanced analytics, AI insights, unlimited tracking, and exclusive content',
    icon: User,
    showInNav: true,
    content: (
      <div className="h-full bg-gradient-to-br from-yellow-50 to-orange-50 flex flex-col px-4 pt-4">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-600 to-rose-400 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl text-white">👤</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Sarah M.</h3>
          <p className="text-xs text-gray-600">Member since March 2025</p>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Streak Record</h4>
                <p className="text-xs text-gray-600">Your longest streak</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-600">28</div>
                <div className="text-xs text-gray-600">days</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Goals Completed</h4>
                <p className="text-xs text-gray-600">Total achievements</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">12</div>
                <div className="text-xs text-gray-600">goals</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Journal Entries</h4>
                <p className="text-xs text-gray-600">Thoughts captured</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">89</div>
                <div className="text-xs text-gray-600">entries</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="bg-gradient-to-r from-yellow-600 to-rose-400 text-white text-sm px-6 py-2 rounded-2xl font-semibold w-full mb-3">
            Upgrade to Premium
          </button>
          <button className="text-gray-600 text-sm underline">
            Settings & Privacy
          </button>
        </div>
      </div>
    )
  }
];

const InterfaceShowcase = () => {
  const [activeScreen, setActiveScreen] = useState(0);

  const leftScreens = screens.slice(0, 3);
  const rightScreens = screens.slice(3, 6);
  const navScreens = screens.filter(screen => screen.showInNav);

  return (
    <section id="interface-showcase" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Experience thoughtful
            <span className="block bg-gradient-to-r from-yellow-600 to-rose-400 bg-clip-text text-transparent">design.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Every feature crafted for Gen Z wellness, mindful growth, and authentic community connection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Features */}
          <div className="lg:col-span-3 space-y-4">
            {leftScreens.map((screen, index) => {
              const IconComponent = screen.icon;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(index)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    activeScreen === index
                      ? 'border-yellow-600/50 bg-gradient-to-r from-yellow-600/10 to-rose-400/10 shadow-lg'
                      : 'border-gray-200 bg-white/80 hover:border-yellow-600/30'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      activeScreen === index
                        ? 'bg-gradient-to-r from-yellow-600 to-rose-400 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{screen.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{screen.description}</p>
                  <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    activeScreen === index ? 'bg-gradient-to-r from-yellow-600 to-rose-400' : 'bg-gray-300'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative">
              <div className="w-80 h-[650px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                <div className="h-full bg-gradient-to-br from-slate-50 to-gray-100 rounded-[2.5rem] overflow-hidden relative flex flex-col">
                  {/* iPhone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 pt-8 pb-2 text-xs text-gray-900 font-medium flex-shrink-0">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5">
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <svg className="w-6 h-3 ml-1" viewBox="0 0 24 12" fill="none">
                        <rect x="1" y="3" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
                        <rect x="19" y="5" width="2" height="2" rx="0.5" fill="currentColor"/>
                        <rect x="3" y="4" width="14" height="4" rx="1" fill="#22c55e"/>
                      </svg>
                    </div>
                  </div>

                  {/* Screen Content */}
                  <div className="flex-1 overflow-hidden pb-20">
                    {screens[activeScreen].content}
                  </div>

                  {/* Bottom Navigation - Clean 4-tab design */}
                  <div className="flex-shrink-0">
                    <div className="bg-white/95 backdrop-blur-lg border-t border-gray-200/50">
                      <div className="flex">
                        {navScreens.map((screen) => {
                          const screenIndex = screens.findIndex(s => s.id === screen.id);
                          const IconComponent = screen.icon;
                          const isActive = activeScreen === screenIndex;
                          
                          return (
                            <button
                              key={screen.id}
                              onClick={() => setActiveScreen(screenIndex)}
                              className="flex-1 flex flex-col items-center justify-center py-3 px-2"
                            >
                              <div className={`p-1.5 rounded-lg transition-all duration-200 ${
                                isActive 
                                  ? 'bg-gradient-to-r from-yellow-600 to-rose-400' 
                                  : 'bg-transparent'
                              }`}>
                                <IconComponent 
                                  className={`w-5 h-5 transition-colors duration-200 ${
                                    isActive 
                                      ? 'text-white' 
                                      : 'text-gray-500'
                                  }`} 
                                  strokeWidth={2}
                                />
                              </div>
                              <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${
                                isActive 
                                  ? 'text-gray-900' 
                                  : 'text-gray-500'
                              }`}>
                                {screen.title}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* iPhone Home Indicator */}
                    <div className="flex justify-center py-2 bg-white/95">
                      <div className="w-32 h-1 bg-gray-900 rounded-full opacity-40"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-rose-400/20 rounded-[3rem] blur-2xl -z-10"></div>
              
              {/* Floating elements around the phone */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-rose-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 -left-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-3 space-y-4">
            {rightScreens.map((screen, index) => {
              const actualIndex = index + 3;
              const IconComponent = screen.icon;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(actualIndex)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                    activeScreen === actualIndex
                      ? 'border-yellow-600/50 bg-gradient-to-r from-yellow-600/10 to-rose-400/10 shadow-lg'
                      : 'border-gray-200 bg-white/80 hover:border-yellow-600/30'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      activeScreen === actualIndex
                        ? 'bg-gradient-to-r from-yellow-600 to-rose-400 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{screen.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{screen.description}</p>
                  <div className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    activeScreen === actualIndex ? 'bg-gradient-to-r from-yellow-600 to-rose-400' : 'bg-gray-300'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterfaceShowcase;