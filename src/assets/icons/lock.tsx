import type { IconProp } from "./iconProp";

export const Lock = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='-0.5 -0.5 16 16'
      fill='currentColor'
      id='Lock--Streamline-Phosphor'
      className={` ${className}`}
      {...(style && { style: style })}
    >
      <desc>Lock Streamline Icon: https://streamlinehq.com</desc>
      <path
        d='M12.944443359375 5.050001953125h-2.17777734375V3.416666015625c0 -2.5146796875 -2.72221875 -4.086357421875 -4.900001953125 -2.829017578125 -1.0107070312500002 0.58353515625 -1.633330078125 1.6619531250000001 -1.633330078125 2.829017578125v1.6333359374999998H2.055556640625c-0.60139453125 -0.000029296875 -1.088888671875 0.48748828125000004 -1.088888671875 1.088888671875v7.622220703125c0 0.60139453125 0.487494140625 1.08891796875 1.088888671875 1.088888671875h10.88888671875c0.6013769531250001 0 1.088888671875 -0.48751171875 1.088888671875 -1.088888671875V6.138890625c0 -0.6013593749999999 -0.48752929687499996 -1.088865234375 -1.088888671875 -1.088888671875ZM5.32222265625 3.416666015625c0.0008671875 -1.676455078125 1.816224609375 -2.723296875 3.26764453125 -1.88431640625 0.672908203125 0.38896875 1.087505859375 1.1070761718750002 1.08791015625 1.88431640625v1.6333359374999998H5.32222265625Zm7.622220703125 10.3444453125H2.055556640625V6.138890625h10.88888671875v7.622220703125Zm-4.627775390625 -3.8111132812500004c0 0.628669921875 -0.6805546875 1.0215937499999999 -1.225001953125 0.7072558593749999 -0.54444140625 -0.31433203125000003 -0.54444140625 -1.100173828125 0 -1.414505859375 0.12414843749999999 -0.071677734375 0.264978515625 -0.109412109375 0.40833398437499996 -0.109412109375 0.45103125000000005 0 0.8166679687499999 0.365630859375 0.8166679687499999 0.816662109375Z'
        stroke-width='1'
      ></path>
    </svg>
  );
};