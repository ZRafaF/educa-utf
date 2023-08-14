import {
	Avatar,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	Chip,
	Container,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";

function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

function stringAvatar(name: string) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

export default function Home() {
	return (
		<Container>
			<Stack>
				<Card sx={{ maxWidth: 345 }}>
					<CardHeader
						avatar={
							<Link href={"/login"}>
								<Avatar
									aria-label="recipe"
									{...stringAvatar("Joãozinho Lima")}
								/>
							</Link>
						}
						title={<Link href={"/login"}>Joãozinho Lima</Link>}
						subheader="14 de setembro de 2016"
						action={[
							<IconButton aria-label="add to favorites">
								<FavoriteIcon />
							</IconButton>,
							<IconButton aria-label="share">
								<ShareIcon />
							</IconButton>,
						]}
						sx={{
							pb: 1,
						}}
					/>
					<CardActionArea>
						<CardContent
							sx={{
								pt: 1,
							}}
						>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								Lizard
							</Typography>
							<Typography variant="body2" color="text.secondary">
								Lizards are a widespread group of squamate
								reptiles, with over 6,000 species, ranging
								across all continents except Antarctica
							</Typography>
						</CardContent>
					</CardActionArea>

					<CardActions>
						<Chip label={"calculus"} />
						<Chip label={"calculus"} />
					</CardActions>
				</Card>
			</Stack>
		</Container>
	);
}
