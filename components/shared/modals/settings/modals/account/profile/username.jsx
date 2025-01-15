import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Counter from "@/components/shared/counter";

export default function Username({ user, setUsername }) {
	const [username, setLocalUsername] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => setLocalUsername(user?.username), [user]);
	useEffect(() => setUsername(username), [username]);

	return (
		<div className='w-full flex flex-col px-5 gap-3'>
			<span className='text-2xl font-medium'>Username</span>
			<div className='bg-foreground/[0.12] flex items-center w-full rounded-2xl'>
				<span className='text-foreground p-4 pr-0'>slipe.fun/@</span>
				<Input
					maxLength={20}
					onInput={element => setLocalUsername(element.target.value)}
					value={username}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					type='username'
					className='bg-transparent rounded-none h-auto py-4 px-0'
					placeholder='Username here'
				/>
				<Counter
					data-focused={isFocused}
					value={username.length}
					className='text-base duration-200 ease-out data-[focused=true]:opacity-100 data-[focused=false]:opacity-0 p-4'
					maxValue={20}
				/>
			</div>
		</div>
	);
}
