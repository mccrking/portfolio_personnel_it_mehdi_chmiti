"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { motion, MotionConfig } from "motion/react";

export function Modal({
  titleId,
  closeLabel,
  onClose,
  children,
  small = false,
}: {
  titleId: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
  small?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${small ? "modal-small" : ""}`}
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="icon-button modal-close"
        onClick={onClose}
        aria-label={closeLabel}
        autoFocus
      >
        <X size={20} />
      </button>
      <MotionConfig reducedMotion="user">
        <motion.div
          initial={{ y: 8 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </MotionConfig>
    </dialog>
  );
}
