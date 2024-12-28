import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function Header({ post, user, setOpen, inputFocus }) {
	return (
		<div data-shadowed={inputFocus} className='w-full p-4 gap-5 data-[shadowed=true]:opacity-40 duration-200 ease-out flex top-0 z-50 bg-background/90 items-center fixed backdrop-blur-2xl'>
			<Button
				onClick={() => setOpen(false)}
				size='icon'
				variant='secondary'
				className='rounded-full w-[3.25rem] h-[3.25rem] min-w-[3.25rem] min-h-[3.25rem] bg-white/[0.12] hover:bg-white[0.8]'
			>
				<Svg className='!w-[1.625rem] !h-[1.625rem]' icon={icons["chevronLeft"]} />
			</Button>
			<div className='w-full h-full flex overflow-hidden items-center justify-center flex-col'>
				<span className='font-medium overflow-hidden w-full whitespace-nowrap max-w-fit text-center text-ellipsis'>{post?.in_search || "Untitled post"}</span>
				<span className='opacity-50 overflow-hidden w-full whitespace-nowrap text-center max-w-fit text-ellipsis'>@{user?.username}</span>
			</div>
			<Button size='icon' variant='secondary' className='rounded-full w-[3.25rem] h-[3.25rem] min-w-[3.25rem] min-h-[3.25rem] bg-white/[0.12] hover:bg-white[0.8]'>
				<Svg className='!w-[1.625rem] !h-[1.625rem]' icon={icons["menu"]} />
			</Button>
		</div>
	);
}
