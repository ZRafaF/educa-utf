// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

import Card from "@mui/material/Card/Card";
import CardActionArea from "@mui/material/CardActionArea/CardActionArea";
import CardActions from "@mui/material/CardActions/CardActions";
import CardContent from "@mui/material/CardContent/CardContent";
import Chip from "@mui/material/Chip/Chip";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import Divider from "@mui/material/Divider/Divider";
import Stack from "@mui/material/Stack/Stack";
import contemplativeReptile from "@/resources/contemplative-reptile.jpg";
import ShareButton from "../ShareButton/ShareButton";
import { PostsResponse } from "@/types/pocketbase-types";

interface PostCardProps {
	imgSrc?: string;
	isExpanded?: boolean;
	myPost: PostsResponse;
}

const PostCard: FunctionComponent<PostCardProps> = ({
	imgSrc = contemplativeReptile.src,
	isExpanded = true,
	myPost,
}) => {
	console.log(myPost);
	return (
		<Card sx={{ maxWidth: 345 }} variant="outlined">
			<CardActionArea
				LinkComponent={Link}
				href={`/chapter/mqh0krz00lk7b2i/post/${myPost.id}`}
			>
				<CardMedia
					component="img"
					height="140"
					image={imgSrc}
					alt="green iguana"
				/>
				<CardContent sx={{ pb: 0, pt: 1 }}>
					<Stack direction="row" justifyContent="space-between">
						<Typography sx={{ fontSize: 14 }}>
							10 de agosto de 2023
						</Typography>
					</Stack>
				</CardContent>
				<CardContent
					sx={{
						pt: 1,
					}}
				>
					<Typography gutterBottom variant="h5" component="div">
						{myPost.title}
					</Typography>

					<Typography variant="body2" color="text.secondary">
						{myPost.description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<Link href={"/login"}>
				<Typography sx={{ fontSize: 14 }}>Marcos Lima</Typography>
			</Link>
			<Divider />
			<CardActions>
				<Stack
					sx={{
						width: "100%",
					}}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						flexWrap="wrap"
					>
						<Stack direction="row">
							<Chip label={"Química"} />
							<Chip label={"Modelo atômico"} />
						</Stack>
						<Stack direction="row">
							<IconButton
								aria-label="add to favorites"
								key={"favorite-post"}
							>
								<FavoriteIcon />
							</IconButton>

							<ShareButton
								key={"share-button"}
								shareData={{
									title: "Educa UTF",
									text: "Dê uma olhada nesse link que eu achei!",
									url: "https://github.com/ZRafaF/educa-utf",
								}}
							/>
						</Stack>
					</Stack>
				</Stack>
			</CardActions>
		</Card>
	);
};

export default PostCard;
