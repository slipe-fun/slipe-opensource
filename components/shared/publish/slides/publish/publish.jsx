import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PublishBottomText from "./bottom-text";
import PublishPostName from "./post-name";
import PublishPostCategory, { PostCategorySelector } from "./post-category";

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

export default function PublishSlide({ name, setName, category, setCategory, comments, setComments, reactions, setReactions, hidden, categoryFocused, setCategoryFocused}) {
	const [focused, setFocused] = useState(false);
	const [active, setActive] = useState(0);

	return (
		<>
			<AnimatePresence>
				{!hidden && (
					<motion.div variants={containerVariants} className='flex flex-col gap-4' initial='hidden' animate='visible' exit='exit'>
						<PublishPostName name={name} setName={setName} setFocused={setFocused} focused={focused} blockVariants={blockVariants} />
						<PublishPostCategory
							categoryFocused={categoryFocused}
							active={active}
							setActive={setActive}
							setCategoryFocused={setCategoryFocused}
							blockVariants={blockVariants}
							setCategory={setCategory}
							category={category}
						/>
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
						<PublishBottomText />
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence mode="wait">
				{focused || categoryFocused ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className='fixed top-0 right-0 w-screen pt-[calc(16.5625rem+var(--safe-area-inset-top))] pb-[calc(5.1875rem+var(--safe-area-inset-bottom))] px-4 h-screen z-[10] bg-black/40 backdrop-blur-lg'
					>
						<motion.ul exit='exit' initial="hidden" animate="visible" variants={blockVariants} className='h-full w-full gap-2 pb-4 overflow-y-scroll flex flex-col'>
							{categoryFocused && (
								<PostCategorySelector
									active={active}
									setActive={setActive}
									category={category}
									setCategory={setCategory}
								/>
							)}
						</motion.ul>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
}
