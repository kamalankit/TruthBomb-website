
import React from 'react';

const CommunitySection = () => {
  const testimonials = [
    {
      quote: "Truth Bomb completely shifted my perspective on daily growth. The 5-minute ritual has become the most important part of my day.",
      author: "Priya",
      age: 22,
      city: "Mumbai",
      avatar: "👩🏽"
    },
    {
      quote: "Finally found my daily ritual that actually works. The mood tracking helped me understand patterns I never noticed before.",
      author: "Arjun",
      age: 24,
      city: "Bangalore",
      avatar: "👨🏽"
    },
    {
      quote: "The community here gets it. Real support, zero judgment. I've grown more in 3 months than in the past 3 years.",
      author: "Kavya",
      age: 21,
      city: "Delhi",
      avatar: "👩🏻"
    }
  ];

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-pale-aqua/30 to-soft-lavender/30">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black text-deep-black mb-8 leading-tight">
            Stories from the
            <span className="gradient-text block">awakened collective.</span>
          </h2>
          <p className="text-2xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Real transformation stories from people just like you, discovering clarity through daily practice.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="premium-card p-8 gentle-shadow hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote */}
              <blockquote className="text-lg italic text-deep-black mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-champagne-gold to-blush-rose rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <cite className="text-deep-black font-semibold not-italic">
                    {testimonial.author}, {testimonial.age}
                  </cite>
                  <p className="text-slate-gray text-sm">{testimonial.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-4xl font-black text-deep-black mb-2">500K+</div>
            <div className="text-slate-gray font-medium">Awakened Minds</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-black text-deep-black mb-2">5M+</div>
            <div className="text-slate-gray font-medium">Truths Shared</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-black text-deep-black mb-2">92%</div>
            <div className="text-slate-gray font-medium">Growth Rate</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl font-black text-deep-black mb-2">150+</div>
            <div className="text-slate-gray font-medium">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
