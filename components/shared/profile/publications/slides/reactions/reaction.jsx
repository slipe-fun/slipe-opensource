import Img from "@/components/ui/image";
import cdn from "@/constants/cdn";

export default function Reaction({ reaction, post }) {
	return (
		<div className='rounded-[1.125rem] relative w-full aspect-square overflow-hidden'>
			{post?.image ? (
				<Img src={cdn + "/posts/" + post?.image} wrapperClassName='w-full absolute -z-10 h-full' className="object-cover" />
			) : (
				<div className='w-full h-full absolute -z-10 bg-card' />
			)}

			<div className='w-full h-full items-center flex flex-col justify-center p-6 bg-black/50'>
				<img
					loading='lazy'
					src={reaction.startsWith("emoji_") ? `emojis/old/${reaction}` : `emojis/new/${reaction[0]}/${reaction.slice(2, reaction.length)}.png`}
					className='w-full h-full'
				/>
			</div>
		</div>
	);
}
