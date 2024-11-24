const NewspaperOutline = ({ color = "#DEDEDE" }: { color?: string }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17.25 19.4934V3.375C17.2491 3.0769 17.1303 2.79125 16.9195 2.58046C16.7087 2.36967 16.4231 2.25087 16.125 2.25H3.375C3.0769 2.25087 2.79125 2.36967 2.58046 2.58046C2.36967 2.79125 2.25087 3.0769 2.25 3.375V19.875C2.25148 20.3718 2.4495 20.8479 2.80081 21.1992C3.15212 21.5505 3.62818 21.7485 4.125 21.75H19.5"
				stroke={color}
				strokeWidth="2"
				strokeLinejoin="round"
			/>
			<path
				d="M19.5 21.75C18.9033 21.75 18.331 21.5129 17.909 21.091C17.4871 20.669 17.25 20.0967 17.25 19.5V6H20.625C20.9234 6 21.2095 6.11853 21.4205 6.3295C21.6315 6.54048 21.75 6.82663 21.75 7.125V19.5C21.75 20.0967 21.5129 20.669 21.091 21.091C20.669 21.5129 20.0967 21.75 19.5 21.75Z"
				stroke={color}
				strokeWidth="2"
				strokeLinejoin="round"
			/>
			<path
				d="M11.25 6H14.25M11.25 9H14.25M5.25 12H14.25M5.25 15H14.25M5.25 18H14.25"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M8 6.25V8.75H5.5V6.25H8Z" stroke={color} strokeWidth="2" />
		</svg>
	);
};

export default NewspaperOutline;
