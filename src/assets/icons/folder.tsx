import type { IconProp } from "./iconProp";

export const Folder = ({ className, style }: IconProp) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='-0.5 -0.5 16 16'
      strokeLinecap='round'
      strokeLinejoin='round'
      stroke='#000000'
      id='Folder-Two--Streamline-Mynaui'
      className={className}
      {...(style && { style: style })}
    >
      <desc>{"Folder Two Streamline Icon: https://streamlinehq.com"}</desc>
      <path
        d='M12.7769375 3.73075H7.2444375C6.8774375 3.7306250000000003 6.523124999999999 3.5965625 6.2478750000000005 3.353875L4.535125 1.8461250000000002M12.7769375 3.73075C13.609562500000001 3.7308125 14.284625 4.4058125 14.284625 5.238437500000001V12.023062499999998C14.284625 12.855749999999999 13.609625000000001 13.530750000000001 12.7769375 13.530750000000001H2.2230625C1.3903750000000001 13.530750000000001 0.7153750000000001 12.855749999999999 0.7153750000000001 12.023062499999998V2.9769375C0.7153750000000001 2.1441875 1.3903750000000001 1.4691874999999999 2.2230625 1.46925H3.5385625C3.9055625 1.4693749999999999 4.259875 1.603375 4.535125 1.8461250000000002M12.7769375 3.73075C12.7769375 2.6899374999999996 11.933125 1.8461875 10.892312500000001 1.8461875H4.534375'
        strokeWidth={1}
      />
    </svg>
  );
};