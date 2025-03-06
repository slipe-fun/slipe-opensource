import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Counter = forwardRef(({ value, maxValue, className, ...props }, ref) => {
	  
	return (
		<div className={cn("text-lg text-foreground/50 items-center flex", className)} {...props}>
			<AnimatePresence mode='popLayout'>
				<motion.span
					layout
					initial={{ opacity: 0, y: 8, scale: 0.7 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.3, type: "spring" }}
					exit={{ opacity: 0, y: -8, scale: 0.7 }}
					className='text-foreground origin-center block'
					key={value}
				>
					{value}
				</motion.span>
				<motion.span transition={{ duration: 0.2, type: "spring" }} layout>
					/{maxValue}
				</motion.span>
			</AnimatePresence>
		</div>
	);
});

export default Counter;
