import Container from "@mui/material/Container/Container";
import BestPosts from "./BestPosts";
import { Suspense } from "react";
import { Box } from "@mui/material";

export default function Home() {
	return (
		<Container>
			<Suspense fallback={<Box>Loading...</Box>}>
				<BestPosts />
			</Suspense>
		</Container>
	);
}
