import icons from "@/components/ui/icons/icons";
import Svg from "@/components/ui/icons/svg";
import QuickReactions from "./quick-reactions";
import { ReactionClicked } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useStorage } from "@/hooks/contexts/session";
import { useEffect, useState, useRef } from "react";
import { ReactionsModal, CommentsModal } from "@/components/shared/modals";

// Forgoten shi

export default function ActionsBlock({ reactions, currentReaction, id }) {
	const { token, store } = useStorage();
	const [isReactions, setIsReactions] = useState(false);
	const [isComments, setComments] = useState(false);
	const [localCurrentReaction, setCurrentReaction] = useState(currentReaction);
	const [localReactions, setReactions] = useState(reactions);
	const [isReactionsModal, setReactionsModal] = useState(false);
	const reactionsRef = useRef(null);

	useEffect(() => {
		const reactionsElement = reactionsRef?.current;
		reactionsElement.addEventListener("touchstart", e => e.stopPropagation());
		return () => {
			reactionsElement.removeEventListener("touchstart", e => e.stopPropagation());
		};
	}, []);

	const reactionClicked = (reactionCategory, reactionId) => {
		ReactionClicked(reactionCategory, reactionId, localReactions, localCurrentReaction, id, token, setCurrentReaction, setReactions);
	};

	const reactionsModalOpen = () => {
		setReactionsModal(true);
		setIsReactions(false);
	};

	return (
		<div className='w-full z-10 p-5 pr-0 flex items-end overflow-hidden gap-5 bg-gradient-to-t from-[#00000060] to-[#00000000]'>
			<div
				data-isexpanded={isReactions}
				className='relative flex text-white rounded-full ease-out duration-200 data-[isexpanded=false]:w-[3.125rem] data-[isexpanded=true]:w-[calc(100%-1rem)] data-[isexpanded=true]:p-2 data-[isexpanded=true]:bg-[#1f1f1f]'
			>
				<QuickReactions
					currentReaction={localCurrentReaction}
					isReactions={isReactions}
					setIsReactions={setIsReactions}
					reactionClicked={reactionClicked}
				/>
				<button
					data-isactive={isReactions}
					onClick={() => (isReactions ? reactionsModalOpen() : setIsReactions(true))}
					className='min-w-[3.125rem] h-[3.125rem] data-[isactive=true]:h-[2.625rem] data-[isactive=true]:min-w-[2.625rem] bg-black/50 data-[isactive=true]:bg-white/[0.12] flex justify-center items-center text-white rounded-full duration-200 ease-out'
				>
					<Svg
						data-isactive={isReactions}
						className='!w-[1.875rem] duration-200 ease-out data-[isactive=true]:!w-7 data-[isactive=true]:!h-7 !h-[1.875rem]'
						icon={icons["smile"]}
					/>
				</button>
				<ReactionsModal
					currentReaction={localCurrentReaction}
					onReactionClicked={reactionClicked}
					open={isReactionsModal}
					setOpen={setReactionsModal}
				/>
				<CommentsModal setOpen={setComments} open={isComments} postId={id} />
			</div>

			<button
				data-ishidden={isReactions}
				data-isactive={isComments}
				onClick={() => setComments(true)}
				className='relative data-[ishidden=true]:opacity-0 flex data-[isactive=true]:bg-white data-[isactive=true]:text-black text-white rounded-full ease-out duration-200 bg-black/50 p-[0.625rem]'
			>
				<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons["message"]} />
			</button>
			<div
				data-ishidden={isReactions}
				ref={reactionsRef}
				className='w-full overflow-x-scroll flex duration-200 ease-out gap-5 data-[ishidden=true]:opacity-0 data-[ishidden=true]:-mr-[130%]'
			>
				<AnimatePresence mode='popLayout'>
					{localReactions.map((reaction, index) => (
						<motion.button
							layout='position'
							key={index}
							initial={{ opacity: 0, x: 4 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
							exit={{ opacity: 0, scale: 0.9 }}
							onClick={
								reaction.name?.startsWith("emoji_") ? () => {} : () => reactionClicked(reaction.name[0], reaction.name.slice(2, reaction.name.length))
							}
							data-isactive={reaction.name === localCurrentReaction?.name}
							className='rounded-full duration-200 bg-black/50 text-white ease-out data-[isactive=true]:bg-white data-[isactive=true]:text-black flex min-w-fit items-center font-medium gap-2 py-[0.625rem] px-5'
						>
							<img
								className='!w-7 !h-7'
								src={
									reaction.name?.startsWith("emoji_")
										? `emojis/old/${reaction.name}`
										: `emojis/new/${reaction.name[0]}/${reaction.name.slice(2, reaction.name.length)}.png`
								}
							/>
							{reaction.count}
						</motion.button>
					))}
				</AnimatePresence>
			</div>
		</div>
	);
}
