import Container from "@mui/material/Container";
import PostCard from "./PostCard";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function Home() {
	return (
		<Container>
			<Grid container spacing={2} sx={{ m: 2 }}>
				<Grid xs="auto" key={"post_0"}>
					<PostCard />
				</Grid>
				<Grid xs="auto" key={"post_1"}>
					<PostCard />
				</Grid>
				<Grid xs="auto" key={"post_2"}>
					<PostCard />
				</Grid>
				<Grid xs="auto" key={"post_3"}>
					<PostCard />
				</Grid>
				<Grid xs="auto" key={"post_4"}>
					<PostCard />
				</Grid>
				<Grid xs="auto" key={"post_5"}>
					<PostCard />
				</Grid>
			</Grid>
		</Container>
	);
}
