import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Img from "@/components/ui/image";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

const tabs = [icons["expand"], icons["crop"]];

export default function Editor({ image, confirmed }) {
	const [activeTab, setActiveTab] = useState(0);

	const toggleActiveTab = () => {
		setActiveTab(prev => (prev === 0 ? 1 : 0));
	};

	const buttonVariants = {
		hidden: { opacity: 0, y: -10 },
		visible: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 10 },
	};

    const switcherTransition = {
        type: "spring", stiffness: 50, damping: 7, duration: 0.45
    }

	return (
		<div onClick={!confirmed && toggleActiveTab} className='rounded-[1.75rem] bg-[#242424] overflow-hidden relative w-full h-full'>
			<motion.div
				className='w-full h-full absolute top-0 left-0'
				animate={{
					scale: activeTab === 0 ? 1 : 1.05,
				}}
				transition={{ duration: 0.15 }}
			>
				<Img
					src={image}
					wrapperClassName='w-full h-full'
					iconClassName='!w-24 !h-24'
					className={`${activeTab === 0 ? "object-contain" : "object-cover"} w-full h-full`}
				/>
			</motion.div>

			<AnimatePresence mode='wait'>
				{!confirmed && (
					<motion.div
						variants={buttonVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='absolute bottom-0 z-10 right-0 p-4'
						onClick={e => e.stopPropagation()}
					>
						<div className='relative flex p-1 bg-navigation backdrop-blur-[80px] rounded-full'>
							{tabs.map((tab, index) => (
								<button
									key={index}
									onClick={e => {
										e.stopPropagation();
										setActiveTab(index);
									}}
									className={`relative w-full text-foreground/50 py-2 px-5 font-medium transition-colors duration-200 ${
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
		</div>
	);
}
