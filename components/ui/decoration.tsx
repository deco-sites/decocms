interface DecorationProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Decoration({
  size = 32,
  color = "#D0EC1A",
  className = "",
}: DecorationProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="14.8008"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="14.8047"
        y="2.39258"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="21.9883"
        y="2.35889"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="27.2461"
        y="7.61914"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="29.6055"
        y="14.8018"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="27.2148"
        y="14.8018"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="27.25"
        y="21.9863"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="21.9883"
        y="27.2446"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="14.8047"
        y="27.2119"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="14.8047"
        y="29.6055"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="7.61719"
        y="27.2471"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="2.35938"
        y="21.9868"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        y="14.8022"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="2.39453"
        y="14.8037"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="2.36328"
        y="7.61865"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="7.62109"
        y="9.79541"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(1 0 0 -1 7.62109 21.9863)"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(-1 0 0 1 24.3828 9.79639)"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(-1 0 0 1 17.1953 12.4087)"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(-1 0 0 1 17.1953 17.1982)"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(-1 0 0 1 17.1953 14.8032)"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(-1 0 0 1 14.8047 14.8032)"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(-1 0 0 1 19.5938 14.8032)"
        fill={color}
      />
      <rect
        x="24.3828"
        y="21.9868"
        width="2.39469"
        height="2.39461"
        transform="rotate(180 24.3828 21.9868)"
        fill={color}
      />
      <rect
        x="7.62109"
        y="2.35986"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        x="10.0156"
        y="7.40039"
        width="2.39469"
        height="2.39461"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(1 0 0 -1 10.0156 24.3804)"
        fill={color}
      />
      <rect
        width="2.39469"
        height="2.39461"
        transform="matrix(-1 0 0 1 21.9883 7.40137)"
        fill={color}
      />
      <rect
        x="21.9922"
        y="24.3799"
        width="2.39469"
        height="2.39461"
        transform="rotate(180 21.9922 24.3799)"
        fill={color}
      />
    </svg>
  );
}
