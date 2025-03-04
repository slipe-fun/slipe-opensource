import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import { useNavigate } from "react-router";
import icons from "@/components/ui/icons/icons";
import { useState } from "react";
import { Modal } from "../modals";

export default function Header({ slide, discardChanges, confirmed, setSlide }) {
	const navigate = useNavigate();
	const [discard, setDiscard] = useState(false);

	return (
		<div className='w-full p-4 pt-[calc(1rem+var(--safe-area-inset-top))] gap-7 data-[shadowed=true]:opacity-40 duration-200 ease-out flex top-0 border-b-[1px] animate-[fadeIn_0.3s_ease-out] border-foreground/10 z-50 bg-navigation items-center fixed'>
			<Button
				onClick={() => {
					if (slide === 1 && confirmed) {
						setDiscard(true);
					} else if (slide === 2 || slide === 3) {
						setSlide(prev => prev - 1);
					} else navigate(-1);
				}}
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
			<Modal className='flex flex-col' setOpen={setDiscard} open={discard}>
				<div className='w-full h-full flex flex-col gap-2 items-center justify-center p-4'>
					<Svg className='!w-[6.25rem] !h-[6.25rem] text-foreground/50' icon={icons["trash"]} />
					<span className='font-medium w-full text-center text-lg'>Do you want to discard all the changes?</span>
					<span className='text-sm text-foreground/50'>This action cannot be undone</span>
				</div>
				<div className='w-full gap-4 border-t-[1px] border-foreground/10 p-4 flex'>
					<Button
						onClick={() => setDiscard(false)}
						size='full'
						variant='secondary'
						className='font-medium h-11 min-h-11 text-[0.9375rem] rounded-full'
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							setDiscard(false);
							discardChanges();
						}}
						variant='deleting'
						size='full'
						className='font-medium h-11 min-h-11 text-[0.9375rem] rounded-full'
					>
						Discard
					</Button>
				</div>
			</Modal>
		</div>
	);
}
