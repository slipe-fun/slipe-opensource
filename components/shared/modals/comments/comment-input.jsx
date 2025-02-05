import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PixelAvatar from "../../pixels-avatar";
import Svg from "@/components/ui/icons/svg";
import cdn from "@/constants/cdn";
import icons from "@/components/ui/icons/icons";
import { AdjustHeight, cn } from "@/lib/utils";
import Img from "@/components/ui/image";

export default function CommentInput({ error, user, setInputFocus, commentText, setCommentText, sendComment, isButtonLoading, className }) {
	return (
		<>
			{!error ? (
				<>
					{user?.avatar ? (
						<Img
							wrapperClassName='rounded-full min-w-12 h-12'
							src={`${cdn}/avatars/${user?.avatar}`}
							className="object-cover bg-center"
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
			<Button disabled={isButtonLoading} size='icon' className='rounded-full min-w-12 w-12 h-12' onClick={sendComment}>
				<Svg className='!w-7 !h-7' icon={icons["paperPlane"]} />
			</Button>
		</>
	);
}
