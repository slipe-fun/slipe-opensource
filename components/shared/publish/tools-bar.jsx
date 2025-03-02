import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
	exit: {
		transition: {
			staggerChildren: 0.1,
			staggerDirection: -1,
		},
	},
};
const buttonVariants = {
	hidden: { opacity: 0, y: -10 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 10 },
};

export default function ToolsBar({ slide, confirmed, setSlide, setConfirmed, setImage }) {
	return (
		<div className='bg-navigation pb-[calc(var(--safe-area-inset-bottom)+1rem)] w-screen border-t-[1px] p-4 duration-200 ease-out border-foreground/10 animate-[fadeIn_0.3s_ease-out] flex gap-4 fixed bottom-0 z-50'>
			<AnimatePresence mode='wait'>
				{slide !== 1 || confirmed ? (
					<motion.div key='groupA' variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='flex gap-4 w-full'>
						{[0, 1, 2].map((_, index) => (
							<motion.div key={`groupA-image-${index}`} variants={buttonVariants} className='w-full'>
								<Button disabled={slide === 0} variant='secondary' size='full' className='min-h-[3.125rem] rounded-full h-[3.125rem]'>
									<Svg className='!w-7 !h-7 text-foreground' icon={icons["image"]} />
								</Button>
							</motion.div>
						))}
						<motion.div key='groupA-next' variants={buttonVariants} className='w-full'>
							<Button disabled={slide === 0} size='full' className='min-h-[3.125rem] font-medium rounded-full h-[3.125rem]'>
								Next
							</Button>
						</motion.div>
					</motion.div>
				) : (
					<motion.div key='groupB' variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='flex gap-4 w-full'>
						<motion.div
							key='groupB-cancel'
							className='w-full'
							variants={buttonVariants}
							onClick={() => {
								setSlide(0);
								setImage(null);
							}}
						>
							<Button variant='secondary' size='full' className='min-h-[3.125rem] font-medium rounded-full h-[3.125rem]'>
								Cancel
							</Button>
						</motion.div>
						<motion.div key='groupB-confirm' variants={buttonVariants} className='w-full' onClick={() => setConfirmed(true)}>
							<Button size='full' className='min-h-[3.125rem] font-medium rounded-full h-[3.125rem]'>
								Confirm
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
