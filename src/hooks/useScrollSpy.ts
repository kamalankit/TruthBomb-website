import { useEffect, useState } from 'react';

interface ScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
  rootMargin?: string;
}

export const useScrollSpy = ({ sectionIds, offset = -100, rootMargin = '0px 0px -50% 0px' }: ScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeSection;
};

export default useScrollSpy;