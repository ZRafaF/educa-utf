// Copyright 2023 Rafael Farias
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
"use client";
import { FunctionComponent } from "react";

import Link from "next/link";

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Box,
	Grid,
	Paper,
	Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { toast, ToastContainer } from "react-toastify";
import pb from "@/lib/PocketBase/pocketbase";
import { UsersRecord, UsersResponse } from "@/types/pocketbase-types";

// limitations under the License.
interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
	/*

	const [signInWithEmailAndPassword, userSign, loadingSign, errorSign] =
		useSignInWithEmailAndPassword(auth);

	useRedirectIfAuthenticated();
	*/
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitEmail = data.get("email")?.toString();
		const submitPassword = data.get("password")?.toString();
		const submitRemember = data.get("remember")?.toString();
		if (submitEmail === undefined) {
			toast.error("Invalid email.");
			return;
		}
		if (submitPassword === undefined) {
			toast.error("Invalid password.");
			return;
		}
		console.log(submitEmail);

		if (submitRemember) {
			//setPersistence(auth, browserSessionPersistence);
		}
		// example create data

		pb.collection("users")
			.create({
				email: submitEmail,
				password: submitPassword,
				passwordConfirm: submitPassword,
			})
			.then((record) => {
				// (optional) send an email verification request
				//pb.collection("users").requestVerification(submitEmail);
			});
	};

	return (
		<Grid
			container
			component="main"
			sx={{
				position: "absolute",
				height: "stretch",
			}}
		>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: "url(https://source.unsplash.com/random)",
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) =>
						t.palette.mode === "light"
							? t.palette.grey[50]
							: t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							type="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							inputProps={{
								minlength: 8,
								maxLength: 72,
							}}
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox
									value="remember"
									color="primary"
									name="remember"
									id="remember"
								/>
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Login
						</Button>
						{/*<OcRegisterWithGoogle />*/}
						<Grid container>
							<Grid item xs>
								<Link href="#">Forgot password?</Link>
							</Grid>
							<Grid item>
								<Link href="/register">
									{"Don't have an account? Register!"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
			<ToastContainer />
		</Grid>
	);
};

export default LoginPage;
