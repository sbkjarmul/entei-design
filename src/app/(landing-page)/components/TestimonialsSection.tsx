"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import Section from "@/components/Section";
import Heading from "@/components/Heading";
import { cx } from "@/lib/utils";
import { TESTIMONIALS, type Testimonial } from "@/lib/testimonials";

function StarRow({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cx("h-4 w-4", i < rating ? "text-primary" : "text-gray-700")}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.9l-5.81 3.06 1.11-6.47-4.7-4.58 6.5-.95L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ item }: { item: Testimonial }) {
  if (item.avatar) {
    return (
      <Image
        src={item.avatar}
        alt={item.name}
        width={48}
        height={48}
        className="h-12 w-12 rounded-full object-cover"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 bg-gray-900 t-caption text-gray-500"
    >
      {initials(item.name)}
    </div>
  );
}

function TestimonialSlide({ item, locale }: { item: Testimonial; locale: string }) {
  const dateLabel = new Date(item.date).toLocaleDateString(
    locale === "pl" ? "pl-PL" : "en-US",
    { month: "long", year: "numeric" },
  );

  return (
    <figure className="flex w-full shrink-0 snap-center flex-col gap-8 px-1 text-left">
      <StarRow rating={item.rating} />

      <blockquote className="t-h3 text-balance text-white">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <figcaption className="flex items-center gap-4">
        <Avatar item={item} />
        <div className="flex flex-col">
          <span className="t-h6 text-white">{item.name}</span>
          <span className="t-caption text-gray-500">
            {item.company} · {dateLabel}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // Active slide follows the horizontal scroll position of the track.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    setIndex((prev) => (prev === next ? prev : next));
  }, []);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: i * track.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (TESTIMONIALS.length === 0) return null;
  const count = TESTIMONIALS.length;

  return (
    <Section className="items-center px-6 md:px-8" id="testimonials">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 md:gap-16">
        <Heading level={2} className="text-left">
          {t("heading")}
        </Heading>

        <div className="flex flex-col gap-10">
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((item, i) => (
              <TestimonialSlide key={i} item={item} locale={locale} />
            ))}
          </div>

          {count > 1 && (
            <div className="flex gap-2" role="tablist">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={t("goTo", { number: i + 1 })}
                  onClick={() => scrollTo(i)}
                  className={cx(
                    "h-2 rounded-full transition-all duration-200",
                    i === index ? "w-6 bg-primary" : "w-2 bg-gray-700 hover:bg-gray-500",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
