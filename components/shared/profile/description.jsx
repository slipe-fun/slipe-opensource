import { useState } from "react";
import { DescriptionModal } from "../modals";

export default function Description({ user, changeUserDescription, isModal }) {
	const [isEdit, setIsEdit] = useState(false);

	return (
		<div className='flex flex-col gap-2 w-full px-5'>
			<div className='flex items-center'>
				<span className='text-2xl font-medium w-full'>About me</span>
				{!isModal ? (
					<DescriptionModal open={isEdit} setOpen={setIsEdit} user={user} changeUserDescription={changeUserDescription}>
						<button className='text-lg text-primary font-medium'>Edit</button>
					</DescriptionModal>
				) : null}
			</div>
			<p className='text-foreground/50 break-words text-lg'>{user?.description?.length > 0 ? user?.description : "No description."}</p>
		</div>
	);
}
