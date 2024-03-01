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
				animation: 'fadeinout',
				animationTimingFunction: 'cubic-bezier(.35,.9,.3,1.13)',

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
				overflow: 'visible',
			}}
		>
			{children}
		</Box>
	);
};

export default FadeInAnimation;
