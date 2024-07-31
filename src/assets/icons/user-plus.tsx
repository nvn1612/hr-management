import type { IconProp } from "./iconProp";

export const UserPlus = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 14 14'
      id='User-Add-Plus--Streamline-Core'
      className={`${className}`}
      {...(style && { style: style })}
    >
      <desc>{"User Add Plus Streamline Icon: https://streamlinehq.com"}</desc>
      <g id='user-add-plus--actions-add-close-geometric-human-person-plus-single-up-user'>
        <path
          id='Vector'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5 5.5c1.38071 0 2.5 -1.11929 2.5 -2.5S6.38071 0.5 5 0.5 2.5 1.61929 2.5 3 3.61929 5.5 5 5.5Z'
          strokeWidth={1}
        />
        <path
          id='Vector_2'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M6.5 12.5h-6l0 -0.5421c0.007961 -0.7622 0.208977 -1.51 0.58427 -2.17342 0.3753 -0.66346 0.91263 -1.22097 1.5618 -1.62047 0.64918 -0.39949 1.38902 -0.62793 2.15041 -0.66397 0.7614 -0.03605 1.51951 0.12148 2.20352 0.45785'
          strokeWidth={1}
        />
        <path
          id='Vector_3'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M10.5 7.5v6'
          strokeWidth={1}
        />
        <path
          id='Vector_4'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M7.5 10.5h6'
          strokeWidth={1}
        />
      </g>
    </svg>
  );
};