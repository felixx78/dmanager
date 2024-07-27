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
      console.log(e.target);
      if (ref.current && !ref.current.contains(e.target as Node)) onClick();
    };

    document.addEventListener("click", handleOnClick);
    return () => document.removeEventListener("click", handleOnClick);
  }, [ignoreClick, onClick, ref]);

  return <div>{children}</div>;
}

export default ClickOutside;
