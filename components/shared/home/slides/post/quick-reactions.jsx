import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useStorage } from "@/hooks/contexts/session";

export default function QuickReactions({ reactionClicked, setIsReactions, isReactions = false, currentReaction }) {
	const [reactions, setReactions] = useState([]);
	const { token, store } = useStorage();

	const getReactions = async () => {
		const value = await store.get("reactions");
		setReactions(value?.reverse() || ["0/0", "0/1", "0/2", "0/3", "0/4"].reverse());
	};

	useEffect(() => {
		getReactions();
	}, [isReactions]);

	return (
		<div
			data-isexpanded={isReactions}
			className='duration-200 ease-out overflow-hidden flex w-0 opacity-0 data-[isexpanded=true]:w-full data-[isexpanded=true]:opacity-100'
		>
			<AnimatePresence>
				{isReactions ? (
					<motion.button
						transition={{ duration: 0.2, ease: "easeOut" }}
						exit={{ opacity: 0, scale: 0.5 }}
						onClick={() => setIsReactions(false)}
						className='min-w-10 bg-white/[0.08] flex justify-center items-center text-white rounded-full duration-200 ease-out h-10'
					>
						<Svg className='!w-5 !h-5' icon={icons["x"]} />
					</motion.button>
				) : null}

				<div className='flex w-full mx-1 justify-between'>
					{reactions.map((reaction, index) => (
						<>
							{isReactions ? (
								<motion.button
									key={index}
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.2 + index * 0.05, ease: "easeOut" }}
									exit={{ opacity: 0, scale: 0.5 }}
									data-isactive={currentReaction?.name === `${reaction[0]}_${reaction.slice(2)}`}
									onClick={() => {
										reactionClicked(reaction[0], reaction.slice(2));
										setIsReactions(false);
									}}
									className='flex justify-center items-center w-full data-[isactive=true]:!opacity-50'
								>
									<img loading="lazy" className=' w-8 h-8' src={`emojis/new/${reaction.slice(0, 1)}/${reaction.slice(2)}.png`} />
								</motion.button>
							) : null}
						</>
					))}
				</div>
			</AnimatePresence>
		</div>
	);
}
