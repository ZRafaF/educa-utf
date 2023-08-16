import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import PostCard from "./PostCard";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function Home() {
	return (
		<Container>
			<Grid container spacing={2} sx={{ m: 2 }}>
				<Grid xs="auto">
					<PostCard />
				</Grid>
				<Grid xs="auto">
					<PostCard />
				</Grid>
				<Grid xs="auto">
					<PostCard />
				</Grid>
				<Grid xs="auto">
					<PostCard />
				</Grid>
				<Grid xs="auto">
					<PostCard />
				</Grid>
				<Grid xs="auto">
					<PostCard />
				</Grid>
			</Grid>
		</Container>
	);
}
