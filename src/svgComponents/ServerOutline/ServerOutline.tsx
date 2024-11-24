const ServerOutline = ({ color = "#DEDEDE" }: { color?: string }) => {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 9.75C16.9706 9.75 21 8.07107 21 6C21 3.92893 16.9706 2.25 12 2.25C7.02944 2.25 3 3.92893 3 6C3 8.07107 7.02944 9.75 12 9.75Z"
				stroke={color}
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M21 10.0312C21 12.1022 16.9688 13.7812 12 13.7812C7.03125 13.7812 3 12.1022 3 10.0312M21 14.0625C21 16.1334 16.9688 17.8125 12 17.8125C7.03125 17.8125 3 16.1334 3 14.0625"
				stroke={color}
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
			<path
				d="M3 5.96439V18.0356C3 20.0869 7.03125 21.75 12 21.75C16.9688 21.75 21 20.0869 21 18.0356V5.96439"
				stroke={color}
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default ServerOutline;
