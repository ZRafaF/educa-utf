// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import ShareButton from "../components/ShareButton/ShareButton";

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

interface PostCardProps {}

const PostCard: FunctionComponent<PostCardProps> = () => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Link
						href={"/login"}
						style={{
							textDecoration: "none",
							color: "white",
						}}
					>
						<Avatar
							aria-label="recipe"
							{...stringAvatar("Marcos Lima")}
						/>
					</Link>
				}
				title={<Link href={"/login"}>Marcos Lima</Link>}
				subheader="10 de agosto de 2023"
				action={[
					<IconButton
						aria-label="add to favorites"
						key={"favorite-post"}
					>
						<FavoriteIcon />
					</IconButton>,
					<ShareButton
						key={"share-button"}
						shareData={{
							title: "Educa UTF",
							text: "Dê uma olhada nesse link que eu achei!",
							url: "https://github.com/ZRafaF/educa-utf",
						}}
					/>,
				]}
				sx={{
					pb: 1,
				}}
			/>
			<CardActionArea
				LinkComponent={Link}
				href={"/chapter/mqh0krz00lk7b2i"}
			>
				<CardContent
					sx={{
						pt: 1,
					}}
				>
					<Typography gutterBottom variant="h5" component="div">
						Camada de valência (Capitulo)
					</Typography>
					<Typography variant="body2" color="text.secondary">
						A Camada de Valência é a última camada de distribuição
						eletrônica de um átomo. Por ser a camada mais externa,
						também é a que fica mais distante do núcleo ...
					</Typography>
				</CardContent>
			</CardActionArea>

			<CardActions>
				<Chip label={"Química"} />
				<Chip label={"Modelo atômico"} />
			</CardActions>
		</Card>
	);
};

export default PostCard;
