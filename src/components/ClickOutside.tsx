import { useEffect, useRef } from "react";

type Props = {
  ignoreClick?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ClickOutside({ ignoreClick, onClick, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOnClick = (e: MouseEvent) => {
      if (ignoreClick) return;
      if (ref.current && !ref.current.contains(e.target as Node)) onClick();
    };

    document.addEventListener("mousedown", handleOnClick);
    return () => document.removeEventListener("mousedown", handleOnClick);
  }, [ignoreClick, onClick, ref]);

  return <div ref={ref}>{children}</div>;
}

export default ClickOutside;
