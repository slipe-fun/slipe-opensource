import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";

export function RootEffect({element}) {
	const root = document?.getElementById(element ? element : "root")?.style;

	useEffect(() => {
		if (root) {
			root.transform = `scale(0.95)`;
			root.borderRadius = "24px";
		}
		return () => {
			if (root) {
				root.transform = `scale(1)`;
				root.borderRadius = "0px";
			}
		};
	}, [root]);

	return <></>;
}

const PageModal = forwardRef(({ children, open, className, element, ...props }, ref) => {
	return (
		<>
			{createPortal(
				<AnimatePresence initial={false}>
					{open && (
						<motion.div
							key={20}
							ref={ref}
							initial={{ opacity: 0, scale: 1.1 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							exit={{ opacity: 0, scale: 1.1 }}
							className={cn("w-screen h-screen origin-center top-0 left-0 z-50 absolute bg-background", className)}
							{...props}
						>
							{children}
						</motion.div>
					)}
				</AnimatePresence>,
				document.body
			)}
			{open ? <RootEffect element={element}/> : null}
		</>
	);
});

PageModal.displayName = "PageModal";
export default PageModal;
