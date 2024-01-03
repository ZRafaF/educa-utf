// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const ImgBlock = ({ children, ...rest }: { rest: any; children: any }) => {
	return (
		<img
			{...rest}
			style={{
				maxHeight: 350,
				display: 'block',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
		>
			{children}
		</img>
	);
};

export default ImgBlock;
