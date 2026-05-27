"use client";

import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";

interface MDXContentProps {
  code: string;
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMemo(() => {
    // Velite compiles MDX to executable JS; we run it here in the browser
    // eslint-disable-next-line no-new-func
    const fn = new Function(code);
    return fn({ ...runtime }).default as React.ComponentType;
  }, [code]);

  return (
    <div className="prose prose-invert prose-stone max-w-none
      prose-headings:font-light prose-headings:tracking-tight prose-headings:text-[#f0ede8]
      prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
      prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-[#9e9b97] prose-p:leading-relaxed prose-p:text-base
      prose-a:text-[#c8a96e] prose-a:no-underline hover:prose-a:underline
      prose-strong:text-[#f0ede8] prose-strong:font-medium
      prose-ul:text-[#9e9b97] prose-li:marker:text-[#c8a96e]
      prose-hr:border-white/10">
      <Component />
    </div>
  );
}
