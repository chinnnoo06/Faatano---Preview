import { forwardRef } from "react";

type HamburgerButtonProps = {
  isOpen: boolean;
  openModal: () => void
  closeModal: () => void
  
};

export const HamburgerButton = forwardRef<HTMLButtonElement, HamburgerButtonProps>(({ isOpen, openModal, closeModal }, ref) => {
  return (
    <button
      ref={ref}
      onClick={() => {isOpen ? closeModal() : openModal()}}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      className={`relative flex h-9 w-9 items-center justify-center rounded-xl border
                  cursor-pointer transition-colors duration-300 active:scale-95
                  ${isOpen
          ? "border-beige/45 bg-beige/10 text-cream"
          : "border-beige/25 text-beige hover:border-beige/45 hover:bg-beige/5 hover:text-cream"
        }`}
    >
      <span
        className={`absolute h-[1.5px] w-4 rounded-sm bg-current
                    transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]
                    ${isOpen ? "translate-y-0 rotate-45" : "-translate-y-0.75"}`}
      />
      <span
        className={`absolute h-[1.5px] w-4 rounded-sm bg-current
                    transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]
                    ${isOpen ? "translate-y-0 -rotate-45" : "translate-y-0.75"}`}
      />
    </button>
  );
});

HamburgerButton.displayName = "HamburgerButton";
