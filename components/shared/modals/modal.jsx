import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { useClickAway } from "react-use";

export default function Modal({ children, open, className, setOpen, ...props }) {
	const modalRef = useRef(null);

	useClickAway(modalRef, () => {
		if (open) setOpen(false);
	});

	return createPortal(
		<AnimatePresence mode="wait" initial={false}>
			{open && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						key="modal-backdrop"
						exit={{ opacity: 0 }}
						transition={{ duration: 0.45, type: "spring" }}
						className='fixed inset-0 z-50 bg-black/40'
					/>
					<motion.div
						initial={{ opacity: 0, y: -15 }}
						animate={{opacity: 1, y: 0 }}
						key="modal"
						exit={{opacity: 0, y: 15 }}
						transition={{ duration: 0.45, type: "spring" }}
						className='fixed inset-0 z-[60] flex justify-center items-center'
					>
						<div ref={modalRef} className={cn("rounded-[1.25rem] bg-modal w-80 h-80", className)} {...props}>
							{children}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
}
