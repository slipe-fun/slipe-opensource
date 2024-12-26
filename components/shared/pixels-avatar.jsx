import { cn, PixelsColors } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

const PixelAvatar = forwardRef(({ size, pixels, username = "", animated = false, className, ...props }, ref) => {
	const Element = animated ? motion.div : "div";

	return (
		<Element
			ref={ref}
			style={{ "--size": `${size}px` }}
			className={cn("overflow-hidden animate-[fadeInOpacity_0.3s_ease-out] w-[--size] rounded-full grid bg-black grid-rows-4 grid-cols-4", className)}
			{...props}
		>
			{pixels?.map((pixel, index) => (
				<span key={index} style={{ background: `${PixelsColors[username[0]]}`, opacity: 0.25 * pixel }} className='w-full aspect-square' />
			))}
		</Element>
	);
});

PixelAvatar.displayName = "PixelAvatar";

export default PixelAvatar;
