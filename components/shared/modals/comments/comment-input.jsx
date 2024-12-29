import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PixelAvatar from "../../pixels-avatar";
import Svg from "@/components/ui/icons/svg";
import cdn from "@/constants/cdn";
import icons from "@/components/ui/icons/icons";
import { AdjustHeight, cn } from "@/lib/utils";

export default function CommentInput({ error, user, setInputFocus, commentText, setCommentText, sendComment, isButtonLoading, className }) {

	return (
		<>
			{!error ? (
				<>
					{user?.avatar ? (
						<img
							loading='lazy'
							className='rounded-full min-w-12 object-cover bg-center w-12 h-12'
							src={`${cdn}/avatars/${user?.avatar}`}
						/>
					) : (
						<PixelAvatar size={48} username={user?.username} pixels={user?.pixel_order} />
					)}
				</>
			) : null}
			<Textarea
				onFocus={() => setInputFocus(true)}
				onBlur={() => setInputFocus(false)}
				maxLength={200}
				value={commentText}
				onChange={e => {
					setCommentText(e.target.value);
					AdjustHeight(e.target, '48px');
				}}
				className={cn('bg-foreground/[0.08] h-12 max-h-32 resize-none rounded-3xl text-sm p-[0.875rem]', className)}
				placeholder='Type something'
			/>
			<Button disabled={isButtonLoading} size='icon' className='rounded-full min-h-12 h-12 w-12 min-w-12' onClick={sendComment}>
				<Svg className='!w-7 !h-7' icon={icons["paperPlane"]} />
			</Button>
		</>
	);
}
