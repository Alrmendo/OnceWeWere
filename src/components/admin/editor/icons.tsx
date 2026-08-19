function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function BoldIcon() {
  return (
    <IconBase>
      <path d="M4.5 2.5h4a2.5 2.5 0 0 1 0 5h-4z" />
      <path d="M4.5 7.5h4.5a2.5 2.5 0 0 1 0 5h-4.5z" />
    </IconBase>
  );
}

export function ItalicIcon() {
  return (
    <IconBase>
      <path d="M7 2.5h4.5" />
      <path d="M4.5 13.5H9" />
      <path d="M9.5 2.5l-3 11" />
    </IconBase>
  );
}

export function BulletListIcon() {
  return (
    <IconBase>
      <circle cx="2.75" cy="4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="2.75" cy="8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="2.75" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <path d="M6 4h7.5" />
      <path d="M6 8h7.5" />
      <path d="M6 12h7.5" />
    </IconBase>
  );
}

export function OrderedListIcon() {
  return (
    <IconBase>
      <path d="M6 4h7.5" />
      <path d="M6 8h7.5" />
      <path d="M6 12h7.5" />
      <text x="0.5" y="5" fontSize="4.5" fill="currentColor" stroke="none">
        1
      </text>
      <text x="0.5" y="9" fontSize="4.5" fill="currentColor" stroke="none">
        2
      </text>
      <text x="0.5" y="13" fontSize="4.5" fill="currentColor" stroke="none">
        3
      </text>
    </IconBase>
  );
}

export function HeadingIcon() {
  return (
    <IconBase>
      <path d="M3 3v10" />
      <path d="M11 3v10" />
      <path d="M3 8h8" />
      <text x="10.5" y="13.5" fontSize="5.5" fill="currentColor" stroke="none">
        2
      </text>
    </IconBase>
  );
}

export function ImageIcon() {
  return (
    <IconBase>
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <circle cx="5.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <path d="M2.5 11l3.5-3.5 2.5 2.5 2-2 3 3" />
    </IconBase>
  );
}

export function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M3 3l8 8" />
      <path d="M11 3l-8 8" />
    </svg>
  );
}

export function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="editor__spinner"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="28"
        strokeDashoffset="10"
        opacity="0.9"
      />
    </svg>
  );
}
