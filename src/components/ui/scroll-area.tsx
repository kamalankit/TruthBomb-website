import React, { useEffect, useRef, useState } from 'react';

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const features = [
    {
      title: "Truth Bombs",
      description: "Daily wisdom prompts that spark deep reflection and self-awareness. Ancient insights delivered with modern clarity.",
      icon: "📝",
      color: "from-yellow-400 to-pink-400",
      bgColor: "from-yellow-50 to-pink-50"
    },
    {
      title: "Mood Tracking",
      description: "Gentle emotion logging with beautiful visualizations. Understand your patterns and celebrate your progress.",
      icon: "📊",
      color: "from-purple-400 to-cyan-400",
      bgColor: "from-purple-50 to-cyan-50"
    },
    {
      title: "SparkFeed",
      description: "Anonymous wisdom sharing with your community. Real growth conversations without judgment or pressure.",
      icon: "💬",
      color: "from-pink-400 to-purple-400",
      bgColor: "from-pink-50 to-purple-50"
    },
    {
      title: "Daily Journal",
      description: "Your private reflection space with guided prompts. Write with intention and insight in a beautiful, distraction-free environment.",
      icon: "📖",
      color: "from-cyan-400 to-yellow-400",
      bgColor: "from-cyan-50 to-yellow-50"
    },
    {
      title: "Progress Visualization",
      description: "See your transformation through elegant charts and milestone celebrations. Growth made visible and motivating.",
      icon: "🎯",
      color: "from-yellow-400 to-purple-400",
      bgColor: "from-yellow-50 to-purple-50"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isScrolling) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate progress through the section
        const sectionHeight = rect.height;
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight)));
        
        // Calculate which feature should be active based on scroll progress
        const newIndex = Math.floor(progress * features.length);
        const clampedIndex = Math.max(0, Math.min(features.length - 1, newIndex));
        
        if (clampedIndex !== currentIndex) {
          setCurrentIndex(clampedIndex);
        }
      }
    };

    const throttledScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [currentIndex, isScrolling]);

  // Throttle function for smooth performance
  function throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function(this: any) {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  const handleDotClick = (index: number) => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentIndex(index);
    setTimeout(() => setIsScrolling(false), 800);
  };

  const renderPhonePreview = (feature: typeof features[0], index: number) => {
    return (
      <div className="relative w-80 h-[500px] mx-auto">
        <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
          <div className="h-full bg-white rounded-[2rem] overflow-hidden flex flex-col relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs text-gray-500 bg-white">
              <span className="font-semibold">9:41</span>
              <div className="flex space-x-1">
                <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                <div className="w-4 h-2 bg-green-500 rounded-sm opacity-70"></div>
                <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
              </div>
            </div>

            {/* Feature Content */}
            <div className={`flex-1 p-6 flex flex-col justify-center bg-gradient-to-b ${feature.bgColor}`}>
              <div className="text-center">
                <div className="text-5xl mb-4 animate-bounce">
                  {feature.icon}
                </div>
                <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-lg p-4 mx-2">
                  <h4 className="text-base font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Interactive preview
                  </p>
                  
                  {/* Feature-specific UI elements */}
                  {index === 0 && (
                    <div className="mt-3 p-3 bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs italic text-gray-800 font-medium">
                        "The unexamined life is not worth living"
                      </p>
                      <p className="text-xs text-yellow-700 mt-1 font-semibold">— Socrates</p>
                    </div>
                  )}
                  
                  {index === 1 && (
                    <div className="mt-3 p-3">
                      <p className="text-xs text-gray-600 mb-2">How are you feeling?</p>
                      <div className="flex justify-center space-x-2">
                        {['😊', '😌', '🤔', '😴'].map((emoji, i) => (
                          <div key={i} className="w-10 h-10 bg-purple-100 border-2 border-purple-200 rounded-xl flex items-center justify-center text-lg hover:bg-purple-200 cursor-pointer transition-colors">
                            {emoji}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {index === 2 && (
                    <div className="mt-3 space-y-2">
                      <div className="text-left p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-gray-800 font-medium">"Started meditation today! 🧘‍♀️"</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-red-500">❤️ 23 likes</p>
                          <p className="text-xs text-gray-500">2h ago</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {index === 3 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-2">Today's reflection:</p>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          "Today I learned that taking small steps leads to big changes..."
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {index === 4 && (
                    <div className="mt-3 p-3">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-medium text-gray-700">Weekly Goals</span>
                        <span className="text-green-600 font-bold">4/5 ✓</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500" style={{width: '80%'}}></div>
                      </div>
                      <p className="text-xs text-gray-500">80% complete</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-20 rounded-[2.5rem] blur-2xl -z-10 transition-opacity duration-500`}></div>
      </div>
    );
  };

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="min-h-[400vh] bg-gray-50 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything you need for
              <span className="bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent block">
                mindful growth.
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Five powerful tools designed to make self-awareness effortless and transformation sustainable.
            </p>
          </div>

          {/* Main Slider Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Feature Details */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${features[currentIndex].color} flex items-center justify-center text-2xl shadow-lg transition-all duration-700 ease-out`}>
                  {features[currentIndex].icon}
                </div>
                <div className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full transition-all duration-700"></div>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight transition-all duration-700 ease-out">
                {features[currentIndex].title}
              </h3>
              
              <p className="text-xl text-gray-600 leading-relaxed transition-all duration-700 ease-out">
                {features[currentIndex].description}
              </p>
              
              <button className="bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold py-4 px-8 rounded-2xl group">
                <span>Learn More</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Progress Dots */}
              <div className="flex space-x-3 pt-8">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      index === currentIndex 
                        ? `bg-gradient-to-r ${features[currentIndex].color} scale-125` 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Phone Preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="transform transition-all duration-700 ease-out">
                {renderPhonePreview(features[currentIndex], currentIndex)}
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2 shadow-sm">
              <p className="text-sm text-gray-600 font-medium flex items-center space-x-2">
                <span>↕️</span>
                <span>Scroll to explore features</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;