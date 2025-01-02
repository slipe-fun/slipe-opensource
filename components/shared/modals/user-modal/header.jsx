import { useState } from "react";
import { Button } from "@/components/ui/button";
import Svg from "@/components/ui/icons/svg";
import icons from "@/components/ui/icons/icons";

export default function Header({ user, setOpen }) {
	return (
		<header className='w-screen fixed flex justify-between z-50 p-4'>
			<Button
				onClick={() => setOpen(false)}
				className='rounded-full hover:bg-black/35 bg-black/35 backdrop-blur-2xl'
				size='icon'
			>
				<Svg
					icon={icons["chevronLeft"]}
					className='duration-200 ease-out !w-7 !h-7'
				/>
			</Button>
			<Button
				size='icon'
                data-isactive={false}
				className='rounded-full data-[isactive=false]:bg-black/35 backdrop-blur-2xl data-[isactive=true]:bg-white data-[isactive=false]:text-white data-[isactive=true]:text-black'
			>
				<Svg className='!w-[1.875rem] !h-[1.875rem]' icon={icons["menu"]} />
			</Button>
		</header>
	);
}
