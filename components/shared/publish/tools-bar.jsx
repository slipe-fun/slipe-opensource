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
				{(slide === 0 || (slide === 1 && confirmed)) && (
					<motion.div key='groupA' variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='flex gap-4 w-full'>
						{["image", "text", "brush"].map((icon, index) => (
							<motion.div key={`groupA-icon-${index}`} variants={buttonVariants} className='w-full'>
								<Button disabled={slide !== 1} variant='secondary' size='full' className='min-h-[3.125rem] rounded-full h-[3.125rem]'>
									<Svg className='!w-7 !h-7 text-foreground' icon={icons[icon]} />
								</Button>
							</motion.div>
						))}
						<motion.div key='groupA-next' variants={buttonVariants}>
							<Button
								disabled={slide !== 1}
								onClick={() => {
									if (slide === 0) {
										setSlide(1);
									} else if (slide === 1 && confirmed) {
										setSlide(2);
									}
								}}
								className='min-h-[3.125rem] gap-[0.375rem] pr-[0.875rem] font-medium rounded-full h-[3.125rem]'
							>
								Next <Svg className='!w-[1.125rem] !h-[1.125rem] text-foreground' icon={icons["chevronRight"]} />
							</Button>
						</motion.div>
					</motion.div>
				)}

				{slide === 1 && !confirmed && (
					<motion.div key='groupB' variants={containerVariants} initial='hidden' animate='visible' exit='exit' className='flex gap-4 w-full'>
						<motion.div key='groupB-cancel' variants={buttonVariants} className='w-full'>
							<Button
								onClick={() => {
									setSlide(0);
									setImage(null);
								}}
								variant='secondary'
								size='full'
								className='min-h-[3.125rem] font-medium rounded-full h-[3.125rem]'
							>
								Cancel
							</Button>
						</motion.div>
						<motion.div key='groupB-confirm' variants={buttonVariants} className='w-full'>
							<Button onClick={() => setConfirmed(true)} size='full' className='min-h-[3.125rem] font-medium rounded-full h-[3.125rem]'>
								Confirm
							</Button>
						</motion.div>
					</motion.div>
				)}

				{slide === 2 && (
					<motion.div key='button-publish' variants={buttonVariants} initial='hidden' animate='visible' exit='exit' className='w-full'>
						<Button size='full' className='min-h-[3.125rem] font-medium rounded-full h-[3.125rem]'>
							Publish post
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
