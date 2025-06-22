import React, { useEffect, useRef } from 'react';
import { Play, ArrowDown, Home, BookOpen, Target, MessageCircle, User, Download, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import useParallaxSection from '../hooks/useParallaxSection';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  
  const parallaxBg1 = useParallaxSection({ speed: 0.3, direction: 'down' });
  const parallaxBg2 = useParallaxSection({ speed: 0.5, direction: 'up' });

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    // Animate headline
    tl.fromTo(headlineRef.current, 
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
    )
    // Animate phone
    .fromTo(phoneRef.current,
      { opacity: 0, y: 80, rotateY: 15 },
      { opacity: 1, y: 0, rotateY: 0, duration: 1.4, ease: "power3.out" },
      "-=0.8"
    )
    // Animate CTAs
    .fromTo(ctaRef.current?.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    );

    // Floating animation for phone
    gsap.to(phoneRef.current, {
      y: -10,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Parallax scroll effect
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      if (backgroundRef.current) {
        gsap.set(backgroundRef.current, { y: rate });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-soft-white via-warm-gray to-pale-aqua/20"
    >
      {/* Animated Background Elements */}
      <div ref={backgroundRef} className="absolute inset-0 opacity-40">
        <div 
          ref={parallaxBg1}
          className="absolute top-1/4 left-1/4 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-soft-lavender to-champagne-gold rounded-full filter blur-3xl animate-pulse"
        />
        <div 
          ref={parallaxBg2}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 lg:w-80 lg:h-80 bg-gradient-to-l from-blush-rose to-pale-aqua rounded-full filter blur-2xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        
        {/* Floating UI Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg animate-float hidden lg:block">
          <div className="w-full h-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-champagne-gold" />
          </div>
        </div>
        
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-r from-champagne-gold to-blush-rose rounded-full animate-gentle-bounce hidden lg:block" />
        
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-soft-lavender/60 rounded-lg animate-float hidden lg:block" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Content - Enhanced */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            <div ref={headlineRef} className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-deep-black leading-[0.9] tracking-tight">
                <span className="block">Drop a Truth.</span>
                <span className="block bg-gradient-to-r from-champagne-gold via-blush-rose to-soft-lavender bg-clip-text text-transparent animate-gradient-x">
                  Track Your Growth.
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-gray font-medium leading-relaxed max-w-2xl">
                Your 5-minute daily ritual for self-awareness and clarity.
              </p>
              
              <p className="text-base lg:text-lg text-slate-gray/80 leading-relaxed max-w-xl">
                Join thousands discovering mindful growth through ancient wisdom and modern design.
              </p>
            </div>

            {/* Enhanced CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start pt-4 lg:pt-6">
              <button className="group bg-cta-gradient text-white text-base lg:text-lg font-semibold px-8 lg:px-10 py-4 lg:py-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-blush-rose/30 active:scale-95 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Download className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>Download Now</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button className="group bg-transparent border-2 border-deep-black text-deep-black hover:bg-deep-black hover:text-white transition-all duration-300 font-semibold text-base lg:text-lg px-8 lg:px-10 py-4 lg:py-5 rounded-2xl flex items-center justify-center space-x-3">
                <Play className="w-5 h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Enhanced Social Proof */}
            <div className="flex flex-wrap gap-4 lg:gap-6 justify-center lg:justify-start pt-6 lg:pt-8">
              <div className="premium-card px-4 lg:px-6 py-3 lg:py-4 hover:scale-105 transition-transform duration-300">
                <span className="text-yellow-500 text-sm lg:text-base">★★★★★</span>
                <span className="ml-2 text-deep-black font-semibold text-sm lg:text-base">4.8 Rating</span>
              </div>
              <div className="premium-card px-4 lg:px-6 py-3 lg:py-4 hover:scale-105 transition-transform duration-300">
                <span className="text-deep-black font-bold text-sm lg:text-base">500K+</span>
                <span className="ml-2 text-slate-gray text-sm lg:text-base">Downloads</span>
              </div>
              <div className="premium-card px-4 lg:px-6 py-3 lg:py-4 hover:scale-105 transition-transform duration-300">
                <span className="text-deep-black font-bold text-sm lg:text-base">Daily</span>
                <span className="ml-2 text-slate-gray text-sm lg:text-base">Growth</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Mobile App Preview */}
          <div className="flex justify-center lg:justify-end relative">
            <div 
              ref={phoneRef}
              className="relative w-72 sm:w-80 lg:w-96 h-[580px] sm:h-[620px] lg:h-[700px] transform transition-all duration-1000"
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] lg:rounded-[3rem] p-2 lg:p-3 shadow-2xl">
                {/* Screen */}
                <div className="h-full bg-gradient-to-br from-soft-white to-warm-gray rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden relative flex flex-col">
                  {/* iPhone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 lg:w-32 h-5 lg:h-6 bg-gray-900 rounded-b-xl z-10" />
                  
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-5 lg:px-6 pt-7 lg:pt-8 pb-2 text-xs lg:text-sm text-gray-900 font-medium flex-shrink-0">
                    <span className="font-semibold">9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5">
                        <div className="w-1 h-1 bg-gray-900 rounded-full" />
                        <div className="w-1 h-1 bg-gray-900 rounded-full" />
                        <div className="w-1 h-1 bg-gray-900 rounded-full" />
                        <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      </div>
                      <svg className="w-5 h-3 ml-1" viewBox="0 0 24 12" fill="none">
                        <rect x="1" y="3" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
                        <rect x="19" y="5" width="2" height="2" rx="0.5" fill="currentColor"/>
                        <rect x="3" y="4" width="14" height="4" rx="1" fill="#22c55e"/>
                      </svg>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="flex-1 px-4 lg:px-6 pb-2 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-4 lg:mb-6 flex-shrink-0">
                      <div className="text-2xl lg:text-3xl mb-2 animate-gentle-bounce">🌅</div>
                      <h3 className="text-base lg:text-lg font-bold text-gray-900">Good Morning!</h3>
                      <p className="text-xs lg:text-sm text-gray-600">Ready for today's growth?</p>
                    </div>
                    
                    {/* Daily Truth Card */}
                    <div className="premium-card p-3 lg:p-4 mb-3 lg:mb-4 flex-shrink-0 hover:scale-105 transition-transform duration-300">
                      <h4 className="font-semibold text-gray-900 mb-2 text-xs lg:text-sm">Today's Truth</h4>
                      <p className="text-gray-600 text-xs lg:text-sm leading-relaxed italic mb-2">
                        "The best time to plant a tree was 20 years ago. The second best time is now."
                      </p>
                      <p className="text-xs lg:text-sm text-champagne-gold font-semibold">— Chinese Proverb</p>
                    </div>
                    
                    {/* Progress Row */}
                    <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-3 lg:mb-4 flex-shrink-0">
                      <div className="bg-cta-gradient text-white p-2 lg:p-3 rounded-xl text-center shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-base lg:text-lg font-bold">7</div>
                        <div className="text-xs lg:text-sm opacity-90">Day Streak</div>
                      </div>
                      <div className="bg-gradient-to-r from-soft-lavender to-pale-aqua text-deep-black p-2 lg:p-3 rounded-xl text-center shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="text-base lg:text-lg font-bold">3</div>
                        <div className="text-xs lg:text-sm opacity-90">Active Goals</div>
                      </div>
                    </div>

                    {/* Daily Intention */}
                    <div className="premium-card p-3 lg:p-4 mb-3 lg:mb-4 flex-shrink-0 hover:scale-105 transition-transform duration-300">
                      <p className="text-xs lg:text-sm text-gray-600 mb-1">Today's Intention</p>
                      <p className="text-sm lg:text-base text-gray-900 italic font-medium">"Focus on progress, not perfection"</p>
                    </div>

                    <div className="flex-1" />
                  </div>

                  {/* Bottom Navigation */}
                  <div className="flex-shrink-0">
                    <div className="bg-white/90 backdrop-blur-3xl border-t border-gray-200/30 px-2">
                      <div className="grid grid-cols-5">
                        {[
                          { icon: Home, label: 'Home', active: true },
                          { icon: BookOpen, label: 'Journal', active: false },
                          { icon: Target, label: 'Goals', active: false },
                          { icon: MessageCircle, label: 'Community', active: false },
                          { icon: User, label: 'Profile', active: false },
                        ].map(({ icon: Icon, label, active }, index) => (
                          <div key={index} className="flex flex-col items-center justify-center py-2 lg:py-3">
                            <div className="flex flex-col items-center space-y-1">
                              <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${active ? 'text-champagne-gold' : 'text-gray-400'}`} strokeWidth={active ? 2 : 1.5} />
                              <span className={`text-xs font-medium leading-none ${active ? 'text-champagne-gold' : 'text-gray-400'}`}>
                                {label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* iPhone Home Indicator */}
                    <div className="flex justify-center py-2 bg-white/90">
                      <div className="w-28 lg:w-32 h-1 bg-gray-900 rounded-full opacity-40" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-champagne-gold/20 to-blush-rose/20 rounded-[2.5rem] lg:rounded-[3rem] blur-2xl -z-10 animate-pulse" />
              
              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 lg:w-8 lg:h-8 bg-cta-gradient rounded-full animate-bounce opacity-80" />
              <div className="absolute -bottom-3 -left-3 w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-soft-lavender to-pale-aqua rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/3 -left-5 w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r from-champagne-gold to-blush-rose rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <ArrowDown className="w-5 h-5 lg:w-6 lg:h-6 text-slate-gray" />
            <span className="text-xs lg:text-sm text-slate-gray font-medium">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;