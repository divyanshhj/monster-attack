interface GameButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const GameButton = ({
  onClick,
  disabled,
  children,
  className,
  title,
}: GameButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-4 rounded-xl font-bold shadow-md transition-all active:scale-95 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed ${className}`}
    title={title}
  >
    {children}
  </button>
);

export default GameButton;
