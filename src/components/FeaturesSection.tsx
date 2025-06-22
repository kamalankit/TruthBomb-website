import React, { useEffect, useRef, useState } from 'react';

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const featureRefs = useRef([]);
  const [animatedFeatures, setAnimatedFeatures] = useState(new Set());

  const features = [
    {
      title: "Truth Bombs",
      description: "Daily wisdom prompts that spark deep reflection and self-awareness. Ancient insights delivered with modern clarity.",
      icon: "📝",
      color: "from-yellow-400 to-pink-400",
      delay: 0
    },
    {
      title: "Mood Tracking",
      description: "Gentle emotion logging with beautiful visualizations. Understand your patterns and celebrate your progress.",
      icon: "📊",
      color: "from-purple-400 to-cyan-400",
      delay: 200
    },
    {
      title: "SparkFeed",
      description: "Anonymous wisdom sharing with your community. Real growth conversations without judgment or pressure.",
      icon: "💬",
      color: "from-pink-400 to-purple-400",
      delay: 400
    },
    {
      title: "Daily Journal",
      description: "Your private reflection space with guided prompts. Write with intention and insight in a beautiful, distraction-free environment.",
      icon: "📖",
      color: "from-cyan-400 to-yellow-400",
      delay: 600
    },
    {
      title: "Progress Visualization",
      description: "See your transformation through elegant charts and milestone celebrations. Growth made visible and motivating.",
      icon: "🎯",
      color: "from-yellow-400 to-purple-400",
      delay: 800
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Path animation observer
    const pathObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && pathRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = pathLength.toString();
            pathRef.current.style.strokeDashoffset = pathLength.toString();
            pathRef.current.style.transition = 'stroke-dashoffset 3s ease-in-out';
            
            setTimeout(() => {
              if (pathRef.current) {
                pathRef.current.style.strokeDashoffset = '0';
              }
            }, 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Feature animation observer
    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            if (!animatedFeatures.has(index)) {
              setTimeout(() => {
                setAnimatedFeatures(prev => new Set([...prev, index]));
              }, features[index].delay);
            }
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-50px'
      }
    );

    if (sectionRef.current) {
      pathObserver.observe(sectionRef.current);
    }

    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        featureObserver.observe(ref);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      pathObserver.disconnect();
      featureObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animatedFeatures]);

  return (
    <>
      <section 
        id="features" 
        ref={sectionRef} 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              Everything you need for
              <span className="bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent block">
                mindful growth.
              </span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Five powerful tools designed to make self-awareness effortless and transformation sustainable.
            </p>
          </div>

          {/* Features with Path */}
          <div className="relative max-w-6xl mx-auto">
            {/* Animated Path */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0" 
              viewBox="0 0 800 1600"
              style={{ top: '0px' }}
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#f472b6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d="M 100 150 Q 400 200 700 250 Q 600 400 200 450 Q 500 600 600 750 Q 300 900 400 1050 Q 650 1200 150 1350"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="0"
                strokeDashoffset="0"
                opacity="0.6"
              />
            </svg>

            {/* Features Grid */}
            <div className="relative z-20">
              {features.map((feature, index) => {
                const isAnimated = animatedFeatures.has(index);
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={index} 
                    ref={(el) => (featureRefs.current[index] = el)}
                    className={`feature-card mb-32 last:mb-0 transition-all duration-1000 ease-out ${
                      isAnimated ? 'animate-in' : ''
                    }`}
                    style={{
                      transitionDelay: `${feature.delay}ms`
                    }}
                  >
                    <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                      isEven ? '' : 'lg:grid-flow-col-dense'
                    }`}>
                      
                      {/* Content Side */}
                      <div className={`space-y-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-lg transform transition-transform duration-500 hover:scale-110`}>
                            {feature.icon}
                          </div>
                          <div className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-pink-500 rounded-full"></div>
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                          {feature.title}
                        </h3>
                        
                        <p className="text-xl text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <button className="bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold py-4 px-8 rounded-2xl group">
                          <span>Learn More</span>
                          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>

                      {/* Phone Mockup Side */}
                      <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className="relative group">
                          <div className="relative w-80 h-[500px] mx-auto transform transition-all duration-700 ease-out phone-frame">
                            {/* Phone Frame */}
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 rounded-[2.5rem] p-4 shadow-2xl">
                              <div className="h-full bg-white rounded-[2rem] overflow-hidden flex flex-col relative">
                                
                                {/* Status Bar */}
                                <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs text-gray-500 bg-white">
                                  <span className="font-semibold">9:41</span>
                                  <div className="flex space-x-1">
                                    <div className="w-4 h-2 bg-yellow-500 rounded-sm"></div>
                                    <div className="w-4 h-2 bg-yellow-500 rounded-sm opacity-70"></div>
                                    <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                                  </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 p-6 flex flex-col justify-center bg-white">
                                  <div className="text-center mb-8">
                                    <div className="text-6xl mb-6 float-animation">
                                      {feature.icon}
                                    </div>
                                    
                                    <div className="bg-white border-2 border-gray-100 rounded-3xl shadow-lg p-6">
                                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 mb-4">
                                        Experience the feature in action
                                      </p>
                                      
                                      {/* Feature-specific content */}
                                      {index === 0 && (
                                        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-xl">
                                          <p className="text-xs italic text-gray-900 font-medium">
                                            "The unexamined life is not worth living"
                                          </p>
                                          <p className="text-xs text-yellow-600 mt-1 font-medium">— Socrates</p>
                                        </div>
                                      )}
                                      
                                      {index === 1 && (
                                        <div className="mt-4 grid grid-cols-2 gap-2">
                                          {['😊', '😌', '🤔', '😴'].map((emoji, i) => (
                                            <div key={i} className="w-full h-12 bg-purple-100 border-2 border-purple-200 rounded-xl flex items-center justify-center text-lg shadow-sm hover:scale-105 transition-transform cursor-pointer">
                                              <span className="text-xl">{emoji}</span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                      
                                      {index === 2 && (
                                        <div className="mt-4 space-y-2">
                                          <div className="text-left p-3 bg-cyan-50 border border-cyan-100 rounded-lg">
                                            <p className="text-xs text-gray-900 font-medium">"Started meditation today! 🧘‍♀️"</p>
                                            <div className="flex items-center mt-2">
                                              <span className="text-xs text-red-500">❤️</span>
                                              <span className="text-xs text-gray-600 ml-1">23 likes</span>
                                            </div>
                                          </div>
                                          <div className="text-left p-3 bg-pink-50 border border-pink-100 rounded-lg">
                                            <p className="text-xs text-gray-900 font-medium">"Gratitude changes everything ✨"</p>
                                            <div className="flex items-center mt-2">
                                              <span className="text-xs text-red-500">❤️</span>
                                              <span className="text-xs text-gray-600 ml-1">47 likes</span>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {index === 3 && (
                                        <div className="mt-4">
                                          <div className="w-full min-h-[80px] text-xs p-3 border-2 border-gray-200 rounded-lg bg-gray-50 font-mono leading-relaxed">
                                            <span className="text-gray-900">Today I learned that mindfulness isn't about emptying your mind, but about being present with whatever arises...</span>
                                            <span className="animate-pulse text-gray-600">|</span>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {index === 4 && (
                                        <div className="mt-4">
                                          <div className="flex justify-between text-xs mb-2 font-medium">
                                            <span className="text-gray-700">Weekly Progress</span>
                                            <span className="text-yellow-600 font-bold">78%</span>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                            <div 
                                              className="bg-gradient-to-r from-yellow-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out progress-bar" 
                                            ></div>
                                          </div>
                                          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                                            <div className="text-center">
                                              <div className="text-2xl">🎯</div>
                                              <div className="text-gray-600">Goals</div>
                                            </div>
                                            <div className="text-center">
                                              <div className="text-2xl">📈</div>
                                              <div className="text-gray-600">Growth</div>
                                            </div>
                                            <div className="text-center">
                                              <div className="text-2xl">✨</div>
                                              <div className="text-gray-600">Insights</div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-10 rounded-[2.5rem] blur-xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          /* Base feature card styles */
          .feature-card {
            opacity: 0;
            transform: translateY(80px) scale(0.95);
            transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
          }

          /* Animated state */
          .feature-card.animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          /* Floating animation for icons */
          .float-animation {
            animation: float 4s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg);
            }
            33% { 
              transform: translateY(-10px) rotate(2deg);
            }
            66% { 
              transform: translateY(5px) rotate(-1deg);
            }
          }

          /* Progress bar animation */
          .progress-bar {
            width: 0%;
            animation: fillProgress 2s ease-out 1s forwards;
          }

          @keyframes fillProgress {
            to {
              width: 78%;
            }
          }

          /* Phone hover effect */
          .phone-frame:hover {
            transform: scale(1.05) rotateY(3deg);
          }

          /* Smooth transitions for all elements */
          .feature-card * {
            transition: transform 0.3s ease, opacity 0.3s ease;
          }

          /* Enhanced button hover */
          .feature-card button:hover svg {
            transform: translateX(4px);
          }

          /* Responsive adjustments */
          @media (max-width: 1024px) {
            .feature-card {
              margin-bottom: 4rem;
            }
            
            .phone-frame {
              width: 320px;
              height: 480px;
            }
          }

          @media (max-width: 768px) {
            .feature-card {
              margin-bottom: 3rem;
            }
            
            .phone-frame {
              width: 280px;
              height: 450px;
            }
          }
        `
      }} />
    </>
  );
};

export default FeaturesSection;