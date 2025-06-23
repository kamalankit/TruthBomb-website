import React from 'react';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      subtitle: "Start your journey",
      price: "₹0",
      period: "forever",
      bgColor: "bg-soft-lavender/50",
      features: [
        "Daily truth bombs",
        "Basic mood tracking",
        "Community access",
        "3 active goals",
        "Weekly insights"
      ],
      cta: "Start Journey",
      ctaStyle: "outline-button"
    },
    {
      name: "Premium",
      subtitle: "Most popular",
      price: "₹199",
      period: "per month",
      originalPrice: "₹299",
      yearlyPrice: "₹1,999/year (Save 17%)",
      bgColor: "bg-gradient-to-br from-champagne-gold/30 to-blush-rose/30",
      features: [
        "Everything in Free",
        "AI-powered insights",
        "Advanced analytics",
        "Premium themes",
        "Data export",
        "Exclusive content",
        "Voice journaling",
        "Widget support"
      ],
      cta: "Start Free Trial",
      ctaStyle: "cta-button",
      popular: true
    },
    {
      name: "Lifetime",
      subtitle: "One-time payment",
      price: "₹4,999",
      period: "forever",
      bgColor: "bg-pale-aqua/50",
      features: [
        "Everything in Premium",
        "Lifetime updates",
        "Priority support",
        "Early access features",
        "No monthly fees ever"
      ],
      cta: "Get Lifetime",
      ctaStyle: "outline-button"
    }
  ];

  return (
    <section 
      id="pricing" 
      className="section-padding bg-soft-white relative z-10"
      style={{ 
        isolation: 'isolate',
        opacity: 1,
        visibility: 'visible'
      }}
    >
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-deep-black mb-4 md:mb-8 leading-tight">
            Choose your
            <span className="gradient-text block text-champagne-gold md:bg-gradient-to-r md:from-champagne-gold md:to-blush-rose md:bg-clip-text md:text-transparent">
              growth path.
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-gray max-w-3xl mx-auto leading-relaxed px-4">
            Start free and upgrade when you're ready to unlock your full potential.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative premium-card p-6 md:p-8 ${plan.bgColor} hover:scale-105 transition-all duration-300`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                opacity: 1,
                visibility: 'visible',
                zIndex: 15,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
                  <div 
                    className="bg-deep-black text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold"
                    style={{ zIndex: 20 }}
                  >
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 md:mb-8">
                <h3 
                  className="text-xl md:text-2xl font-bold text-deep-black mb-2"
                  style={{ color: '#0A0A0A', opacity: 1, visibility: 'visible' }}
                >
                  {plan.name}
                </h3>
                <p 
                  className="text-slate-gray mb-4"
                  style={{ color: '#64748B', opacity: 1, visibility: 'visible' }}
                >
                  {plan.subtitle}
                </p>
                
                <div className="mb-4">
                  <span 
                    className="text-3xl md:text-4xl font-black text-deep-black"
                    style={{ color: '#0A0A0A', opacity: 1, visibility: 'visible' }}
                  >
                    {plan.price}
                  </span>
                  <span 
                    className="text-slate-gray ml-2"
                    style={{ color: '#64748B', opacity: 1, visibility: 'visible' }}
                  >
                    /{plan.period}
                  </span>
                </div>

                {plan.originalPrice && (
                  <p 
                    className="text-sm text-slate-gray line-through mb-2"
                    style={{ color: '#64748B', opacity: 1, visibility: 'visible' }}
                  >
                    {plan.originalPrice}
                  </p>
                )}
                
                {plan.yearlyPrice && (
                  <p 
                    className="text-sm text-champagne-gold font-semibold"
                    style={{ color: '#D5AE70', opacity: 1, visibility: 'visible' }}
                  >
                    {plan.yearlyPrice}
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check 
                      className="w-4 h-4 md:w-5 md:h-5 text-champagne-gold flex-shrink-0" 
                      style={{ color: '#D5AE70' }}
                    />
                    <span 
                      className="text-slate-gray text-sm md:text-base"
                      style={{ color: '#64748B', opacity: 1, visibility: 'visible' }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button 
                className={`w-full ${plan.ctaStyle} text-sm md:text-base py-3 md:py-4 px-4 md:px-6 rounded-xl font-semibold transition-all duration-300`}
                style={{ 
                  opacity: 1, 
                  visibility: 'visible', 
                  pointerEvents: 'auto',
                  backgroundColor: plan.ctaStyle === 'cta-button' ? '#D5AE70' : 'transparent',
                  background: plan.ctaStyle === 'cta-button' ? 'linear-gradient(135deg, #D5AE70, #E87995)' : 'transparent',
                  color: plan.ctaStyle === 'cta-button' ? 'white' : '#0A0A0A',
                  border: plan.ctaStyle === 'outline-button' ? '2px solid #0A0A0A' : 'none',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12 md:mt-16">
          <p 
            className="text-slate-gray leading-relaxed max-w-2xl mx-auto px-4 text-sm md:text-base"
            style={{ color: '#64748B', opacity: 1, visibility: 'visible' }}
          >
            All plans include a 7-day free trial. No credit card required to start. 
            Cancel anytime with full data export.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;