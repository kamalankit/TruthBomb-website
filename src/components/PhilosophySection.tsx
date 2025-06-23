import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react';

const PhilosophySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);

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

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % philosophies.length);
    }, 4000);
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
    setCurrentIndex(index);
    if (isPlaying) {
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000);
    }
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % philosophies.length);
    if (isPlaying) {
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000);
    }
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + philosophies.length) % philosophies.length);
    if (isPlaying) {
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 px-4 py-16 lg:py-20">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Timeless Wisdom.
            <span className={`block bg-gradient-to-r ${currentPhilosophy.gradient} bg-clip-text text-transparent transition-all duration-500`}>
              Modern Practice.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Five thousand years of human wisdom distilled into your daily ritual.
          </p>
        </div>

        {/* Main Slider Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-105 border border-gray-200/50"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-30">
            <button 
              onClick={nextSlide}
              className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-105 border border-gray-200/50"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" />
            </button>
          </div>

          {/* Play/Pause Button */}
          <div className="absolute top-4 right-4 z-30">
            <button 
              onClick={togglePlayPause}
              className="w-10 h-10 bg-white/90 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border border-gray-200/50"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-gray-700 group-hover:text-gray-900" />
              ) : (
                <Play className="w-4 h-4 text-gray-700 group-hover:text-gray-900 ml-0.5" />
              )}
            </button>
          </div>

          {/* Slider Content - Simple approach with individual slides */}
          <div 
            className="relative h-[500px] overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {philosophies.map((philosophy, index) => {
              // Calculate position relative to current index
              let position = index - currentIndex;
              
              // Handle wrap-around for smooth infinite effect
              if (position < -2) position += philosophies.length;
              if (position > 2) position -= philosophies.length;
              
              const isActive = index === currentIndex;
              const isVisible = Math.abs(position) <= 2;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    isActive 
                      ? 'opacity-100 scale-100 z-20' 
                      : isVisible 
                        ? 'opacity-0 scale-95 z-10' 
                        : 'opacity-0 scale-90 z-0'
                  }`}
                  style={{
                    transform: `translateX(${position * 100}%) scale(${isActive ? 1 : 0.95})`
                  }}
                >
                  <div className={`h-full w-full bg-gradient-to-br ${philosophy.bgGradient} backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl overflow-hidden relative`}>
                    <div className={`absolute inset-0 rounded-2xl opacity-40`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${philosophy.gradient} rounded-2xl opacity-10`} />
                    </div>
                    
                    <div className="h-full flex flex-col justify-center p-8 lg:p-12 text-center relative z-10">
                      <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${philosophy.gradient} opacity-50`} />
                      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${philosophy.gradient} opacity-50`} />
                      
                      <div className="mb-6 relative">
                        <div className="text-5xl lg:text-6xl inline-block">
                          {philosophy.icon}
                        </div>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        {philosophy.tradition}
                      </h3>

                      <div className="mb-4 space-y-1">
                        {philosophy.sanskrit && (
                          <p className="text-lg lg:text-xl font-medium text-gray-700">
                            {philosophy.sanskrit}
                          </p>
                        )}
                        {philosophy.latin && (
                          <p className="text-lg lg:text-xl font-medium text-gray-700 italic">
                            {philosophy.latin}
                          </p>
                        )}
                        {philosophy.japanese && (
                          <p className="text-lg lg:text-xl font-medium text-gray-700">
                            {philosophy.japanese}
                          </p>
                        )}
                        {philosophy.modern && (
                          <p className={`text-lg lg:text-xl font-medium bg-gradient-to-r ${philosophy.gradient} bg-clip-text text-transparent`}>
                            {philosophy.modern}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 italic">
                          "{philosophy.translation}"
                        </p>
                      </div>

                      <div className="mb-6">
                        <div className={`inline-block px-6 py-2 rounded-full bg-gradient-to-r ${philosophy.gradient} text-white font-semibold text-sm shadow-lg`}>
                          {philosophy.principle}
                        </div>
                      </div>

                      <div className="mb-6 max-w-2xl mx-auto">
                        <p className="text-base lg:text-lg text-gray-800 leading-relaxed">
                          {philosophy.description}
                        </p>
                      </div>

                      <div className="relative max-w-3xl mx-auto">
                        <Quote className={`absolute -top-2 -left-2 w-6 h-6 text-${philosophy.accentColor}/30`} />
                        <blockquote className="text-sm lg:text-base italic text-gray-700 leading-relaxed pl-6 pr-2">
                          {philosophy.quote}
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
            <div className="bg-white/20 backdrop-blur-xl rounded-full p-1 border border-white/30">
              <div className="flex space-x-1">
                {philosophies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`block w-8 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? `bg-gradient-to-r ${currentPhilosophy.gradient}` 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compact Bottom CTA */}
        <div className="text-center mt-12">
          <div className="max-w-lg mx-auto bg-white/60 backdrop-blur-xl rounded-xl p-4 lg:p-5 shadow-lg border border-white/20">
            <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
              Ready to Begin?
            </h4>
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">
              Join thousands discovering ancient wisdom in modern practice.
            </p>
            <button className={`px-6 py-2 bg-gradient-to-r ${currentPhilosophy.gradient} text-white font-medium text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 transform`}>
              Start 5-Min Ritual
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;