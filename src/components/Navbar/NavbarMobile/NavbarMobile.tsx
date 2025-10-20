import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface MobileAccordionItemProps {
  title: string;
  sections?: Array<{
    header?: string;
    links: Array<{ label: string; to: string }>;
  }>;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export default function NavbarMobile({
  title,
  sections = [],
  isOpen,
  onToggle,
  onNavigate,
}: MobileAccordionItemProps) {
  return (
    <li className="border-b">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3"
      >
        <span className="text-[15px] font-bold tracking-wide">{title}</span>
        <ChevronRight
          className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
          isOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        } overflow-y-auto pr-1 overscroll-contain touch-pan-y`}
      >
        {sections.map((section, idx) => (
          <div key={idx} className={`py-2 ${idx > 0 ? 'border-t' : ''}`}>
            {section.header && (
              <div className="text-xs font-semibold text-gray-500 mb-2">
                {section.header}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {section.links.map((l, i) => (
                <Link
                  key={i}
                  to={l.to}
                  onClick={onNavigate}
                  className="text-[14px]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </li>
  );
}