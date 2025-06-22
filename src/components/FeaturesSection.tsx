
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Truth Bombs",
      description: "Daily wisdom prompts that spark deep reflection and self-awareness. Ancient insights delivered with modern clarity.",
      image: "📝",
      reverse: false
    },
    {
      title: "Mood Tracking",
      description: "Gentle emotion logging with beautiful visualizations. Understand your patterns and celebrate your progress.",
      image: "📊",
      reverse: true
    },
    {
      title: "SparkFeed",
      description: "Anonymous wisdom sharing with your community. Real growth conversations without judgment or pressure.",
      image: "💬",
      reverse: false
    },
    {
      title: "Daily Journal",
      description: "Your private reflection space with guided prompts. Write with intention and insight in a beautiful, distraction-free environment.",
      image: "📖",
      reverse: true
    },
    {
      title: "Progress Visualization",
      description: "See your transformation through elegant charts and milestone celebrations. Growth made visible and motivating.",
      image: "🎯",
      reverse: false
    }
  ];

  return (
    <section id="features" className="section-padding bg-soft-white">
      <div className="container-width">
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

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`grid lg:grid-cols-2 gap-16 items-center ${feature.reverse ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Content */}
              <div className={`space-y-8 ${feature.reverse ? 'lg:col-start-2' : ''} animate-slide-up`}>
                <h3 className="text-4xl md:text-5xl font-bold text-deep-black leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xl text-slate-gray leading-relaxed">
                  {feature.description}
                </p>
                <button className="outline-button">
                  Learn More
                </button>
              </div>

              {/* Mock Phone/Visual */}
              <div className={`${feature.reverse ? 'lg:col-start-1' : ''} animate-fade-in`}>
                <div className="relative w-80 h-[500px] mx-auto">
                  {/* Phone Frame */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 rounded-[2.5rem] p-4 gentle-shadow">
                    {/* Screen */}
                    <div className="h-full bg-white rounded-[2rem] overflow-hidden flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-6 animate-gentle-bounce">
                          {feature.image}
                        </div>
                        <div className="premium-card p-6 mx-4">
                          <h4 className="text-lg font-semibold text-deep-black mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-slate-gray">
                            Experience the feature in action
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-champagne-gold/5 to-blush-rose/5 rounded-[2.5rem] blur-xl -z-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
