import usernameRegex from "@/constants/regex/usernameRegex";

export default {
    avatar: file => file.size > 3000000 ? "Avatar size should not exceed 3 MB." : null,
    banner: file => file.size > 3000000 ? "Banner size should not exceed 3 MB." : null,
    username: word => !usernameRegex.test(word) ? "The username must consist of Latin characters and numbers." : null,
    nickname: text => text.length > 24 ? "Nickname must not exceed 24 characters in length" : null
};