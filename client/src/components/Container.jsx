import React, { useState, useEffect } from "react";
import {
    getAllBlogsFailure,
    getAllBlogsSuccess,
    useGetBlogPostsMutation,
} from "../reduxToolKit/BlogSlice";
import Shimmer from "./feature-components/Shimmer";
import ErrorComponent from "./feature-components/ErrorComponent";
import { useDispatch, useSelector } from "react-redux";

const Container = () => {
    const posts = useSelector(state => state.blog.allBlogs);
    const [getBlogPosts, { data, error, isLoading, isError }] =useGetBlogPostsMutation();
    const [limit] = useState(20); // Number of items per page
    const [page, setPage] = useState(0); // Current page
    const [endOfData, setEndOfData] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        loadBlogPosts();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page]);

    async function loadBlogPosts() {
        try {
            const { data } = await getBlogPosts({ limit, page });
            if (data.data.blogData.length !== 0) {
                dispatch(getAllBlogsSuccess([...posts, ...data.data.blogData]));
            } else {
                setEndOfData(true);
            }
        } catch (error) {
            dispatch(getAllBlogsFailure(error.message));
        }
    }

    function handleScroll() {
        if (!endOfData && window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100) {
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        // Debounce the scroll event
        const debouncedHandleScroll = debounce(handleScroll, 200);
        window.addEventListener("scroll", debouncedHandleScroll);
        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [endOfData]); // Only re-run effect if endOfData changes

    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    return (
        <div className="z-10 px-28 py-4 relative ">
            {isLoading && <Shimmer></Shimmer>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
                {isError && <ErrorComponent message={error?.data?.message ? error?.data?.message : "error"} />}

                {posts && posts.length > 0 ? (
                    posts.map((item, index) => (
                        <div key={item.id+index} className="bg-white rounded-lg p-4 shadow-md">
                            <h2 className="text-xl font-semibold truncate">{item.title}</h2>
                            <div
                                className="mt-2 text-left line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: item.summary }}
                            ></div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full absolute  top-0 left-0 right-0 bottom-0 ">
                        <div className="text-center">
                            <h2 className="text-3xl font-semibold text-white mb-4">Oops!</h2>
                            <p className="text-lg text-white ">
                                It seems there are no posts to show right now.
                            </p>
                            <p className="text-lg text-white ">
                                Check back later for updates or create your own post!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Container;
