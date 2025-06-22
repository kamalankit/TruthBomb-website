
import React from 'react';
import { Download, Smartphone } from 'lucide-react';

const FinalCTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-soft-lavender/40 to-pale-aqua/40">
      <div className="container-width">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="animate-fade-in mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-deep-black mb-8 leading-tight">
              Your transformation
              <span className="gradient-text block">starts here.</span>
            </h2>
            
            <p className="text-2xl text-slate-gray mb-12 leading-relaxed">
              Don't just exist. Awaken. Grow. Transcend.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button className="cta-button flex items-center space-x-3 text-xl px-12 py-5">
                <Download className="w-6 h-6" />
                <span>Download for iOS</span>
              </button>
              
              <button className="outline-button flex items-center space-x-3 text-xl px-12 py-5">
                <Smartphone className="w-6 h-6" />
                <span>Download for Android</span>
              </button>
            </div>

            {/* QR Code */}
            <div className="premium-card p-8 inline-block gentle-shadow">
              <p className="text-slate-gray mb-4 font-medium">Scan to download</p>
              <div className="w-32 h-32 bg-gradient-to-br from-champagne-gold/20 to-blush-rose/20 rounded-2xl flex items-center justify-center mx-auto">
                <div className="text-6xl">📱</div>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-200">
            <div className="text-center animate-fade-in">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-slate-gray font-medium">256-bit Encryption</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl mb-2">🛡️</div>
              <p className="text-sm text-slate-gray font-medium">GDPR Compliant</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl mb-2">🚫</div>
              <p className="text-sm text-slate-gray font-medium">Ad-Free Experience</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl mb-2">💝</div>
              <p className="text-sm text-slate-gray font-medium">Free Forever Plan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
