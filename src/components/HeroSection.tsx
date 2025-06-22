import React, { useEffect, useRef } from 'react';
import { Play, ArrowDown, Home, BookOpen, Target, MessageCircle, User } from 'lucide-react';

const HeroSection = () => {
  const phoneRef = useRef(null);
  const mobileAppRef = useRef(null);

  useEffect(() => {
    // Gentle parallax effect on scroll
    const handleScroll = () => {
      if (phoneRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        phoneRef.current.style.transform = `translateY(${rate}px)`;
      }

      if (mobileAppRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.05;
        mobileAppRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements with floating animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-200 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Drop a Truth.
                <span className="block bg-gradient-to-r from-yellow-600 to-rose-400 bg-clip-text text-transparent">Track Your Growth.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
                Your 5-minute daily ritual for self-awareness and clarity.
              </p>
              
              <p className="text-base text-gray-600 leading-relaxed">
                Join thousands discovering mindful growth through ancient wisdom and modern design.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
              <button className="bg-gradient-to-r from-yellow-600 to-rose-400 text-white text-base px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-rose-400/20 active:scale-95">
                Download Now
              </button>
              <button className="bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium text-base px-8 py-3 rounded-xl flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6">
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm px-4 py-2">
                <span className="text-yellow-500 text-sm">★★★★★</span>
                <span className="ml-2 text-gray-900 font-medium text-sm">4.8 Rating</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm px-4 py-2">
                <span className="text-gray-900 font-semibold text-sm">500K+</span>
                <span className="ml-2 text-gray-600 text-sm">Downloads</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm px-4 py-2">
                <span className="text-gray-900 font-semibold text-sm">Daily</span>
                <span className="ml-2 text-gray-600 text-sm">Growth</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Mobile App Preview */}
          <div className="flex justify-center lg:justify-end relative lg:-mt-12">
            {/* Floating Mobile App Preview */}
            <div 
              ref={mobileAppRef}
              className="relative w-72 h-[580px] transform transition-all duration-1000"
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                {/* Screen with iPhone notch */}
                <div className="h-full bg-gradient-to-br from-slate-50 to-gray-100 rounded-[2rem] overflow-hidden relative flex flex-col">
                  {/* iPhone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-gray-900 rounded-b-xl z-10"></div>
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-5 pt-7 pb-2 text-xs text-gray-900 font-medium flex-shrink-0">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5">
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      </div>
                      <svg className="w-5 h-3 ml-1" viewBox="0 0 24 12" fill="none">
                        <rect x="1" y="3" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
                        <rect x="19" y="5" width="2" height="2" rx="0.5" fill="currentColor"/>
                        <rect x="3" y="4" width="14" height="4" rx="1" fill="#22c55e"/>
                      </svg>
                    </div>
                  </div>

                  {/* Scrollable App Content */}
                  <div className="flex-1 px-5 pb-2 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-3 flex-shrink-0">
                      <div className="text-xl mb-2">🌅</div>
                      <h3 className="text-base font-semibold text-gray-900">Good Morning!</h3>
                      <p className="text-xs text-gray-600">Ready for today's growth?</p>
                    </div>
                    
                    {/* Daily Truth Card */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm p-3 mb-3 flex-shrink-0">
                      <h4 className="font-medium text-gray-900 mb-2 text-xs">Today's Truth</h4>
                      <p className="text-gray-600 text-xs leading-relaxed italic mb-2">
                        "The best time to plant a tree was 20 years ago. The second best time is now."
                      </p>
                      <p className="text-xs text-yellow-600 font-medium">— Chinese Proverb</p>
                    </div>
                    
                    {/* Progress Row */}
                    <div className="grid grid-cols-2 gap-2 mb-3 flex-shrink-0">
                      <div className="bg-gradient-to-r from-rose-400 to-yellow-500 text-white p-2 rounded-lg text-center shadow-lg">
                        <div className="text-base font-semibold">7</div>
                        <div className="text-xs opacity-90">Day Streak</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-400 to-blue-400 text-white p-2 rounded-lg text-center shadow-lg">
                        <div className="text-base font-semibold">3</div>
                        <div className="text-xs opacity-90">Active Goals</div>
                      </div>
                    </div>

                    {/* Daily Intention */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm p-3 mb-3 flex-shrink-0">
                      <p className="text-xs text-gray-600 mb-1">Today's Intention</p>
                      <p className="text-sm text-gray-900 italic">"Focus on progress, not perfection"</p>
                    </div>

                    {/* Spacer to push navigation to bottom */}
                    <div className="flex-1"></div>
                  </div>

                  {/* Bottom Navigation - Fixed at bottom */}
                  <div className="flex-shrink-0">
                    {/* Tab Bar */}
                    <div className="bg-white/90 backdrop-blur-3xl border-t border-gray-200/30 px-2">
                      <div className="grid grid-cols-5">
                        {/* Home Tab - Active */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="flex flex-col items-center space-y-1">
                            <Home className="w-4 h-4 text-blue-600" strokeWidth={2} />
                            <span className="text-xs font-medium text-blue-600 leading-none">Home</span>
                          </div>
                        </div>
                        
                        {/* Journal Tab */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="flex flex-col items-center space-y-1">
                            <BookOpen className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                            <span className="text-xs font-normal text-gray-400 leading-none">Journal</span>
                          </div>
                        </div>
                        
                        {/* Goals Tab */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="flex flex-col items-center space-y-1">
                            <Target className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                            <span className="text-xs font-normal text-gray-400 leading-none">Goals</span>
                          </div>
                        </div>
                        
                        {/* Community Tab */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="flex flex-col items-center space-y-1">
                            <MessageCircle className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                            <span className="text-xs font-normal text-gray-400 leading-none">Community</span>
                          </div>
                        </div>
                        
                        {/* Profile Tab */}
                        <div className="flex flex-col items-center justify-center py-2">
                          <div className="flex flex-col items-center space-y-1">
                            <User className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                            <span className="text-xs font-normal text-gray-400 leading-none">Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* iPhone Home Indicator */}
                    <div className="flex justify-center py-2 bg-white/90">
                      <div className="w-28 h-1 bg-gray-900 rounded-full opacity-40"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-rose-400/20 rounded-[2.5rem] blur-2xl -z-10"></div>
              
              {/* Floating elements around the phone */}
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-rose-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-3 -left-3 w-5 h-5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 -left-5 w-3 h-3 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;