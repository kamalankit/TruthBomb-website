import React, { useState, useEffect } from 'react';

const CommunitySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    },
    {
      quote: "The AI insights are incredible. It's like having a personal growth coach that actually understands my journey.",
      author: "Rohan",
      age: 26,
      city: "Pune",
      avatar: "👨🏻"
    },
    {
      quote: "I love how the app makes mindfulness feel modern and accessible. It's not preachy, just genuinely helpful.",
      author: "Ananya",
      age: 23,
      city: "Chennai",
      avatar: "👩🏽"
    },
    {
      quote: "The anonymous sharing feature is brilliant. I can be vulnerable without fear, and the support is amazing.",
      author: "Vikram",
      age: 25,
      city: "Hyderabad",
      avatar: "👨🏽"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="community" className="section-padding bg-gradient-to-br from-pale-aqua/30 to-soft-lavender/30 overflow-hidden">
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

        {/* Testimonials Slider */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="premium-card p-12 text-center gentle-shadow">
                    {/* Quote */}
                    <blockquote className="text-2xl md:text-3xl italic text-deep-black mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Author */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-champagne-gold to-blush-rose rounded-full flex items-center justify-center text-3xl">
                        {testimonial.avatar}
                      </div>
                      <div className="text-left">
                        <cite className="text-deep-black font-semibold not-italic text-lg">
                          {testimonial.author}, {testimonial.age}
                        </cite>
                        <p className="text-slate-gray">{testimonial.city}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-deep-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-champagne-gold scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
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