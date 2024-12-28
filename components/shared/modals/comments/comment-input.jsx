import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PixelAvatar from "../../pixels-avatar";
import Svg from "@/components/ui/icons/svg";
import cdn from "@/constants/cdn";
import icons from "@/components/ui/icons/icons";
import { cn } from "@/lib/utils";

export default function CommentInput({ error, user, setInputFocus, commentText, setCommentText, sendComment, isButtonLoading, className }) {
	function adjustHeight(element) {
		element.style.height = "48px";
		element.style.height = `${element.scrollHeight}px`;
	}

	return (
		<>
			{!error ? (
				<>
					{user?.success[0].avatar ? (
						<img
							loading='lazy'
							className='rounded-full min-w-12 object-cover bg-center w-12 h-12'
							src={`${cdn}/avatars/${user?.success[0]?.avatar}`}
						/>
					) : (
						<PixelAvatar size={48} username={user?.success[0]?.username} pixels={user?.success[0]?.pixel_order} />
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
					if (e.target.scrollHeight > e.target.offsetHeight) adjustHeight(e.target);
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
