import type { IconProp } from "./iconProp";

export const Trash = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 14 14'
      id='Recycle-Bin-2--Streamline-Core'
      className={`${className}`}
      {...(style && { style: style })}
    >
      <desc>{"Recycle Bin 2 Streamline Icon: https://streamlinehq.com"}</desc>
      <g id='recycle-bin-2--remove-delete-empty-bin-trash-garbage'>
        <path
          id='Vector'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M1 3.5h12'
          strokeWidth={1}
        />
        <path
          id='Vector_2'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M2.5 3.5h9v9c0 0.2652 -0.1054 0.5196 -0.2929 0.7071s-0.4419 0.2929 -0.7071 0.2929h-7c-0.26522 0 -0.51957 -0.1054 -0.70711 -0.2929C2.60536 13.0196 2.5 12.7652 2.5 12.5v-9Z'
          strokeWidth={1}
        />
        <path
          id='Vector_3'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M4.5 3.5V3c0 -0.66304 0.26339 -1.29893 0.73223 -1.76777C5.70107 0.763392 6.33696 0.5 7 0.5c0.66304 0 1.29893 0.263392 1.76777 0.73223C9.23661 1.70107 9.5 2.33696 9.5 3v0.5'
          strokeWidth={1}
        />
        <path
          id='Vector_4'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5.5 6.50146V10.503'
          strokeWidth={1}
        />
        <path
          id='Vector_5'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8.5 6.50146V10.503'
          strokeWidth={1}
        />
      </g>
    </svg>
  );
};