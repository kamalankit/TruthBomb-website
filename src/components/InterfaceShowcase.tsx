
import React, { useState } from 'react';

const screens = [
  {
    id: 'home',
    title: 'Home Dashboard',
    description: 'Your daily sanctuary for growth and reflection with personalized truths',
    content: (
      <div className="h-full bg-gradient-to-br from-soft-lavender/20 to-soft-white p-6 flex flex-col">
        <div className="text-center mb-8">
          <div className="text-2xl mb-2">🌅</div>
          <h3 className="font-semibold text-deep-black">Good Morning!</h3>
          <p className="text-sm text-slate-gray">Ready for today's growth?</p>
        </div>
        
        <div className="premium-card p-6 mb-6">
          <h4 className="font-medium text-deep-black mb-3">Today's Truth</h4>
          <p className="text-slate-gray text-sm leading-relaxed italic">
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </p>
          <p className="text-xs text-champagne-gold mt-2 font-medium">— Chinese Proverb</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-cta-gradient text-white p-4 rounded-xl text-center gentle-shadow">
            <div className="text-lg font-semibold">7</div>
            <div className="text-xs opacity-90">Day Streak</div>
          </div>
          <div className="bg-gradient-to-r from-champagne-gold to-blush-rose text-white p-4 rounded-xl text-center gentle-shadow">
            <div className="text-lg font-semibold">3</div>
            <div className="text-xs opacity-90">Active Goals</div>
          </div>
        </div>

        <div className="premium-card p-3">
          <p className="text-xs text-slate-gray mb-2">Today's Intention</p>
          <p className="text-sm text-deep-black italic">"Focus on progress, not perfection"</p>
        </div>
      </div>
    )
  },
  {
    id: 'mood',
    title: 'Self-Reflection Hub',
    description: 'Track emotions, build intelligence, and discover patterns with AI insights',
    content: (
      <div className="h-full bg-gradient-to-br from-pale-aqua/20 to-soft-white p-6 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h3 className="font-semibold text-deep-black mb-2">How are you feeling?</h3>
          <p className="text-sm text-slate-gray">Tap to track your mood</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['😊', '😌', '😔', '😤', '🤔', '😴'].map((emoji, i) => (
            <button key={i} className="text-3xl p-4 rounded-xl premium-card hover:scale-105 transition-transform">
              {emoji}
            </button>
          ))}
        </div>
        
        <div className="premium-card p-4 mb-4">
          <p className="text-xs text-slate-gray mb-2">Weekly Pattern</p>
          <div className="flex space-x-2">
            {[3, 5, 4, 5, 3, 4, 5].map((level, i) => (
              <div key={i} className={`w-6 h-${level * 2} bg-gradient-to-t from-champagne-gold to-blush-rose rounded-sm`}></div>
            ))}
          </div>
        </div>

        <div className="premium-card p-4">
          <textarea 
            placeholder="Quick reflection... (optional)"
            className="w-full h-16 resize-none border-0 outline-none text-sm text-slate-gray bg-transparent"
          />
        </div>
      </div>
    )
  },
  {
    id: 'community',
    title: 'SparkFeed Community',
    description: 'Anonymous wisdom sharing, peer support, and authentic connections',
    content: (
      <div className="h-full bg-gradient-to-br from-blush-rose/20 to-soft-white p-6">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-deep-black mb-1">SparkFeed</h3>
          <p className="text-xs text-slate-gray">Anonymous insights from others</p>
        </div>
        
        <div className="space-y-4">
          <div className="premium-card p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs bg-soft-lavender px-2 py-1 rounded-full text-deep-black">#Growth</span>
              <span className="text-xs text-slate-gray">😊</span>
            </div>
            <p className="text-sm text-deep-black mb-2">"Started meditation today. Small steps count!"</p>
            <div className="flex justify-between text-xs text-slate-gray">
              <span>Anonymous • 2h ago</span>
              <span className="text-champagne-gold">❤️ 23</span>
            </div>
          </div>
          
          <div className="premium-card p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs bg-pale-aqua px-2 py-1 rounded-full text-deep-black">#Truth</span>
              <span className="text-xs text-slate-gray">😌</span>
            </div>
            <p className="text-sm text-deep-black mb-2">"Grateful for family time this weekend."</p>
            <div className="flex justify-between text-xs text-slate-gray">
              <span>Anonymous • 5h ago</span>
              <span className="text-champagne-gold">❤️ 17</span>
            </div>
          </div>
          
          <div className="premium-card p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs bg-blush-rose px-2 py-1 rounded-full text-deep-black">#Healing</span>
              <span className="text-xs text-slate-gray">🤔</span>
            </div>
            <p className="text-sm text-deep-black mb-2">"Learning to be patient with myself."</p>
            <div className="flex justify-between text-xs text-slate-gray">
              <span>Anonymous • 1d ago</span>
              <span className="text-champagne-gold">❤️ 41</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'goals',
    title: 'Goal Tracking System',
    description: 'Visual progress tracking, milestone celebrations, and achievement badges',
    content: (
      <div className="h-full bg-gradient-to-br from-champagne-gold/20 to-soft-white p-6">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-deep-black mb-1">Your Goals</h3>
          <p className="text-xs text-slate-gray">Track your growth journey</p>
        </div>
        
        <div className="space-y-4">
          <div className="premium-card p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-deep-black">Daily Meditation</h4>
              <span className="text-xs bg-champagne-gold text-white px-2 py-1 rounded-full">3 months</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-champagne-gold to-blush-rose h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
            <p className="text-xs text-slate-gray">78% complete • 23 days streak</p>
          </div>

          <div className="premium-card p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-deep-black">Read 12 Books</h4>
              <span className="text-xs bg-soft-lavender text-deep-black px-2 py-1 rounded-full">1 year</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-soft-lavender to-pale-aqua h-2 rounded-full" style={{width: '42%'}}></div>
            </div>
            <p className="text-xs text-slate-gray">5 of 12 books • On track</p>
          </div>

          <div className="premium-card p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-deep-black">Learn Guitar</h4>
              <span className="text-xs bg-pale-aqua text-deep-black px-2 py-1 rounded-full">6 months</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-pale-aqua to-champagne-gold h-2 rounded-full" style={{width: '25%'}}></div>
            </div>
            <p className="text-xs text-slate-gray">Basic chords mastered 🎯</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex space-x-2">
            <span className="text-lg">🏆</span>
            <span className="text-lg">⭐</span>
            <span className="text-lg">🎯</span>
          </div>
          <p className="text-xs text-slate-gray mt-1">Achievement badges earned</p>
        </div>
      </div>
    )
  },
  {
    id: 'journal',
    title: 'AI-Powered Journal',
    description: 'Guided prompts, pattern recognition, and personalized insights',
    content: (
      <div className="h-full bg-gradient-to-br from-soft-lavender/30 to-soft-white p-6">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-deep-black mb-1">Evening Reflection</h3>
          <p className="text-xs text-slate-gray">Today's guided prompt</p>
        </div>
        
        <div className="premium-card p-4 mb-4">
          <p className="text-sm text-deep-black font-medium mb-3">
            "What moment today made you feel most proud of yourself?"
          </p>
          <textarea 
            placeholder="Type your reflection here..."
            className="w-full h-20 resize-none border-0 outline-none text-sm text-slate-gray bg-transparent"
            defaultValue="Finally stood up for myself in that meeting. It felt scary but empowering."
          />
        </div>

        <div className="premium-card p-4 mb-4">
          <h4 className="text-sm font-medium text-deep-black mb-2">AI Insight</h4>
          <p className="text-xs text-slate-gray leading-relaxed">
            "You've mentioned 'confidence' in 4 entries this week. Your self-advocacy skills are growing! 🌱"
          </p>
        </div>

        <div className="flex space-x-2">
          <div className="premium-card p-3 flex-1 text-center">
            <div className="text-sm font-semibold text-deep-black">12</div>
            <div className="text-xs text-slate-gray">This month</div>
          </div>
          <div className="premium-card p-3 flex-1 text-center">
            <div className="text-sm font-semibold text-deep-black">89</div>
            <div className="text-xs text-slate-gray">Total entries</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'premium',
    title: 'Premium Features',
    description: 'Advanced analytics, AI insights, unlimited tracking, and exclusive content',
    content: (
      <div className="h-full bg-gradient-to-br from-champagne-gold/30 to-blush-rose/20 p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-2">
            <span className="text-lg">✨</span>
            <h3 className="font-semibold text-deep-black">Premium</h3>
          </div>
          <p className="text-xs text-slate-gray">Unlock your full potential</p>
        </div>
        
        <div className="space-y-3">
          <div className="premium-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-champagne-gold to-blush-rose rounded-lg flex items-center justify-center">
                <span className="text-sm">🧠</span>
              </div>
              <div>
                <h4 className="font-medium text-deep-black text-sm">AI Growth Coach</h4>
                <p className="text-xs text-slate-gray">Personalized insights & recommendations</p>
              </div>
            </div>
          </div>

          <div className="premium-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-soft-lavender to-pale-aqua rounded-lg flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <div>
                <h4 className="font-medium text-deep-black text-sm">Advanced Analytics</h4>
                <p className="text-xs text-slate-gray">Deep pattern analysis & trends</p>
              </div>
            </div>
          </div>

          <div className="premium-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pale-aqua to-champagne-gold rounded-lg flex items-center justify-center">
                <span className="text-sm">🎯</span>
              </div>
              <div>
                <h4 className="font-medium text-deep-black text-sm">Unlimited Goals</h4>
                <p className="text-xs text-slate-gray">Track as many dreams as you want</p>
              </div>
            </div>
          </div>

          <div className="premium-card p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blush-rose to-soft-lavender rounded-lg flex items-center justify-center">
                <span className="text-sm">👑</span>
              </div>
              <div>
                <h4 className="font-medium text-deep-black text-sm">Exclusive Content</h4>
                <p className="text-xs text-slate-gray">Expert truths & early access</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button className="cta-button text-sm px-6 py-2 w-full">
            Upgrade Now - $4.99/month
          </button>
        </div>
      </div>
    )
  }
];

const InterfaceShowcase: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <section id="showcase" className="section-padding bg-gradient-to-br from-pale-aqua/30 to-soft-lavender/30">
      <div className="container-width">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-6xl font-bold text-deep-black mb-6 leading-tight">
            Experience thoughtful
            <span className="gradient-text block">design.</span>
          </h2>
          <p className="text-xl text-slate-gray max-w-2xl mx-auto leading-relaxed">
            Every feature crafted for Gen Z wellness, mindful growth, and authentic community connection
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Phone Mockup */}
          <div className="flex-1 flex justify-center animate-on-scroll">
            <div className="relative">
              <div className="w-80 h-[650px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 gentle-shadow">
                <div className="w-full h-full bg-soft-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs text-slate-gray">
                    <span className="font-semibold">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-champagne-gold rounded-sm"></div>
                      <div className="w-4 h-2 bg-champagne-gold rounded-sm opacity-70"></div>
                      <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {screens[activeScreen].content}
                </div>
              </div>
              
              {/* Soft glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-champagne-gold/10 to-blush-rose/10 rounded-[3rem] blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Screen Navigation */}
          <div className="flex-1 space-y-6 animate-on-scroll">
            {screens.map((screen, index) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(index)}
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  activeScreen === index
                    ? 'border-champagne-gold/50 bg-gradient-to-r from-champagne-gold/10 to-blush-rose/10'
                    : 'border-gray-200 bg-white/80 hover:border-champagne-gold/30'
                }`}
              >
                <h3 className={`font-semibold mb-2 text-lg ${
                  activeScreen === index ? 'text-deep-black' : 'text-deep-black'
                }`}>
                  {screen.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  activeScreen === index ? 'text-slate-gray' : 'text-slate-gray'
                }`}>
                  {screen.description}
                </p>
                <div className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  activeScreen === index ? 'bg-gradient-to-r from-champagne-gold to-blush-rose' : 'bg-gray-300'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterfaceShowcase;
