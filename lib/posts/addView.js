import api from "@/constants/api";
import { fetcher } from "../utils";

export default async function addView (post, token) {
    const viewForm = new FormData();
    viewForm.append("post_id", post?.id);
    return await fetcher(api.v1 + "/post/view", "post", viewForm, { "Authorization": "Bearer " + token })
}