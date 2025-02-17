import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PixelAvatar from "@/components/shared/pixels-avatar";
import Img from "@/components/ui/image";
import Svg from "@/components/ui/icons/svg";
import { useState, useRef, useEffect } from "react";
import icons from "@/components/ui/icons/icons";
import cdn from "@/constants/cdn";
import { TimePassedFromDate } from "@/lib/utils";

export default function CommentBlock({ notification, token }) {
	const [user, setUser] = useState(notification?.from_user);
	const [comment, setComment] = useState(notification?.object);
	const [isOpen, setIsOpen] = useState(false);
	const [canOpen, setCanOpen] = useState(false);
	const textRef = useRef(null);
	const [fullHeight, setFullHeight] = useState(0);

	const collapsedHeight = 20;

	useEffect(() => {
		if (textRef.current) {
			const previousWhiteSpace = textRef.current.style.whiteSpace;
			textRef.current.style.whiteSpace = "normal";
			const measuredHeight = textRef.current.scrollHeight;
			setCanOpen(textRef.current.scrollHeight > collapsedHeight);
			textRef.current.style.whiteSpace = previousWhiteSpace;
			setFullHeight(measuredHeight);
		}
	}, [isOpen]);

	const toggleText = () => {
		setIsOpen(prev => !prev);
	};


	return (
		<div className='w-full border border-foreground/[0.1] bg-block rounded-lg flex p-3 flex-col gap-[0.125rem]'>
			<div className='w-full flex items-center gap-4'>
				<div className='w-full flex gap-3 duration-200 ease-out items-center overflow-hidden active:opacity-80'>
					{user?.avatar ? (
						<Img wrapperClassName='rounded-full min-w-11 h-11' iconClassName='!w-7 !h-7' src={`${cdn}/avatars/${user?.avatar}`} />
					) : (
						<PixelAvatar size={44} username={user?.username || "Anonymous"} pixels={user?.pixel_order} />
					)}
					<div className='flex flex-col w-full overflow-hidden'>
						<div className='w-full flex gap-1'>
							<div className='whitespace-nowrap overflow-hidden text-sm max-w-fit text-ellipsis font-medium text-foreground'>
								{user?.nickname || user?.username || "Anonymous"}
							</div>
						</div>
						<span className='text-xs leading-[1.125rem] text-white/50'>{TimePassedFromDate(notification?.date) || "Unknown"}</span>
					</div>
				</div>
				<Button
					disabled={!canOpen}
					onClick={toggleText}
					size='icon'
					className='bg-foreground/[0.08] hover:bg-foreground/[0.08] w-11 min-w-11 h-11 min-h-11 rounded-full'
				>
					<Svg data-open={isOpen} className='!w-6 !h-6 duration-200 ease-out -rotate-90 data-[open=true]:rotate-90' icon={icons["chevronLeft"]} />
				</Button>
			</div>
			<div className='pl-14'>
				<motion.span
					animate={{ height: isOpen ? fullHeight : collapsedHeight }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					style={{ display: "block", overflow: "hidden" }}
					className='w-full text-sm font-medium text-foreground'
				>
					<span
						ref={textRef}
						className='break-words block text-ellipsis overflow-hidden data-[open=true]:whitespace-normal data-[open=false]:whitespace-nowrap'
					>
						{comment.text || "Empty comment"}
					</span>
				</motion.span>
			</div>
		</div>
	);
}
