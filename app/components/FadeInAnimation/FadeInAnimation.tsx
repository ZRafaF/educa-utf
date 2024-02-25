import Box from '@mui/material/Box';
import { FunctionComponent, ReactNode } from 'react';

interface FadeInAnimationProps {
	children: ReactNode;
	durationMs: number;
}

const FadeInAnimation: FunctionComponent<FadeInAnimationProps> = ({
	children,
	durationMs,
}) => {
	return (
		<Box
			sx={{
				animation: 'fadeinout cubic-bezier(.35,.9,.3,1.13) forwards',
				animationDuration: `${durationMs}ms`,
				'@keyframes fadeinout': {
					'0%': {
						opacity: 0,
						transform: 'scale(0)',
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)',
					},
				},
				'@keyframes fadein': {
					'0%': {
						transform: 'scale(1)',
					},

					'12%': {
						transform: 'scale(0.89)',
					},
					'24%': {
						transform: 'scale(0.56)',
					},

					'36%': {
						transform: 'scale(0.02)',
					},

					'54%': {
						transform: 'scale(0.25)',
					},

					'74%': {
						transform: 'scale(0.02)',
					},

					'82%': {
						transform: 'scale(0.06)',
					},

					'92%': {
						transform: 'scale(0.01)',
					},

					'96%': {
						transform: 'scale(0.02)',
					},

					'100%': {
						transform: 'scale(0)',
					},
				},
			}}
		>
			{children}
		</Box>
	);
};

export default FadeInAnimation;
