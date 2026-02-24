interface SectionLabelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function SectionLabel({ children, style }: SectionLabelProps) {
  return (
    <p className="label" style={style}>
      {children}
    </p>
  );
}
