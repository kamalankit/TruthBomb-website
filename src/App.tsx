import React, { Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load components for better performance
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Enhanced QueryClient configuration for mobile
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Reduce retries on mobile to save bandwidth
        const isMobile = window.innerWidth <= 1024;
        const maxRetries = isMobile ? 1 : 3;
        return failureCount < maxRetries;
      },
      refetchOnWindowFocus: false, // Disable on mobile for better UX
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1, // Single retry for mutations
    },
  },
});

// Loading component with mobile optimization
const LoadingFallback = () => (
  <div className="min-h-screen bg-soft-white flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="loading-shimmer w-16 h-16 mx-auto rounded-lg bg-gray-200"></div>
      <p className="text-slate-gray text-sm animate-pulse">Loading Truth Bomb...</p>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Truth Bomb App Error:', error, errorInfo);
    
    // Optional: Report to error tracking service
    // reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-soft-white flex items-center justify-center px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="text-2xl font-bold text-deep-black mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-slate-gray mb-6">
              Truth Bomb encountered an unexpected error. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="cta-button"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  useEffect(() => {
    // Enhanced mobile viewport setup
    const setupMobileViewport = () => {
      // Set viewport meta tag for better mobile experience
      let viewport = document.querySelector('meta[name=viewport]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover'
      );

      // Add mobile-specific meta tags
      const addMetaTag = (name: string, content: string) => {
        if (!document.querySelector(`meta[name="${name}"]`)) {
          const meta = document.createElement('meta');
          meta.setAttribute('name', name);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      };

      // Apple mobile web app tags
      addMetaTag('apple-mobile-web-app-capable', 'yes');
      addMetaTag('apple-mobile-web-app-status-bar-style', 'default');
      addMetaTag('apple-mobile-web-app-title', 'Truth Bomb');
      
      // Theme color for mobile browsers
      addMetaTag('theme-color', '#FAFAFA');
      addMetaTag('msapplication-navbutton-color', '#FAFAFA');
      addMetaTag('apple-mobile-web-app-status-bar-style', 'light-content');

      // Prevent zoom on input focus (iOS Safari)
      const addInputZoomFix = () => {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          input.addEventListener('focus', () => {
            document.body.style.transform = 'scale(1)';
          }, { passive: true });
        });
      };

      // Apply input zoom fix after a delay
      setTimeout(addInputZoomFix, 1000);
    };

    setupMobileViewport();

    // Performance monitoring
    const logPerformance = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        // Log slow loading (> 3 seconds)
        if (loadTime > 3000) {
          console.warn('Truth Bomb loaded slowly:', loadTime + 'ms');
        }
      }
    };

    // Check performance after load
    if (document.readyState === 'complete') {
      logPerformance();
    } else {
      window.addEventListener('load', logPerformance, { once: true });
    }

    // Handle offline/online status
    const handleOnlineStatus = () => {
      if (!navigator.onLine) {
        // Show offline message
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 left-4 right-4 z-100 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-center text-sm';
        toast.textContent = 'You are currently offline. Some features may be limited.';
        document.body.appendChild(toast);
        
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
        }, 5000);
      }
    };

    window.addEventListener('online', handleOnlineStatus, { passive: true });
    window.addEventListener('offline', handleOnlineStatus, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Toast notifications with mobile optimization */}
          <Toaster 
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: window.innerWidth <= 768 ? '14px' : '16px',
                padding: window.innerWidth <= 768 ? '12px' : '16px',
                maxWidth: window.innerWidth <= 768 ? '90vw' : '400px',
              },
            }}
          />
          <Sonner 
            position={window.innerWidth <= 768 ? "top-center" : "bottom-right"}
            toastOptions={{
              duration: 4000,
              style: {
                fontSize: window.innerWidth <= 768 ? '14px' : '16px',
              },
            }}
          />
          
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;