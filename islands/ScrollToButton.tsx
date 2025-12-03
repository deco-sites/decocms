import { JSX } from "preact";

interface Props {
  targetId: string;
  children: JSX.Element;
  class?: string;
}

export default function ScrollToButton(
  { targetId, children, class: className }: Props,
) {
  const handleClick = (e: Event) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <button
      onClick={handleClick}
      class={className}
      type="button"
    >
      {children}
    </button>
  );
}
