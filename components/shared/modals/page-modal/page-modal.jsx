import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function PageModal({ children, open, className, ...props }) {
    const root = document?.getElementById('root')?.style
    useEffect(() => {
        root.transform = `scale(${open ? 0.95 : 1})`
        root.borderRadius = open ? '24px' : '0px'
    }, [open])
	return (
		<>
			{createPortal(
				<AnimatePresence initial={false}>
					{open && (
						<motion.div
							{...props}
							key={20}
							initial={{ opacity: 0, scale: 1.1 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							exit={{ opacity: 0, scale: 1.1 }}
							className={cn("w-screen h-screen origin-center top-0 left-0 z-50 absolute bg-background", className)}
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>,
				document.body
			)}
		</>
	);
}
