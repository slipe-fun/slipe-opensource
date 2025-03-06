import { AnimatePresence, motion } from "framer-motion";
import Counter from "../../counter";
import { useEffect, useState, useRef } from "react";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
	exit: {
		transition: {
			staggerChildren: 0.1,
			staggerDirection: -1,
		},
	},
};

const blockVariants = {
	hidden: { opacity: 0, y: -15 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 15 },
};

export default function PublishSlide({
	name,
	setName,
	category,
	setCategory,
	comments,
	setComments,
	reactions,
	setReactions,
	hidden,
}) {
	const textareaRef = useRef(null);
	const hiddenDivRef = useRef(null);
	const [textareaHeight, setTextareaHeight] = useState("32px");
	const [focused, setFocused] = useState(false);

	const updateTextareaHeight = () => {
		if (textareaRef.current && hiddenDivRef.current) {
			hiddenDivRef.current.style.width = `${textareaRef.current.offsetWidth}px`;
			hiddenDivRef.current.textContent = name + "\n";
			const newHeight = hiddenDivRef.current.scrollHeight;
			setTextareaHeight(`${newHeight}px`);
		}
	};

	useEffect(() => {
		updateTextareaHeight();
	}, [name]);

	return (
		<>
			<AnimatePresence>
				{!hidden && (
					<motion.div variants={containerVariants} className='flex flex-col gap-4' initial='hidden' animate='visible' exit='exit'>
						<motion.div
							onClick={() => textareaRef.current?.focus()}
							key='postName-container'
							variants={blockVariants}
							transition={{ type: "spring" }}
							whileTap={{ scale: 0.99, opacity: 0.8 }}
							className={`relative z-10 w-full h-[9.25rem] flex flex-col justify-between p-5 rounded-[1.25rem] bg-gradient-to-b from-[#C685FF] to-[#AF53FF] overflow-hidden ${
								focused ? "z-[70]" : "z-10"
							}`}
						>
							<div className='w-full flex justify-between'>
								<span className='text-white/50 font-semibold'>Post name</span>
								<Counter className='text-base font-semibold' value={name.length} maxValue={32} />
							</div>
							<textarea
								ref={textareaRef}
								value={name}
								style={{ height: textareaHeight }}
								maxLength={32}
								placeholder='Type post name...'
								onChange={e => {
									setName(e.target.value);
									updateTextareaHeight();
								}}
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
								className='w-full bg-transparent placeholder:text-white/50 overflow-visible font-semibold text-white outline-none text-2xl resize-none'
							/>
							<div
								ref={hiddenDivRef}
								style={{
									position: "absolute",
									visibility: "hidden",
									whiteSpace: "pre-wrap",
									wordWrap: "break-word",
									fontSize: "1.5rem",
									lineHeight: "2rem",
									padding: "0",
								}}
							/>
						</motion.div>

						<motion.div
							transition={{ type: "spring" }}
							key='postCategory-container'
							variants={blockVariants}
							whileTap={{ scale: 0.99, opacity: 0.8 }}
							className='relative w-full h-[9.25rem] flex gap-5 p-5 rounded-[1.25rem] bg-gradient-to-b from-[#FFAD66] to-[#FF9233] overflow-hidden'
						>
							<div className='w-full h-full flex flex-col justify-between'>
								<span className='text-white/50 font-semibold'>Post category</span>
								<span className='text-white font-semibold text-2xl'>{category}</span>
							</div>
						</motion.div>

						<div className='w-full flex gap-4'>
							<motion.div
								transition={{ type: "spring" }}
								key='postComments-container'
								variants={blockVariants}
								animate={{
									background: `linear-gradient(to bottom, ${comments ? "#3D9EFF, #0A84FF" : "#FF7070, #FF3F3F"})`,
									...blockVariants.visible,
								}}
								whileTap={{ scale: 0.99, opacity: 0.8 }}
								onClick={() => setComments(prev => !prev)}
								className='relative w-full h-[9.375rem] flex flex-col items-center gap-3 p-5 rounded-[1.25rem] overflow-hidden'
							>
								<div className='w-full flex justify-between relative'>
									<span className='text-white/50 font-semibold'>Comments</span>
									<AnimatePresence>
										<motion.span
											initial={{ opacity: 0, y: -10, scale: 0.8 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											transition={{ duration: 0.3, type: "spring" }}
											exit={{ opacity: 0, y: 10, scale: 0.8 }}
											className='text-white font-semibold right-0 absolute'
											key={comments}
										>
											{comments ? "ON" : "OFF"}
										</motion.span>
									</AnimatePresence>
								</div>
								<img
									className={`h-[4.625rem] duration-300 ${comments ? "" : "opacity-50 blur-[3px]"} w-[4.625rem]`}
									src='./static/publish-assets/comments.png'
								/>
							</motion.div>

							<motion.div
								transition={{ type: "spring" }}
								key='postReactions-container'
								variants={blockVariants}
								animate={{
									background: `linear-gradient(to bottom, ${reactions ? "#3D9EFF, #0A84FF" : "#FF7070, #FF3F3F"})`,
									...blockVariants.visible,
								}}
								whileTap={{ scale: 0.99, opacity: 0.8 }}
								onClick={() => setReactions(prev => !prev)}
								className='relative w-full h-[9.375rem] flex flex-col items-center gap-3 p-5 rounded-[1.25rem] overflow-hidden'
							>
								<div className='w-full flex justify-between relative'>
									<span className='text-white/50 font-semibold'>Reactions</span>
									<AnimatePresence>
										<motion.span
											initial={{ opacity: 0, y: -10, scale: 0.8 }}
											animate={{ opacity: 1, y: 0, scale: 1 }}
											transition={{ duration: 0.3, type: "spring" }}
											exit={{ opacity: 0, y: 10, scale: 0.8 }}
											className='text-white font-semibold right-0 absolute'
											key={reactions}
										>
											{reactions ? "ON" : "OFF"}
										</motion.span>
									</AnimatePresence>
								</div>
								<img
									className={`h-[4.625rem] duration-300 ${reactions ? "" : "opacity-50 blur-[3px]"} w-[4.625rem]`}
									src='./static/publish-assets/reactions.png'
								/>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{focused && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed top-0 right-0 w-screen h-screen z-[60] bg-black/40 backdrop-blur-lg'
					/>
				)}
			</AnimatePresence>
		</>
	);
}
