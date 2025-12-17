import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Extract headings from the article
    const article = document.querySelector("article");
    if (!article) return;

    const headingElements = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const tocItems: TocItem[] = [];

    headingElements.forEach((heading) => {
      // Skip the main title
      if (heading.classList.contains("mb-2")) return;

      const id =
        heading.id ||
        heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
        "";

      if (!heading.id) {
        heading.id = id;
      }

      tocItems.push({
        id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1], 10),
      });
    });

    setHeadings(tocItems);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" },
    );

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading);
      });
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop Version - Fixed right side with collapse */}
      <aside
        className={`fixed right-4 top-32 z-40 hidden lg:block transition-all duration-300 ease-in-out ${
          isExpanded ? "w-64" : "w-1"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        aria-label="Table of contents navigation"
      >
        {/* Collapsed state - thin line */}
        <div
          className={`absolute right-0 top-0 h-48 w-1 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-opacity duration-300 cursor-pointer ${
            isExpanded ? "opacity-0" : "opacity-100"
          }`}
          title="Table of Contents"
        />

        {/* Expanded state - full TOC */}
        <nav
          className={`rounded-lg border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-opacity duration-300 dark:border-gray-700 dark:bg-gray-900/95 ${
            isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              📑 Table of Contents
            </h3>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="Close table of contents"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-label="Close icon"
              >
                <title>Close</title>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <ul className="max-h-96 space-y-1.5 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              >
                <button
                  type="button"
                  onClick={() => scrollToHeading(heading.id)}
                  className={`w-full text-left py-1 px-2 rounded transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 ${
                    activeId === heading.id
                      ? "font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Version - Floating button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 shadow-xl text-white hover:scale-110 transition-transform duration-200"
          aria-label="Toggle table of contents"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label="Menu icon"
          >
            <title>Menu</title>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Mobile TOC Panel */}
        {isExpanded && (
          <>
            {/* Backdrop */}
            <button
              type="button"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm border-0 p-0 cursor-default"
              onClick={() => setIsExpanded(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setIsExpanded(false);
              }}
              aria-label="Close table of contents"
            />
            {/* Panel */}
            <nav className="fixed bottom-20 right-4 left-4 max-h-[70vh] rounded-lg border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/95">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                  📑 Table of Contents
                </h3>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close table of contents"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    role="img"
                    aria-label="Close icon"
                  >
                    <title>Close</title>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <ul className="space-y-2 overflow-y-auto text-sm">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        scrollToHeading(heading.id);
                        setIsExpanded(false);
                      }}
                      className={`w-full text-left py-2 px-3 rounded transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 ${
                        activeId === heading.id
                          ? "font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
}
