export default function Avatar({ user }) {
	return (
		<div className='w-full flex flex-col gap-3'>
			<div className='flex items-center'>
				<span className='text-2xl font-medium w-full'>Avatar</span>
				<span className='text-lg min-w-fit text-foreground/50'>Max 3mb</span>
			</div>
		</div>
	);
}
