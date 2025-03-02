import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useStorage } from "@/hooks/contexts/session";

export default function QuickReactions({ reactionClicked, setIsReactions, isReactions = false, currentReaction }) {
	const [reactions, setReactions] = useState([]);
	const { store } = useStorage();

	const getReactions = async () => {
		const value = await store.get("reactions");
		// Если в сторе нет данных, используем дефолтный массив и разворачиваем порядок
		setReactions(value?.reverse() || ["0/0", "0/1", "0/2", "0/3", "0/4"].reverse());
	};

	useEffect(() => {
		if (isReactions) {
			getReactions();
		}
	}, [isReactions]);

	return (
		<div
			data-isexpanded={isReactions}
			className='duration-200 ease-out overflow-hidden flex w-0 opacity-0 data-[isexpanded=true]:w-full data-[isexpanded=true]:opacity-100'
		>
			<AnimatePresence>
				{isReactions && (
					<>
						{/* Кнопка закрытия */}
						<motion.button
							key='close-button'
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{ type: "spring", stiffness: 300, damping: 20 }}
							onClick={() => setIsReactions(false)}
							className='min-w-10 bg-white/[0.08] flex justify-center items-center text-white rounded-full h-10'
						>
							<Svg className='!w-5 !h-5' icon={icons["x"]} />
						</motion.button>

						{/* Контейнер кнопок реакций с последовательной анимацией */}
						<motion.div
							key='reactions-container'
							initial='hidden'
							animate='visible'
							exit='exit'
							transition={{ staggerChildren: 0.15 }}
							className='flex w-full mx-1 justify-between'
						>
							{reactions.map((reaction, index) => (
								<motion.button
									key={`reaction-${reaction}`}
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									transition={{ type: "spring", stiffness: 300, damping: 20 }}
									data-isactive={currentReaction?.name === `${reaction[0]}_${reaction.slice(2)}`}
									onClick={() => {
										reactionClicked(reaction[0], reaction.slice(2));
										setIsReactions(false);
									}}
									className='flex justify-center items-center w-full data-[isactive=true]:!opacity-50'
								>
									<img
										loading='lazy'
										className='w-8 h-8'
										src={`emojis/new/${reaction.slice(0, 1)}/${reaction.slice(2)}.png`}
										alt={`reaction-${reaction}`}
									/>
								</motion.button>
							))}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
