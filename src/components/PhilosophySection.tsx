
import React from 'react';

const PhilosophySection = () => {
  const pillars = [
    {
      title: "Mindful.",
      description: "Ancient wisdom meets modern clarity. Find peace in the present moment.",
      icon: "🧘‍♀️"
    },
    {
      title: "Measured.",
      description: "Track your emotional patterns and growth with gentle precision.",
      icon: "📈"
    },
    {
      title: "Modern.",
      description: "Designed for digital natives who value both depth and simplicity.",
      icon: "✨"
    }
  ];

  return (
    <section id="philosophy" className="section-padding bg-gradient-to-br from-soft-lavender/30 to-pale-aqua/30">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black text-deep-black mb-8 leading-tight">
            Ancient Wisdom.
            <span className="gradient-text block">Digital Awakening.</span>
          </h2>
          
          <p className="text-2xl text-slate-gray max-w-4xl mx-auto leading-relaxed">
            Truth Bomb bridges timeless philosophical insights with modern digital tools, 
            creating a sanctuary for conscious growth in the digital age.
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Icon */}
              <div className="relative mb-8">
                <div className="w-32 h-32 mx-auto rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500 gentle-shadow">
                  <span className="animate-gentle-bounce">{pillar.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-deep-black group-hover:text-champagne-gold transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-lg text-slate-gray group-hover:text-deep-black transition-colors duration-300 max-w-xs mx-auto leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Inspirational Quote */}
        <div className="text-center">
          <div className="premium-card p-12 max-w-4xl mx-auto gentle-shadow">
            <blockquote className="text-3xl md:text-4xl italic text-deep-black mb-6 leading-relaxed">
              "The unexamined life is not worth living"
            </blockquote>
            <cite className="text-xl text-slate-gray font-medium">— Socrates</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
