import { ReactNode } from 'react';
import { motion, TargetAndTransition, VariantLabels } from 'motion/react';

interface MotionBlockProps {
	children: ReactNode;
	whileTap?: VariantLabels | TargetAndTransition | undefined;
	className?: string;
	onClick?: () => void;
}

export default function MotionBlock({
	children,
	whileTap = {
		scale: 0.975,
		transition: { duration: 0.2 },
	},
	className,
	onClick,
	...props
}: MotionBlockProps) {
	return (
		<motion.div initial="rest" whileTap={whileTap} className={className} onClick={onClick} {...props}>
			{children}
		</motion.div>
	);
}
