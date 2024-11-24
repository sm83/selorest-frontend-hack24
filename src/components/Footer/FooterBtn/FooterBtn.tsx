import { useRouter } from "next/navigation";
import "./FooterBtn.scss";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";

const FooterBtn = ({
	href,
	activeLink,
	setActiveLink,
	text,
	children,
}: {
	href: string;
	activeLink: string;
	setActiveLink: Dispatch<SetStateAction<string>>;
	text: string;
	children: React.ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => {
	const router = useRouter();

	const isActive = activeLink === href;

	return (
		<button
			className={clsx("footer-btn", isActive && "footer-btn_active")}
			onClick={() => {
				setActiveLink(href);
				router.push(href);
			}}
		>
			{children}
			<span className={clsx("button-span", isActive && "button-span_active")}>
				{text}
			</span>
		</button>
	);
};

export default FooterBtn;
