"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { cx } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Accessible accordion: one answer open at a time, height animates open/closed. */
export default function FaqList({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <ul className="flex w-full flex-col gap-4">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;

        return (
          <li key={item.id}>
            <h3 className="t-lead">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full cursor-pointer items-start justify-between gap-4 text-left text-ink hover:text-black focus-visible:outline-none focus-visible:underline"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className={cx(
                    "shrink-0 transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.4, ease: EASE }
                  }
                >
                  <p className="t-body max-w-2xl pt-4 pb-2 font-medium text-gray-800">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
