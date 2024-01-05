// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box';
import Image from 'next/image';

const ImgBlock = ({
	children,
	alt,
	src,
	title,
	className,
}: {
	alt: string;
	src: string;
	title?: string;
	className?: string;
	children: any;
}) => {
	return (
		<Box
			style={{
				height: 350,
				position: 'relative',
			}}
		>
			<Image
				src={src}
				style={{
					objectFit: 'contain',
				}}
				fill
				alt={alt}
			>
				{children}
			</Image>
		</Box>
	);
};

// const ImgBlock = ({ children, ...rest }: { rest: any; children: any }) => {
// 	return (
// 		<img
// 			{...rest}
// 			style={{
// 				maxHeight: 350,
// 				display: 'block',
// 				marginLeft: 'auto',
// 				marginRight: 'auto',
// 			}}
// 		>
// 			{children}
// 		</img>
// 	);
// };

export default ImgBlock;
