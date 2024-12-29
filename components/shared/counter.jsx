import { AnimatePresence, motion } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Counter = forwardRef(({ value, maxValue, className }, ref) => {
	return (
        <div className={cn("text-lg text-foreground/50 flex", className)}>

        
		<AnimatePresence mode="popLayout">
				<motion.span
                    layout="size"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					exit={{ opacity: 0, y: -8 }}
                    className="text-foreground block"
					key={value}
				>
					{value}
				</motion.span>
		</AnimatePresence>{" "}/{" "}<span>{maxValue}</span></div>
	);
});

export default Counter
