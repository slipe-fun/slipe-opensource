import { useState, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Img from "@/components/ui/image";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

const tabs = [icons["expand"], icons["crop"]];

const buttonVariants = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
};

const blockVariants = {
	initial: { opacity: 0, y: -15 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 15 },
};

function Editor({ image, confirmed, hidden }) {
	const [activeTab, setActiveTab] = useState(0);

	const toggleActiveTab = useCallback(() => {
		setActiveTab(prev => (prev === 0 ? 1 : 0));
	}, []);

	const handleEditorClick = useCallback(() => {
		if (!confirmed) {
			toggleActiveTab();
		}
	}, [confirmed, toggleActiveTab]);

	const handleTabClick = useCallback((index, event) => {
		event.stopPropagation();
		setActiveTab(index);
	}, []);

	return (
		<AnimatePresence mode='wait'>
			{!hidden && (
				<motion.div
					key='editor-container'
					variants={blockVariants}
					initial='initial'
					animate='animate'
					transition={{ type: "spring" }}
					exit='exit'
					onClick={handleEditorClick}
					className='relative w-full h-full rounded-[1.75rem] bg-[#242424] overflow-hidden'
				>
					<Img
						src={image}
						wrapperClassName='w-full h-full absolute top-0 left-0'
						iconClassName='!w-24 !h-24'
						className={`${activeTab === 0 ? "object-contain" : "object-cover"} w-full h-full`}
					/>
					<AnimatePresence mode='wait'>
						{!confirmed && (
							<motion.div
								key='tab-buttons'
								variants={buttonVariants}
								initial='hidden'
								animate='visible'
								exit='exit'
								className='absolute bottom-0 right-0 z-10 p-4'
								onClick={e => e.stopPropagation()}
							>
								<div className='flex p-1 bg-navigation backdrop-blur-[80px] rounded-full relative'>
									{tabs.map((tab, index) => (
										<button
											key={index}
											onClick={e => handleTabClick(index, e)}
											className={`relative w-full py-2 px-5 font-medium transition-colors duration-200 text-foreground/50 ${
												activeTab === index ? "!text-foreground" : "hover:text-foreground/50"
											}`}
										>
											{activeTab === index && (
												<motion.div
													layoutId='tab-indicator'
													transition={{ type: "spring", duration: 0.45 }}
													className='absolute inset-0 bg-white/[0.12] rounded-full'
												/>
											)}
											<Svg className='!w-7 !h-7' icon={tab} />
										</button>
									))}
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default memo(Editor);
