import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function ToolsBar({ slide }) {
	return (
		<div
			className='bg-navigation pb-[calc(var(--safe-area-inset-bottom)+1rem)] w-screen border-t-[1px] p-4 duration-200 ease-out border-foreground/10 animate-[fadeIn_0.3s_ease-out] flex gap-4 fixed bottom-0 z-50'
		>
			<Button disabled={slide === 0} variant='secondary' size='full' className='min-h-[3.125rem] rounded-full h-[3.125rem]'>
				<Svg className='!w-7 !h-7 text-foreground' icon={icons["image"]} />
			</Button>
			<Button disabled={slide === 0} variant='secondary' size='full' className='min-h-[3.125rem] rounded-full h-[3.125rem]'>
				<Svg className='!w-7 !h-7 text-foreground' icon={icons["image"]} />
			</Button>
			<Button disabled={slide === 0} variant='secondary' size='full' className='min-h-[3.125rem] rounded-full h-[3.125rem]'>
				<Svg className='!w-7 !h-7 text-foreground' icon={icons["image"]} />
			</Button>
			<Button disabled={slide === 0} size='full' className='min-h-[3.125rem] font-medium rounded-full h-[3.125rem]'>
				Next
			</Button>
		</div>
	);
}
