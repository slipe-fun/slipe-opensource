import { motion } from "motion/react";

const tabs = ["Reactions", "Follows", "Comments"];

export default function SwitcherBar({ active, setActive }) {
	return (
		<div className='w-full p-4 pb-[calc(1rem+var(--safe-area-inset-bottom))] gap-7 flex bottom-0 border-t-[1px] border-foreground/10 z-50 bg-navigation items-center fixed backdrop-blur-[80px]'>
			<div className='relative flex w-full p-1 bg-foreground/[0.08] rounded-[0.75rem]'>
				{tabs.map((tab, index) => (
					<button
						key={tab}
						onClick={() => setActive(index)}
						className={`relative w-full text-foreground/50 py-[0.4375rem] font-medium transition-colors duration-200 ${
							active === index ? "!text-foreground" : "hover:text-gray-700"
						}`}
					>
						{active === index && (
							<motion.div
								layoutId='tab-indicator'
								className='absolute inset-0 bg-white/[0.08] rounded-[0.5rem]'
								transition={{ duration: 0.2, ease: "easeOut" }}
							/>
						)}
						<span className='relative z-10'>{tab}</span>
					</button>
				))}
			</div>
		</div>
	);
}
