import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const featureRefs = useRef([]);
  const [animatedFeatures, setAnimatedFeatures] = useState(new Set());
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const features = useMemo(() => [
    {
      title: "Truth Bombs",
      description: "Daily wisdom prompts that spark deep reflection and self-awareness. Ancient insights delivered with modern clarity to transform your mindset.",
      icon: "💎",
      color: "from-rose-400 via-pink-500 to-fuchsia-500",
      bgColor: "from-rose-50/80 via-pink-50/60 to-fuchsia-50/40",
      content: {
        quote: "The unexamined life is not worth living",
        author: "Socrates",
        bgGradient: "from-rose-100 to-pink-100"
      }
    },
    {
      title: "Mood Tracking",
      description: "Gentle emotion logging with beautiful visualizations. Understand your patterns, celebrate progress, and build emotional intelligence.",
      icon: "📊",
      color: "from-purple-400 via-purple-500 to-indigo-500",
      bgColor: "from-purple-50/80 via-indigo-50/60 to-violet-50/40",
      content: {
        moods: ['😊', '😌', '🤔', '😴', '🎯', '💪'],
        bgGradient: "from-purple-100 to-indigo-100"
      }
    },
    {
      title: "SparkFeed",
      description: "Anonymous wisdom sharing with your community. Real growth conversations without judgment or pressure. Connect authentically.",
      icon: "💬",
      color: "from-emerald-400 via-emerald-500 to-teal-500",
      bgColor: "from-emerald-50/80 via-teal-50/60 to-cyan-50/40",
      content: {
        posts: [
          { text: "Started meditation today! 🧘‍♀️", likes: 23 },
          { text: "Gratitude changes everything ✨", likes: 47 }
        ],
        bgGradient: "from-emerald-100 to-teal-100"
      }
    },
    {
      title: "Daily Journal",
      description: "Your private reflection space with guided prompts. Write with intention and insight in a beautiful, distraction-free environment.",
      icon: "📖",
      color: "from-amber-400 via-amber-500 to-orange-500",
      bgColor: "from-amber-50/80 via-orange-50/60 to-yellow-50/40",
      content: {
        text: "Today I learned that mindfulness isn't about emptying your mind, but about being present with whatever arises...",
        bgGradient: "from-amber-100 to-orange-100"
      }
    },
    {
      title: "Progress Visualization",
      description: "See your transformation through elegant charts and milestone celebrations. Growth made visible and motivating with beautiful insights.",
      icon: "🎯",
      color: "from-blue-400 via-blue-500 to-cyan-500",
      bgColor: "from-blue-50/80 via-cyan-50/60 to-sky-50/40",
      content: {
        progress: 78,
        metrics: [
          { icon: "🎯", label: "Goals" },
          { icon: "📈", label: "Growth" },
          { icon: "✨", label: "Insights" }
        ],
        bgGradient: "from-blue-100 to-cyan-100"
      }
    }
  ], []);

  const animatePath = useCallback(() => {
    if (pathRef.current && !reducedMotion) {
      const pathLength = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = pathLength.toString();
      pathRef.current.style.strokeDashoffset = pathLength.toString();
      pathRef.current.style.transition = 'stroke-dashoffset 3s cubic-bezier(0.4, 0, 0.2, 1)';
      
      requestAnimationFrame(() => {
        if (pathRef.current) {
          pathRef.current.style.strokeDashoffset = '0';
        }
      });
    }
  }, [reducedMotion]);

  useEffect(() => {
    const pathObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animatePath();
          }
        });
      },
      { threshold: 0.1 }
    );

    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            if (!animatedFeatures.has(index)) {
              const delay = reducedMotion ? 0 : index * 100;
              setTimeout(() => {
                setAnimatedFeatures(prev => new Set([...prev, index]));
              }, delay);
            }
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '-30px'
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

    return () => {
      pathObserver.disconnect();
      featureObserver.disconnect();
    };
  }, [animatedFeatures, animatePath, reducedMotion]);

  const renderFeatureContent = useCallback((feature, index, isAnimated) => {
    switch (index) {
      case 0:
        return (
          <div className={`p-4 bg-gradient-to-r ${feature.content.bgGradient} rounded-2xl shadow-inner`}>
            <blockquote className="text-sm italic text-gray-900 font-medium mb-2">
              "{feature.content.quote}"
            </blockquote>
            <cite className="text-xs text-rose-600 font-semibold not-italic">— {feature.content.author}</cite>
          </div>
        );
      
      case 1:
        return (
          <div className="grid grid-cols-3 gap-2">
            {feature.content.moods.map((emoji, i) => (
              <button 
                key={i} 
                className={`h-12 bg-gradient-to-br ${feature.content.bgGradient} border border-white/50 rounded-xl flex items-center justify-center text-xl shadow-sm hover:scale-105 transition-transform cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400`}
                aria-label={`Mood option ${i + 1}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-2">
            {feature.content.posts.map((post, i) => (
              <article key={i} className={`text-left p-3 bg-gradient-to-r ${feature.content.bgGradient} border border-white/30 rounded-xl shadow-sm`}>
                <p className="text-sm text-gray-900 font-medium mb-1">"{post.text}"</p>
                <div className="flex items-center">
                  <span className="text-sm text-red-500" aria-hidden="true">❤️</span>
                  <span className="text-xs text-gray-600 ml-1 font-medium">{post.likes} likes</span>
                </div>
              </article>
            ))}
          </div>
        );
      
      case 3:
        return (
          <div className={`p-3 border-2 border-white/30 rounded-xl bg-gradient-to-br ${feature.content.bgGradient} shadow-inner`}>
            <div className="text-sm font-mono leading-relaxed text-gray-900">
              {feature.content.text}
              <span className={`${reducedMotion ? '' : 'animate-pulse'} text-gray-600`}>|</span>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <div className="flex justify-between text-sm mb-2 font-semibold">
              <span className="text-gray-700">Weekly Progress</span>
              <span className="text-blue-600">{feature.content.progress}%</span>
            </div>
            <div className="w-full bg-gray-200/50 rounded-full h-3 overflow-hidden mb-3">
              <div 
                className={`bg-gradient-to-r ${feature.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: isAnimated && !reducedMotion ? `${feature.content.progress}%` : reducedMotion ? `${feature.content.progress}%` : '0%',
                  transitionDelay: '0.3s'
                }}
                role="progressbar"
                aria-valuenow={feature.content.progress}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Weekly progress"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {feature.content.metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl mb-1" aria-hidden="true">{metric.icon}</div>
                  <div className="text-xs text-gray-600 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  }, [reducedMotion]);

  return (
    <>
      <section 
        id="features" 
        ref={sectionRef} 
        className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden"
        aria-labelledby="features-heading"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl ${reducedMotion ? '' : 'animate-pulse'}`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300 rounded-full filter blur-3xl ${reducedMotion ? '' : 'animate-pulse'}`} style={reducedMotion ? {} : {animationDelay: '2s'}}></div>
          <div className={`absolute top-3/4 left-1/2 w-64 h-64 bg-rose-300 rounded-full filter blur-3xl ${reducedMotion ? '' : 'animate-pulse'}`} style={reducedMotion ? {} : {animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <header className="text-center mb-20">
            <h2 id="features-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Everything you need for
              <span className="block bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                mindful growth.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Five powerful tools designed to make self-awareness effortless and transformation sustainable.
            </p>
          </header>

          {/* Features */}
          <div className="relative max-w-6xl mx-auto">
            {/* Animated Path */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0" 
              viewBox="0 0 800 2000"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                ref={pathRef}
                d="M 150 180 Q 400 220 650 260 Q 500 420 200 480 Q 600 640 550 800 Q 250 960 450 1120 Q 700 1280 180 1440"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>

            {/* Features Grid */}
            <div className="relative z-20 space-y-24">
              {features.map((feature, index) => {
                const isAnimated = animatedFeatures.has(index);
                const isEven = index % 2 === 0;
                
                return (
                  <article 
                    key={index} 
                    ref={(el) => (featureRefs.current[index] = el)}
                    className={`feature-card transition-all duration-1000 ease-out ${
                      isAnimated ? 'animate-in' : ''
                    }`}
                  >
                    <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:grid-flow-col-dense'
                    }`}>
                      
                      {/* Content Side */}
                      <div className={`space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-lg transform transition-transform duration-500 hover:scale-110`} aria-hidden="true">
                            {feature.icon}
                          </div>
                          <div className={`w-10 h-1 bg-gradient-to-r ${feature.color} rounded-full`} aria-hidden="true"></div>
                        </div>
                        
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                          {feature.title}
                        </h3>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>

                      {/* iPhone Mockup Side */}
                      <div className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'} flex justify-center`}>
                        <div className="relative group">
                          <div className="relative w-72 h-[580px] transform transition-all duration-700 ease-out hover:scale-105">
                            {/* iPhone Frame */}
                            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                              <div className={`h-full bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm rounded-[2rem] overflow-hidden flex flex-col relative`}>
                                
                                {/* Dynamic Island */}
                                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-full z-10 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                                </div>
                                
                                {/* Status Bar */}
                                <div className="flex justify-between items-center px-6 pt-10 pb-4 text-sm text-gray-900 font-medium">
                                  <time className="font-semibold">9:41</time>
                                  <div className="flex items-center space-x-1" aria-label="Battery and signal status">
                                    <div className="flex space-x-0.5">
                                      <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                                      <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                                      <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    </div>
                                    <svg className="w-5 h-3 ml-1" viewBox="0 0 24 12" fill="none" aria-label="Battery">
                                      <rect x="1" y="3" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="1"/>
                                      <rect x="19" y="5" width="2" height="2" rx="0.5" fill="currentColor"/>
                                      <rect x="3" y="4" width="14" height="4" rx="1" fill="#22c55e"/>
                                    </svg>
                                  </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 p-6 flex flex-col justify-center">
                                  <div className="text-center mb-8">
                                    <div className={`text-5xl mb-6 ${reducedMotion ? '' : 'animate-float'}`} aria-hidden="true">
                                      {feature.icon}
                                    </div>
                                    
                                    <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-6">
                                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                                        {feature.title}
                                      </h4>
                                      <p className="text-sm text-gray-600 mb-4">
                                        Experience the feature in action
                                      </p>
                                      
                                      {renderFeatureContent(feature, index, isAnimated)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-10 rounded-[2.5rem] blur-2xl -z-10 group-hover:opacity-20 transition-opacity duration-700`} aria-hidden="true"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Updated CTA Section */}
          <div className="text-center mt-16">
            <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to transform your routine?
              </h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Join thousands discovering ancient wisdom in modern practice.
              </p>
              <button className="px-6 py-2.5 bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 text-white font-medium text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 transform focus:outline-none focus:ring-3 focus:ring-pink-300/50">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          .feature-card {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .feature-card.animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          @media (prefers-reduced-motion: reduce) {
            .feature-card {
              transform: none;
              transition: opacity 0.3s ease;
            }
            
            .animate-float,
            .animate-pulse {
              animation: none;
            }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px);
            }
            50% { 
              transform: translateY(-10px);
            }
          }

          .backdrop-blur-xl {
            backdrop-filter: blur(24px) saturate(180%);
          }

          @media (max-width: 1024px) {
            .feature-card {
              margin-bottom: 4rem;
            }
          }

          @media (max-width: 768px) {
            .w-72 {
              width: 280px;
              height: 520px;
            }
          }
        `
      }} />
    </>
  );
};

export default FeaturesSection;