import api from "@/constants/api";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import Reaction from "./reaction";
import { useState, useEffect } from "react";
import mutateData from "@/lib/utils/mutateData";

export default function Reactions({ token, mutate }) {
    const [page, setPage] = useState(1);
    const [reactions, setReactions] = useState([]);

    const swrKey = `${api.v1}/reactions/users/get?page=${page}`;

    const {
        data: reactionsRequest,
        isError,
        isLoading,
    } = useSWR(swrKey, async url => await fetcher(url, "get", null, { Authorization: "Bearer " + token }));

    useEffect(() => {
        if (reactionsRequest?.success && !isError) {
            setReactions(prev => [...prev, ...reactionsRequest?.success]);
        }
    }, [reactionsRequest]);

    useEffect(() => mutateData(swrKey, mutate, token), [swrKey]);

    if (isError) return <>Error</>;
    if (isLoading) return <>Loading</>;

    return reactions?.length > 0 ? (
        <InfiniteScroll
            hasMore={reactions?.length < Number(reactionsRequest?.count)}
            next={() => setPage(prev => prev + 1)}
            scrollableTarget='profileScroll'
            dataLength={reactions?.length}
            className='grid grid-cols-3 h-fit gap-5'
        >
            {reactions?.map((reaction, index) => (
                <Reaction key={index} reaction={reaction.name} post={reaction.post} />
            ))}
        </InfiniteScroll>
    ) : null
}