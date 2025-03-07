import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { forwardRef, useState } from "react";
import Svg from "./icons/svg";
import icons from "./icons/icons";

const Img = forwardRef(({ className, src, alt, placeholderClassName, wrapperClassName, iconClassName, wrapper = true, ...props }, ref) => {
	const [loaded, setLoaded] = useState(false);

	const content = (
		<>
			<motion.img
				onLoad={() => setLoaded(true)}
				ref={ref}
				src={src}
				loading='lazy'
				alt={alt}
				className={cn(className, "transition-opacity duration-200 ease-out w-full h-full", loaded ? "opacity-100" : "opacity-0")}
				{...props}
			/>
			<AnimatePresence>
				{!loaded && (
					<motion.div
						key='placeholder'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className={cn("bg-loading absolute inset-0 flex w-full h-full justify-center items-center", placeholderClassName)}
					>
						<Svg icon={icons["slipe"]} className={cn("!w-16 opacity-25 !h-16 ease-out animate-pulse", iconClassName)} />
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);

	return wrapper ? <div className={cn("relative overflow-hidden", wrapperClassName)}>{content}</div> : content;
});

export default Img;
