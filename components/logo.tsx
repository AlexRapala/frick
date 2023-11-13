import * as React from "react";
import { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 500 500"
      {...props}
      width="40px"
      height="auto"
      fill="hsl(var(--accent-foreground)"
    >
      <defs>
        <style>{".cls-1{stroke-width:0}"}</style>
      </defs>
      <rect
        width={412.68}
        height={105.09}
        x={43.66}
        y={43.66}
        className="cls-1"
        rx={12.01}
        ry={12.01}
      />
      <rect
        width={147.78}
        height={105.09}
        x={308.56}
        y={197.78}
        className="cls-1"
        rx={12.01}
        ry={12.01}
      />
      <rect
        width={297.06}
        height={105.09}
        x={82.35}
        y={351.9}
        className="cls-1"
        rx={12.01}
        ry={12.01}
      />
    </svg>
  );
};
export default Logo;
