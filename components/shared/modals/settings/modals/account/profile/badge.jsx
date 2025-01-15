import { useState, useEffect } from "react";

export default function Badge({ user, setBadge }) {
	const [badge, setLocalBadge] = useState(null);

	useEffect(() => setLocalBadge(badge), [badge]);
	useEffect(() => setLocalBadge(user?.badge), [user]);

	return (
		<div className='w-full flex flex-col px-5 gap-3'>
			<div className='flex items-center'>
				<span className='text-2xl font-medium w-full'>Profile badge</span>
				<span className='text-lg min-w-fit text-foreground/50'>Max 5mb</span>
			</div>
		</div>
	);
}
