import React, { useState, useEffect } from "react";
import {
  getAllBlogsSuccess, useUpdatePostMutation,
} from "../../reduxToolKit/BlogSlice";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost";

const MyPosts = () => {
  const posts = useSelector((state) => state.blog.allBlogs);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPostData, setEditPostData] = useState(null); // State to store post data for editing
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updatePost] = useUpdatePostMutation(); // Initialize update post mutation


  useEffect(() => {
    if (posts) {
      const userPostsData = posts.filter(
        (item) => item.userId === user?.data.id
      );

      setUserPosts(userPostsData);
    }
  }, [posts, user]);
  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditModalOpen]);

  const onClose = () => {
    setIsEditModalOpen(false);
    setIsEditing(false);
    setEditPostData(null); // Reset edit post data
  };
  const handleEdit = (postId) => {
    const postToEdit = userPosts.find((item) => item.id === postId);
    setEditPostData(postToEdit); // Set post data to be edited
    setIsEditModalOpen(true);
    setIsEditing(true);
  };

  const handleDelete = async (postId) => {
    try {
      await updatePost({
        blogId: postId, // Pass blogId for updating existing post
        isDeleted: true
      });
  
      // Filter out the deleted post from the current list of posts
      const updatedPosts = posts.filter((item) => item.id !== postId);
  
      // Dispatch an action to update the store with the updated list of posts
      dispatch(getAllBlogsSuccess(updatedPosts));
      setUserPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
      
    }
  };

  return (
    <div className="z-10 px-28 py-4 relative ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userPosts.length> 0? userPosts.map((item, index) => (
          <div
            key={item.id + index}
            className="bg-white rounded-lg p-4 shadow-md"
          >
            <h2 className="text-xl font-semibold truncate">{item.title}</h2>
            <div
              className="mt-2 text-left line-clamp-3"
              dangerouslySetInnerHTML={{ __html: item.summary }}
            ></div>{" "}
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-customPurple text-white rounded hover:bg-blue-600"
                onClick={() => handleEdit(item.id)} // Edit button click
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(item.id)} // Delete button click
              >
                Delete
              </button>
            </div>
          </div>
        )):(
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
      {isEditModalOpen && (
        <CreatePost
          post={editPostData} // Pass post data to be edited
          isEditing={isEditing}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default React.memo(MyPosts);
