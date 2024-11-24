import type { Metadata } from "next";
import "@/globals.scss";
import StoreProvider from "./providers";
import { AuthProvider } from "@/hooks";

export const metadata: Metadata = {
	title: {
		absolute: process.env.SITE_NAME, // Устанавливает абсолютное название сайта
		template: `%s | ${process.env.SITE_NAME}`, // Использует шаблон с %s для динамических страниц
	},
	description: process.env.SITE_DESCRIPTION, // Описание сайта или страницы
	metadataBase: new URL(process.env.APP_URL), // Базовый URL для относительных ссылок
	openGraph: {
		type: "website", // Тип Open Graph
		siteName: process.env.SITE_NAME, // Название сайта для Open Graph
		url: process.env.APP_URL, // URL страницы для Open Graph
		images: [
			{
				url: `${process.env.APP_URL}/vercel.svg`, // Изображение для Open Graph
				width: 1200,
				height: 630,
				alt: "Описание изображения",
			},
		],
	},
	twitter: {
		card: "summary_large_image", // Карта Twitter с большим изображением
		site: "@your_twitter", // Твиттер-аккаунт сайта
		creator: "@creator_twitter", // Твиттер-аккаунт автора
	},
	robots: {
		index: true, // Страница может быть проиндексирована
		follow: true, // Ссылки на странице могут быть проиндексированы
	},
	icons: [
		{
			rel: "icon", // Тип иконки
			url: "/vercel.svg", // Путь к иконке
			sizes: "any",
		},
	],
	appleWebApp: {
		capable: true, // Поддержка Apple Web App
		title: process.env.SITE_NAME, // Название приложения
		statusBarStyle: "black-translucent", // Стиль строки состояния на iOS
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head></head>
			<body>
				<AuthProvider>
					<StoreProvider>{children}</StoreProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
