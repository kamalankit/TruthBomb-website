import React, { useEffect, useRef } from 'react';

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const features = [
    {
      title: "Truth Bombs",
      description: "Daily wisdom prompts that spark deep reflection and self-awareness. Ancient insights delivered with modern clarity.",
      icon: "📝",
      color: "from-champagne-gold to-blush-rose",
      delay: 0
    },
    {
      title: "Mood Tracking",
      description: "Gentle emotion logging with beautiful visualizations. Understand your patterns and celebrate your progress.",
      icon: "📊",
      color: "from-soft-lavender to-pale-aqua",
      delay: 200
    },
    {
      title: "SparkFeed",
      description: "Anonymous wisdom sharing with your community. Real growth conversations without judgment or pressure.",
      icon: "💬",
      color: "from-blush-rose to-soft-lavender",
      delay: 400
    },
    {
      title: "Daily Journal",
      description: "Your private reflection space with guided prompts. Write with intention and insight in a beautiful, distraction-free environment.",
      icon: "📖",
      color: "from-pale-aqua to-champagne-gold",
      delay: 600
    },
    {
      title: "Progress Visualization",
      description: "See your transformation through elegant charts and milestone celebrations. Growth made visible and motivating.",
      icon: "🎯",
      color: "from-champagne-gold to-soft-lavender",
      delay: 800
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the path drawing
            if (pathRef.current) {
              pathRef.current.style.strokeDasharray = pathRef.current.getTotalLength().toString();
              pathRef.current.style.strokeDashoffset = pathRef.current.getTotalLength().toString();
              pathRef.current.style.animation = 'drawPath 3s ease-in-out forwards';
            }

            // Animate feature cards with staggered delays
            const featureCards = entry.target.querySelectorAll('.feature-card');
            featureCards.forEach((card, index) => {
              setTimeout(() => {
                (card as HTMLElement).classList.add('animate-in');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-soft-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-lavender rounded-full filter blur-3xl floating-bg"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pale-aqua rounded-full filter blur-3xl floating-bg"></div>
      </div>

      <div className="container-width relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black text-deep-black mb-8 leading-tight">
            Everything you need for
            <span className="gradient-text block">mindful growth.</span>
          </h2>
          <p className="text-2xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Five powerful tools designed to make self-awareness effortless and transformation sustainable.
          </p>
        </div>

        {/* Features Flow Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated Connection Path */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 800 1200"
            style={{ top: '50px' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D5AE70" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#F6D4D4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E4DEFA" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 100 100 Q 400 150 700 200 Q 600 350 200 400 Q 500 550 600 700 Q 300 850 400 1000"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0"
              strokeDashoffset="0"
            />
          </svg>

          {/* Feature Cards */}
          <div className="relative z-10 space-y-24">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card opacity-0 transform translate-y-20 transition-all duration-1000 ease-out ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Content */}
                  <div className={`space-y-8 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {feature.icon}
                      </div>
                      <div className="w-8 h-1 bg-gradient-to-r from-champagne-gold to-blush-rose rounded-full"></div>
                    </div>
                    
                    <h3 className="text-4xl md:text-5xl font-bold text-deep-black leading-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-xl text-slate-gray leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <button className="outline-button group">
                      <span>Learn More</span>
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>

                  {/* Interactive Feature Preview */}
                  <div className={`${index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'}`}>
                    <div className="relative group">
                      {/* Phone Frame */}
                      <div className="relative w-80 h-[500px] mx-auto transform group-hover:scale-105 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 rounded-[2.5rem] p-4 gentle-shadow">
                          {/* Screen */}
                          <div className="h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
                            {/* Status Bar */}
                            <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs text-slate-gray">
                              <span className="font-semibold">9:41</span>
                              <div className="flex space-x-1">
                                <div className="w-4 h-2 bg-champagne-gold rounded-sm"></div>
                                <div className="w-4 h-2 bg-champagne-gold rounded-sm opacity-70"></div>
                                <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                              </div>
                            </div>

                            {/* Feature Content */}
                            <div className="flex-1 p-6 flex flex-col justify-center">
                              <div className="text-center mb-8">
                                <div className="text-6xl mb-6 animate-gentle-bounce">
                                  {feature.icon}
                                </div>
                                <div className="premium-card p-6">
                                  <h4 className="text-lg font-semibold text-deep-black mb-2">
                                    {feature.title}
                                  </h4>
                                  <p className="text-sm text-slate-gray">
                                    Experience the feature in action
                                  </p>
                                  
                                  {/* Feature-specific UI elements */}
                                  {index === 0 && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-champagne-gold/10 to-blush-rose/10 rounded-xl">
                                      <p className="text-xs italic text-deep-black">
                                        "The unexamined life is not worth living"
                                      </p>
                                      <p className="text-xs text-champagne-gold mt-1">— Socrates</p>
                                    </div>
                                  )}
                                  
                                  {index === 1 && (
                                    <div className="mt-4 flex justify-center space-x-2">
                                      {['😊', '😌', '🤔', '😴'].map((emoji, i) => (
                                        <div key={i} className="w-8 h-8 bg-soft-lavender rounded-lg flex items-center justify-center text-sm">
                                          {emoji}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {index === 2 && (
                                    <div className="mt-4 space-y-2">
                                      <div className="text-left p-2 bg-pale-aqua/20 rounded-lg">
                                        <p className="text-xs text-deep-black">"Started meditation today!"</p>
                                        <p className="text-xs text-champagne-gold">❤️ 23</p>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {index === 3 && (
                                    <div className="mt-4">
                                      <textarea 
                                        className="w-full h-16 text-xs p-2 border border-gray-200 rounded-lg resize-none"
                                        placeholder="Today I learned..."
                                        readOnly
                                      />
                                    </div>
                                  )}
                                  
                                  {index === 4 && (
                                    <div className="mt-4">
                                      <div className="flex justify-between text-xs mb-2">
                                        <span>Weekly Progress</span>
                                        <span className="text-champagne-gold">78%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-champagne-gold to-blush-rose h-2 rounded-full" style={{width: '78%'}}></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-b ${feature.color} opacity-10 rounded-[2.5rem] blur-xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        .feature-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;