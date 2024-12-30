import { cn } from "@/lib/utils";

export default function NoContent({ title = "", primary = "", image = "", className, ...props }) {
	return (
		<div className={cn("w-full flex flex-col gap-3 items-center justify-center", className)} {...props}>
			<img loading='lazy' src={`./static/states-assets/${image}`} className='w-36 h-36' />
			<div className='flex flex-col gap-1'>
				<span className='text-2xl text-center text-foreground font-medium'>{title}</span>
				<span className='text-lg text-center text-foreground/50'>{primary}</span>
			</div>
		</div>
	);
}
