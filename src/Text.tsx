import React from 'react';

type Variant = 'body1' | 'body2' | 'h1' | 'h2' | 'h3';

interface Props {
  children: string | number;
  variant?: Variant;
  style?: React.CSSProperties;
}

const VARIANT_STYLES = {
  body1: {
    fontSize: '12px',
  },
  body2: {
    fontSize: '11px',
  },
  h1: {
    fontSize: '24px',
    fontWeight: 700,
  },
  h2: {
    fontSize: '20px',
    fontWeight: 700,
  },
  h3: {
    fontSize: '18px',
    fontWeight: 600,
  },
};

const Text: React.FC<Props> = ({
  children,
  variant = 'body1',
  style = {}
}) => {
  const variantStyles = VARIANT_STYLES[variant];

  return (
    <p style={{ ...variantStyles, margin: 0, ...style }}>
      {children}
    </p>
  )
};

export default Text;
