import "./layout.scss";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/header/Header";

export default function AppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="app-wrapper">
			<Header />
			{children}
			<Footer />
		</div>
	);
}
