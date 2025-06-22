import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react';

const PhilosophySection = () => {
  const [currentIndex, setCurrentIndex] = useState(4); // Start with Truth Bomb (index 4)
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

  // Reordered to make the flow more logical - Truth Bomb → Vedanta → Upanishads → Stoicism → Zen → back to Truth Bomb
  const philosophies = [
    {
      tradition: "Truth Bomb",
      modern: "Digital Awakening",
      translation: "Ancient wisdom, modern clarity",
      principle: "Conscious Growth",
      description: "Synthesizing thousands of years of wisdom into bite-sized daily practices that fit your digital lifestyle while honoring timeless truths.",
      quote: "Every moment is a chance to drop a truth bomb on your own illusions and grow into who you're meant to be.",
      icon: "💎",
      gradient: "from-rose-400 via-pink-500 to-fuchsia-500",
      bgGradient: "from-rose-50/80 via-pink-50/60 to-fuchsia-50/40",
      accentColor: "rose-500"
    },
    {
      tradition: "Vedanta",
      sanskrit: "सत्यं ज्ञानम् अनन्तम्",
      translation: "Truth, Knowledge, Infinite",
      principle: "Self-Realization",
      description: "Discover your true nature beyond the illusions of daily stress. Ancient Vedantic wisdom teaches that self-awareness is the foundation of genuine happiness.",
      quote: "You are not the body, not the mind, but the eternal consciousness witnessing both.",
      icon: "🕉️",
      gradient: "from-amber-400 via-amber-500 to-orange-500",
      bgGradient: "from-amber-50/80 via-orange-50/60 to-yellow-50/40",
      accentColor: "amber-500"
    },
    {
      tradition: "Upanishads",
      sanskrit: "अहं ब्रह्मास्मि",
      translation: "I am the ultimate reality",
      principle: "Inner Wisdom",
      description: "The Upanishads reveal that all answers lie within. Your daily truth-seeking practice connects you to this ancient understanding of inner knowing.",
      quote: "That which you seek is seeking you. Look within and discover the infinite wisdom of your own being.",
      icon: "🪔",
      gradient: "from-purple-400 via-purple-500 to-indigo-500",
      bgGradient: "from-purple-50/80 via-indigo-50/60 to-violet-50/40",
      accentColor: "purple-500"
    },
    {
      tradition: "Stoicism",
      latin: "Memento Mori",
      translation: "Remember you must die",
      principle: "Present Focus",
      description: "Stoic philosophy teaches us to focus on what we can control. Your daily intentions and responses shape your character and peace of mind.",
      quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
      icon: "🏛️",
      gradient: "from-slate-400 via-slate-500 to-gray-600",
      bgGradient: "from-slate-50/80 via-gray-50/60 to-zinc-50/40",
      accentColor: "slate-600"
    },
    {
      tradition: "Zen",
      japanese: "一期一会",
      translation: "One time, one meeting",
      principle: "Mindful Presence",
      description: "Zen teaches us that this moment is all we truly have. Each day's truth is a unique opportunity for awakening and growth.",
      quote: "The present moment is the only time over which we have dominion.",
      icon: "⛩️",
      gradient: "from-emerald-400 via-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50/80 via-teal-50/60 to-cyan-50/40",
      accentColor: "emerald-500"
    }
  ];

  // Enhanced auto-play functionality with smooth transitions
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % philosophies.length);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 50);
    }, 2000); // Slightly longer for better reading time
  }, [philosophies.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isPlaying, isPaused, startAutoPlay, stopAutoPlay]);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 75);
    if (isPlaying) {
      stopAutoPlay();
      setTimeout(startAutoPlay, 2000);
    }
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % philosophies.length);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 75);
    if (isPlaying) {
      stopAutoPlay();
      setTimeout(startAutoPlay, 2000);
    }
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + philosophies.length) % philosophies.length);
      setTimeout(() => setIsTransitioning(false), 150);
    }, 75);
    if (isPlaying) {
      stopAutoPlay();
      setTimeout(startAutoPlay, 2000);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    touchStartX.current = null;
  };

  const currentPhilosophy = philosophies[currentIndex];

  return (
    <section 
      id="philosophy" 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full opacity-30">
          <div 
            className={`absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r ${currentPhilosophy.gradient} rounded-full filter blur-3xl transition-all duration-1000 ease-out`}
            style={{
              transform: `translate(${currentIndex * 20}px, ${Math.sin(currentIndex) * 30}px) scale(${1 + currentIndex * 0.1})`,
              animation: 'float 8s ease-in-out infinite alternate'
            }}
          />
        </div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full opacity-20">
          <div 
            className={`absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l ${currentPhilosophy.gradient} rounded-full filter blur-2xl transition-all duration-1000 ease-out`}
            style={{
              transform: `translate(${-currentIndex * 15}px, ${Math.cos(currentIndex) * 25}px) scale(${0.8 + currentIndex * 0.05})`,
              animation: 'float 6s ease-in-out infinite alternate-reverse'
            }}
          />
        </div>
      </div>

      <div className="relative z-10 px-4 py-20">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <h2 
              className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight transform transition-all duration-700 ease-out"
              style={{
                transform: `translateY(${currentIndex * -2}px)`,
                opacity: 1
              }}
            >
              Timeless Wisdom.
              <br />
              <span className={`bg-gradient-to-r ${currentPhilosophy.gradient} bg-clip-text text-transparent transition-all duration-700`}>
                Modern Practice.
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Five thousand years of human wisdom distilled into your daily ritual.
            <br />
            <span className="text-lg italic mt-2 block opacity-80">Ancient truths for digital souls.</span>
          </p>
        </div>

        {/* Main Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-gray-200/50"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30">
            <button 
              onClick={nextSlide}
              className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-gray-200/50"
            >
              <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          {/* Play/Pause Button */}
          <div className="absolute top-4 right-4 z-30">
            <button 
              onClick={togglePlayPause}
              className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-gray-200/50"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
              ) : (
                <Play className="w-5 h-5 text-gray-700 group-hover:text-gray-900 ml-0.5" />
              )}
            </button>
          </div>

          {/* Slider Content */}
          <div 
            className="relative h-[600px] overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {philosophies.map((philosophy, index) => {
              const offset = index - currentIndex;
              const isActive = index === currentIndex;
              const isPrev = index === currentIndex - 1 || (currentIndex === 0 && index === philosophies.length - 1);
              const isNext = index === currentIndex + 1 || (currentIndex === philosophies.length - 1 && index === 0);
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 scale-100 z-20' : 
                    isPrev || isNext ? 'opacity-30 scale-95 z-10' : 'opacity-0 scale-90 z-0'
                  } ${isTransitioning ? 'duration-300' : 'duration-1000'}`}
                  style={{
                    transform: `translateX(${offset * 100}%) ${isActive ? 'scale(1)' : 'scale(0.92)'} rotateY(${offset * 15}deg)`,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <div className={`h-full w-full bg-gradient-to-br ${philosophy.bgGradient} backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl overflow-hidden relative`}>
                    {/* Animated Border */}
                    <div className={`absolute inset-0 rounded-3xl opacity-60 ${isActive ? 'animate-pulse' : ''}`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${philosophy.gradient} rounded-3xl opacity-20`} />
                    </div>
                    
                    {/* Card Content */}
                    <div className="h-full flex flex-col justify-center p-12 text-center relative z-10">
                      {/* Decorative Elements */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${philosophy.gradient} opacity-60`} />
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${philosophy.gradient} opacity-60`} />
                      
                      {/* Icon with Enhanced Animation */}
                      <div className="mb-8 relative">
                        <div 
                          className={`text-8xl inline-block transition-all duration-1000 ease-out ${isTransitioning ? 'duration-300' : 'duration-1000'}`}
                          style={{
                            transform: isActive ? 'scale(1) rotate(0deg) translateY(0px)' : 'scale(0.7) rotate(-10deg) translateY(10px)',
                            animation: isActive ? 'gentle-float 3s ease-in-out infinite' : 'none',
                            filter: isActive ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' : 'none'
                          }}
                        >
                          {philosophy.icon}
                        </div>
                        {/* Glow effect */}
                        {isActive && (
                          <div 
                            className={`absolute inset-0 text-8xl inline-block opacity-30 blur-lg bg-gradient-to-r ${philosophy.gradient} bg-clip-text text-transparent`}
                            style={{
                              animation: 'gentle-glow 2s ease-in-out infinite alternate'
                            }}
                          >
                            {philosophy.icon}
                          </div>
                        )}
                      </div>

                      {/* Tradition Name with Stagger Animation */}
                      <h3 
                        className={`text-4xl md:text-5xl font-black text-gray-900 mb-6 transition-all ${isTransitioning ? 'duration-300' : 'duration-1000'}`}
                        style={{
                          transform: isActive ? 'translateY(0px) scale(1)' : 'translateY(20px) scale(0.9)',
                          opacity: isActive ? 1 : 0.7
                        }}
                      >
                        {philosophy.tradition}
                      </h3>

                      {/* Sanskrit/Latin/Japanese Text */}
                      <div 
                        className={`mb-4 space-y-2 transition-all ${isTransitioning ? 'duration-300 delay-75' : 'duration-1000 delay-100'}`}
                        style={{
                          transform: isActive ? 'translateY(0px)' : 'translateY(15px)',
                          opacity: isActive ? 1 : 0.6
                        }}
                      >
                        {philosophy.sanskrit && (
                          <p className="text-2xl font-medium text-gray-700">
                            {philosophy.sanskrit}
                          </p>
                        )}
                        {philosophy.latin && (
                          <p className="text-2xl font-medium text-gray-700 italic">
                            {philosophy.latin}
                          </p>
                        )}
                        {philosophy.japanese && (
                          <p className="text-2xl font-medium text-gray-700">
                            {philosophy.japanese}
                          </p>
                        )}
                        {philosophy.modern && (
                          <p className={`text-2xl font-medium bg-gradient-to-r ${philosophy.gradient} bg-clip-text text-transparent`}>
                            {philosophy.modern}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 italic">
                          "{philosophy.translation}"
                        </p>
                      </div>

                      {/* Core Principle Badge */}
                      <div 
                        className={`mb-8 transition-all ${isTransitioning ? 'duration-300 delay-100' : 'duration-1000 delay-200'}`}
                        style={{
                          transform: isActive ? 'translateY(0px) scale(1)' : 'translateY(10px) scale(0.9)',
                          opacity: isActive ? 1 : 0.5
                        }}
                      >
                        <div className={`inline-block px-8 py-3 rounded-full bg-gradient-to-r ${philosophy.gradient} text-white font-bold text-lg shadow-xl transition-all duration-700 hover:scale-105 ${isActive ? 'animate-pulse' : ''}`}>
                          {philosophy.principle}
                        </div>
                      </div>

                      {/* Description */}
                      <div 
                        className={`mb-8 max-w-3xl mx-auto transition-all ${isTransitioning ? 'duration-300 delay-150' : 'duration-1000 delay-300'}`}
                        style={{
                          transform: isActive ? 'translateY(0px)' : 'translateY(10px)',
                          opacity: isActive ? 1 : 0.4
                        }}
                      >
                        <p className="text-xl text-gray-800 leading-relaxed">
                          {philosophy.description}
                        </p>
                      </div>

                      {/* Quote */}
                      <div 
                        className={`relative max-w-4xl mx-auto transition-all ${isTransitioning ? 'duration-300 delay-200' : 'duration-1000 delay-400'}`}
                        style={{
                          transform: isActive ? 'translateY(0px)' : 'translateY(10px)',
                          opacity: isActive ? 1 : 0.3
                        }}
                      >
                        <Quote className={`absolute -top-4 -left-4 w-10 h-10 text-${philosophy.accentColor}/40 transition-all duration-700 ${isActive ? 'animate-pulse' : ''}`} />
                        <blockquote className="text-lg italic text-gray-700 leading-relaxed pl-8 pr-4">
                          {philosophy.quote}
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
            <div className="bg-white/20 backdrop-blur-xl rounded-full p-1 border border-white/30">
              <div className="flex space-x-1">
                {philosophies.map((_, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => goToSlide(index)}
                      className={`block w-12 h-2 rounded-full transition-all duration-500 ${
                        index === currentIndex 
                          ? `bg-gradient-to-r ${currentPhilosophy.gradient}` 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                    {index === currentIndex && isPlaying && (
                      <div 
                        className={`absolute inset-0 bg-gradient-to-r ${currentPhilosophy.gradient} rounded-full opacity-30`}
                        style={{
                          animation: 'progress 6s linear infinite'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <h4 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Begin Your Journey?
            </h4>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands who've discovered the power of ancient wisdom in modern practice.
            </p>
            <button className={`px-12 py-4 bg-gradient-to-r ${currentPhilosophy.gradient} text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform`}>
              Start Your 5-Minute Ritual
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes gentle-float {
          0%, 100% { transform: scale(1) rotate(0deg) translateY(0px); }
          33% { transform: scale(1.02) rotate(1deg) translateY(-5px); }
          66% { transform: scale(1.01) rotate(-0.5deg) translateY(-3px); }
        }
        
        @keyframes gentle-glow {
          0% { opacity: 0.2; }
          100% { opacity: 0.4; }
        }
        
        @keyframes progress {
          0% { 
            width: 0%; 
            opacity: 0.5; 
          }
          50% { 
            opacity: 0.8; 
          }
          100% { 
            width: 100%; 
            opacity: 0.5; 
          }
        }
        
        @keyframes slideIn {
          0% { 
            transform: translateX(100%) scale(0.8); 
            opacity: 0;
          }
          50% { 
            opacity: 0.7;
          }
          100% { 
            transform: translateX(0%) scale(1); 
            opacity: 1;
          }
        }
        
        .shadow-3xl {
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25), 
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .philosophy-card {
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
};

export default PhilosophySection;