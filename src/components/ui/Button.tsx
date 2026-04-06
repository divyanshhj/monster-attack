interface GameButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}
export const GameButton = ({
  onClick,
  disabled,
  children,
  className,
}: GameButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-4 rounded-xl font-bold shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);
