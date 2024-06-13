import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import {Provider} from "@/providers/query-provider";
import {AuthProvider} from "@/providers/auth-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "Talent Heaven",
	description: "Where skills meet opportunity",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider>
					<AuthProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange>
							{children}
							<Toaster />
						</ThemeProvider>
					</AuthProvider>
				</Provider>
			</body>
		</html>
	);
}
