import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Counter = forwardRef(({ value, maxValue, className, ...props }, ref) => {
	return (
		<div className={cn("text-lg text-foreground/50 items-center flex", className)} {...props}>
			<AnimatePresence mode='popLayout'>
				<motion.span
					layout
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					exit={{ opacity: 0, y: -6 }}
					className='text-foreground block'
					key={value}
				>
					{value}
				</motion.span>
				<motion.span transition={{ duration: 0.1, ease: "easeOut" }} layout>
					/{maxValue}
				</motion.span>
			</AnimatePresence>
		</div>
	);
});

export default Counter;
