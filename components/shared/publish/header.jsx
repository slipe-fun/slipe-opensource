import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import { useNavigate } from "react-router";
import icons from "@/components/ui/icons/icons";

export default function Header({ slide }) {
	const navigate = useNavigate();

	return (
		<div className='w-full p-4 pt-[calc(1rem+var(--safe-area-inset-top))] gap-7 data-[shadowed=true]:opacity-40 duration-200 ease-out flex top-0 border-b-[1px] animate-[fadeIn_0.3s_ease-out] border-foreground/10 z-50 bg-navigation items-center fixed'>
			<Button
				onClick={() => navigate(-1)}
				size='icon'
				variant='secondary'
				className='rounded-full bg-foreground/[0.08] min-w-[3.125rem] min-h-[3.125rem] w-[3.125rem] h-[3.125rem] hover:foreground[0.06]'
			>
				<Svg className='!w-[1.9375rem] !h-[1.9375rem]' icon={icons["chevronLeft"]} />
			</Button>
			<span className='font-medium w-full text-center text-[1.0625rem]'>Post publishing</span>
			<Button
				disabled={slide === 0}
				size='icon'
				variant='secondary'
				className='rounded-full min-w-[3.125rem] min-h-[3.125rem] w-[3.125rem] h-[3.125rem] bg-foreground/[0.08] hover:bg-foreground[0.06]'
			>
				<Svg className='!w-[1.9375rem] !h-[1.9375rem]' icon={icons["eye"]} />
			</Button>
		</div>
	);
}
