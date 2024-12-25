import api from "@/constants/api";

export default function (comments, id, likes, liked) {
    const commentsLocal = comments;
    const comment = commentsLocal.find(comment => comment?.id === id);
    const commentIndex = commentsLocal.indexOf(comment);
    commentsLocal[commentIndex].likes = likes;
    commentsLocal[commentIndex].liked = liked;
    return commentsLocal;
}