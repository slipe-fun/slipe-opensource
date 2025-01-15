import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Counter from "@/components/shared/counter";

export default function DisplayName({ user, setDisplayName }) {
	const [displayname, setLocalDisplayName] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => setDisplayName(displayname), [displayname]);
	useEffect(() => setLocalDisplayName(user?.nickname || ""), [user]);

	return (
		<div className='w-full flex flex-col px-5 gap-3'>
			<span className='text-2xl font-medium'>Display name</span>
			<div className='bg-foreground/[0.12] flex items-center w-full rounded-2xl'>
				<Input
					maxLength={32}
					onInput={element => setLocalDisplayName(element.target.value)}
					value={displayname}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					type='username'
					className='bg-transparent rounded-none h-auto p-4 pr-0'
					placeholder='Display name here'
				/>
				<Counter
					data-focused={isFocused}
					value={displayname.length}
					className='text-base duration-200 ease-out data-[focused=true]:opacity-100 data-[focused=false]:opacity-0 p-4'
					maxValue={32}
				/>
			</div>
		</div>
	);
}
