import api from "@/constants/api";

export default function (comments, id, postId, likes, liked, mutate) {
    const commentsLocal = comments;
    const comment = commentsLocal.find(comment => comment?.id === id);
    const commentIndex = commentsLocal.indexOf(comment);
    const commentPage =  [...Array(Math.ceil(commentsLocal?.length / 12)).keys()].map(key => key + 1).find(key => commentIndex < key * 12)
    commentsLocal[commentIndex].likes = likes;
    commentsLocal[commentIndex].liked = liked;
    mutate(`${api.v1}/comment/get?post_id=${postId}&page=${commentPage}`);
    return commentsLocal;
}