export default function WelcomeFeature({ title = "", desc = "", img = "" }) {
	return (
		<>
			<div className="flex flex-col gap-4 px-4 pb-5 items-center">
				<img loading="lazy" src={img} alt={title} className='w-40 h-40' />
				<div className='w-full flex flex-col items-center gap-2'>
					<span className='text-3xl text-foreground font-semibold'>{title}</span>
					<p className='text-center text-foreground/50'>{desc}</p>
				</div>{" "}
			</div>
		</>
	);
}
