
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
    <section id="pricing" className="section-padding bg-soft-white">
      <div className="container-width">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-black text-deep-black mb-8 leading-tight">
            Choose your
            <span className="gradient-text block">growth path.</span>
          </h2>
          <p className="text-2xl text-slate-gray max-w-3xl mx-auto leading-relaxed">
            Start free and upgrade when you're ready to unlock your full potential.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative premium-card p-8 ${plan.bgColor} hover:scale-105 transition-all duration-300 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-deep-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-deep-black mb-2">{plan.name}</h3>
                <p className="text-slate-gray mb-4">{plan.subtitle}</p>
                
                <div className="mb-4">
                  <span className="text-4xl font-black text-deep-black">{plan.price}</span>
                  <span className="text-slate-gray ml-2">/{plan.period}</span>
                </div>

                {plan.originalPrice && (
                  <p className="text-sm text-slate-gray line-through mb-2">{plan.originalPrice}</p>
                )}
                
                {plan.yearlyPrice && (
                  <p className="text-sm text-champagne-gold font-semibold">{plan.yearlyPrice}</p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-champagne-gold flex-shrink-0" />
                    <span className="text-slate-gray">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className={`w-full ${plan.ctaStyle}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-16">
          <p className="text-slate-gray leading-relaxed max-w-2xl mx-auto">
            All plans include a 7-day free trial. No credit card required to start. 
            Cancel anytime with full data export.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
