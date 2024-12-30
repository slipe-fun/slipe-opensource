import { useState } from "react";
import DescriptionModal from "../modals/description/description";
import { useState } from "react";

export default function Description({ user, changeUserDescription }) {
	const [isEdit, setIsEdit] = useState(false);

	return (
		<div className='flex flex-col gap-2 w-full px-5'>
			<div className='flex items-center'>
				<span className='text-2xl font-medium w-full'>About me</span>
				<DescriptionModal open={isEdit} setOpen={setIsEdit}>
					<button className='text-lg text-primary font-medium'>Edit</button>
				</DescriptionModal>
			</div>
			<p className='text-foreground/50 break-words text-lg'>{user?.description?.length > 0 ? user?.description : "No description."}</p>
		</div>
	);
}
