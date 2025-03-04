"use client";
import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./Carousel.module.scss";
import Image from "next/image";
import CarouselImage from "../../public/images/carousel.avif";

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplay = true;
  const delayMs = 5000;

  const slides = [
    {
      id: 1,
      image: CarouselImage,
      alt: "Slide 1",
    },
    {
      id: 2,
      image: CarouselImage,
      alt: "Slide 2",
    },
    {
      id: 3,
      image: CarouselImage,
      alt: "Slide 3",
    },
  ];

  const autoplayCallback = useCallback(() => {
    if (!emblaApi || !autoplay) return;

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi, autoplay]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    const intervalId = setInterval(autoplayCallback, delayMs);
    return () => {
      clearInterval(intervalId);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, autoplayCallback, onSelect]);

  return (
    <section className="py-6 mb-6 image-container ">
      <div className={styles.carousel}>
        <div className={styles.viewport} ref={emblaRef}>
          <div className={styles.container}>
            {slides.map((slide) => (
              <div className={styles.slide} key={slide.id}>
                <Image
                  src={CarouselImage}
                  alt={slide.alt}
                  width={816}
                  height={432}
                  className={styles.slideImage}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.dotsContainer}>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.activeDot : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
