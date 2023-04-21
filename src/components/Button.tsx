import { classNames } from "../utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      className={classNames(
        "px-4 py-2 rounded-lg w-28",
        className ?? ""
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
