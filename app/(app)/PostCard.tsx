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
import ShareButton from "../components/ShareButton/ShareButton";
import CardMedia from "@mui/material/CardMedia/CardMedia";
import Divider from "@mui/material/Divider/Divider";
import Stack from "@mui/material/Stack/Stack";

import contemplativeReptile from "@/resources/contemplative-reptile.jpg";

interface PostCardProps {}

const PostCard: FunctionComponent<PostCardProps> = () => {
	return (
		<Card sx={{ maxWidth: 345 }} variant="outlined">
			<CardActionArea
				LinkComponent={Link}
				href={"/chapter/mqh0krz00lk7b2i"}
			>
				<CardMedia
					component="img"
					height="140"
					image={contemplativeReptile.src}
					alt="green iguana"
				/>
				<CardContent sx={{ pb: 0, pt: 1 }}>
					<Stack direction="row" justifyContent="space-between">
						<Typography sx={{ fontSize: 14 }}>
							10 de agosto de 2023
						</Typography>
						<Link href={"/login"}>
							<Typography sx={{ fontSize: 14 }}>
								Marcos Lima
							</Typography>
						</Link>
					</Stack>
				</CardContent>
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
