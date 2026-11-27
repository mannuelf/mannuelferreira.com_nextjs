'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './hero-banner.module.css';

export interface HeroBannerSlide {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  slug: string;
}

interface HeroBannerProps {
  slides: HeroBannerSlide[];
}

export function HeroBanner({ slides }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isAutoPlay || prefersReducedMotion) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlay, slides.length, prefersReducedMotion]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  if (!slides.length) return null;

  const slide = slides[currentSlide];

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Featured stories carousel"
      tabIndex={0}
    >
      <div className={styles.slidesContainer}>
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            role="tabpanel"
            aria-hidden={index !== currentSlide}
          >
            <div className={styles.slideContent}>
              <Image
                src={s.coverImage}
                alt={s.title}
                fill
                priority={index === 0}
                className={styles.slideImage}
              />
              <div className={styles.slideOverlay} />
              <div className={styles.slideText}>
                <h2 className={styles.slideTitle}>{s.title}</h2>
                <p className={styles.slideExcerpt}>{s.excerpt}</p>
                <Link href={`/${s.slug}`} className={styles.slideLink}>
                  Read more
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          onClick={prevSlide}
          className={styles.button}
          aria-label="Previous slide"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'page' : undefined}
              type="button"
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className={styles.button}
          aria-label="Next slide"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
