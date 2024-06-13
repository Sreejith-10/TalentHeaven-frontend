import Nav from "@/components/home/nav";
import Footer from "@/components/home/sections/footer";
import Top from "@/components/ui/top";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full h-auto relative">
			<Nav />
			<div className="pt-[100px]">{children}</div>
			<Top />
			<Footer />
		</main>
	);
}
