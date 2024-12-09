import type { SVGProps, SVGSVGElement } from 'react';

export const SlackIcon = ({
    height = "1em",
    fill = "currentColor",
    focusable = "false",
    ...props
  }: Omit<SVGProps<SVGSVGElement>, "children">) => (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      height={height}
      focusable={focusable}
      {...props}
    >
      <g fill={fill}>
        <path
          d="M224 152a24 24 0 0 1-24 24h-48a24 24 0 0 1 24 24a24 24 0 0 1-24 24a24 24 0 0 1-24-24v-24h24a24 24 0 0 1-24-24v-24h72a24 24 0 0 1 24 24M104 80h24V56a24 24 0 0 0-24-24a24 24 0 0 0-24 24a24 24 0 0 0 24 24H56a24 24 0 0 0-24 24a24 24 0 0 0 24 24h72v-24a24 24 0 0 0-24-24"
          opacity=".2"
        />
        <path d="M221.13 128A32 32 0 0 0 184 76.31V56a32 32 0 0 0-56-21.13A32 32 0 0 0 76.31 72H56a32 32 0 0 0-21.13 56A32 32 0 0 0 72 179.69V200a32 32 0 0 0 56 21.13A32 32 0 0 0 179.69 184H200a32 32 0 0 0 21.13-56M200 88a16 16 0 0 1 0 32h-16v-16a16 16 0 0 1 16-16m-48-48a16 16 0 0 1 16 16v48a16 16 0 0 1-16 16h-16V56a16 16 0 0 1 16-16M88 56a16 16 0 0 1 32 0v16h-16a16 16 0 0 1-16-16m-48 48a16 16 0 0 1 16-16h48a16 16 0 0 1 16 16v16H56a16 16 0 0 1-16-16m16 64a16 16 0 0 1 0-32h16v16a16 16 0 0 1-16 16m48 48a16 16 0 0 1-16-16v-48a16 16 0 0 1 16-16h16v64a16 16 0 0 1-16 16m64-16a16 16 0 0 1-32 0v-16h16a16 16 0 0 1 16 16m32-32h-48a16 16 0 0 1-16-16v-16h64a16 16 0 0 1 0 32" />
      </g>
    </svg>
  );
