import type { CodeBlock as CodeBlockType } from "../../../types/blogContent.ts";

export function CodeBlock({ code, language, inline }: CodeBlockType) {
  if (inline) {
    return (
      <code className="bg-dc-100 text-dc-800 px-2 py-px rounded-md font-mono text-[16px] leading-[1.5]">
        {code}
      </code>
    );
  }

  return (
    <pre className="bg-dc-100 text-dc-600 p-4 font-mono text-[16px] rounded-[2px] overflow-x-auto max-w-full my-4 leading-[1.5]">
      <code className="block w-full whitespace-pre">{code}</code>
    </pre>
  );
}

