import Container from "@mui/material/Container/Container";
import BestPosts from "./BestPosts";
import { Suspense } from "react";
import Box from "@mui/material/Box/Box";
import BannerSomethingNew from "@/components/BannerSomethingNew/BannerSomethingNew";

export default function Home() {
	return (
		<Container
			sx={{
				bgcolor: "white",
				minHeight: "100vh",
				boxShadow: 1,
			}}
		>
			<BannerSomethingNew />
			<Suspense fallback={<Box>Loading...</Box>}>
				<BestPosts />
			</Suspense>
		</Container>
	);
}
