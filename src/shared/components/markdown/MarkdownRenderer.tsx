import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/shared/utils/cn";

interface MarkdownRendererProps {
  content: string;
  isDark: boolean;
  fontSize: string;
}

export default function MarkdownRenderer({
  content,
  isDark,
  fontSize,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "pt-12 p-6",
        isDark ? "bg-black text-gray-100" : "bg-white text-gray-900"
      )}
      style={{ fontSize }}
    >
      <div
        className={cn(
          "prose max-w-none",
          isDark ? "prose-invert prose-gray" : "prose-gray"
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl! font-bold! mb-4! mt-6! sm:text-3xl! md:text-4xl!">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl! font-semibold! mb-3! mt-5! sm:text-2xl! md:text-3xl!">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg! font-semibold! mb-2! mt-4! sm:text-xl! md:text-2xl!">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4! text-xs! sm:text-sm! md:text-base!">
                {children}
              </p>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              return isInline ? (
                <code
                  className={cn(
                    isDark ? "bg-gray-900!" : "bg-gray-200!",
                    "px-1! py-0.5! rounded! text-xs! sm:text-sm!"
                  )}
                >
                  {children}
                </code>
              ) : (
                <code className={className}>{children}</code>
              );
            },
            pre: ({ children }) => (
              <pre
                className={cn(
                  isDark ? "bg-gray-900!" : "bg-gray-200!",
                  "p-4! rounded-lg! my-4! overflow-x-auto! text-xs! sm:text-sm!"
                )}
              >
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600! hover:text-blue-800! dark:text-blue-400! dark:hover:text-blue-300! underline!"
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="list-disc! list-inside! mb-4! space-y-1!">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal! list-inside! mb-4! space-y-1!">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-xs! sm:text-sm! md:text-base! mb-1!">
                {children}
              </li>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
