import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function Header({ setOpen, reload }) {
	return (
		<div className='w-full p-4 pt-[calc(1rem+var(--safe-area-inset-top))] gap-7 flex top-0 border-b-[1px] border-foreground/10 z-50 bg-navigation items-center fixed backdrop-blur-[80px]'>
			<Button onClick={() => setOpen(false)} size='icon' variant='secondary' className='rounded-full bg-foreground/[0.08] hover:foreground[0.06]'>
				<Svg className='!w-[1.625rem] !h-[1.625rem]' icon={icons["chevronLeft"]} />
			</Button>
			<div className='w-full h-full flex overflow-hidden items-center justify-center flex-col'>
				<span className='font-medium overflow-hidden w-full whitespace-nowrap max-w-fit text-center text-ellipsis'>
					Notifications
				</span>
				<span className='opacity-50 text-sm overflow-hidden w-full whitespace-nowrap text-center max-w-fit text-ellipsis'>30,607 Notifications</span>
			</div>
			<Button
				onClick={reload}
				size='icon'
				variant='secondary'
				className='rounded-full bg-foreground/[0.08] hover:bg-foreground[0.06]'
			>
				<Svg className='!w-8 !h-8' icon={icons["rotate"]} />
			</Button>
		</div>
	);
}
