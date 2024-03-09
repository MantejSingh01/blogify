import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateNewPostMutation,
  useUpdatePostMutation,
} from "../../reduxToolKit/BlogSlice"; // Import the update post mutation
import { getAllBlogsSuccess } from "../../reduxToolKit/BlogSlice";

const CreatePost = ({ post, isEditing, onClose }) => {
  // Receive post data and isEditing prop
  let location = useLocation();
  let path = location.pathname;
  console.log(onClose, "klklm");
  const currentPosts = useSelector((state) => state.blog.allBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false); // Open modal by default
  const [editorHtml, setEditorHtml] = useState(post ? post.summary : ""); // Set initial editor content to post summary if editing
  const [title, setTitle] = useState(post ? post.title : ""); // Set initial title to post title if editing
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createNewPost] = useCreateNewPostMutation();
  const [updatePost] = useUpdatePostMutation(); // Initialize update post mutation
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike"], // Text formatting options
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
  const handleCreatePost = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (isEditing) {
      onClose(); // Close modal and reset state in parent component
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // If editing, update the post
        const response = await updatePost({
          blogId: post.id, // Pass blogId for updating existing post
          title: title,
          summary: editorHtml,
        });
        const updatedPosts = currentPosts.map((item) =>
          item.id === post.id ? response.data.data : item
        );

        // Dispatch an action to update the store with the updated list of posts
        dispatch(getAllBlogsSuccess(updatedPosts));

        onClose();
      } else {
        // If creating new post
        const response = await createNewPost({
          title: title,
          summary: editorHtml,
          author: user?.data.name,
          userId: user?.data.id,
        });
        console.log(response.data, "=============");

        // Append the new post to the current list of posts
        const updatedPosts = [...currentPosts, response.data.data];
        setTitle("");
        setEditorHtml("");
        // Dispatch an action to update the store with the updated list of posts
        dispatch(getAllBlogsSuccess(updatedPosts));
      }
      setIsModalOpen(false); // Close the modal after successful submission
    } catch (error) {
      console.error("Error creating/editing post:", error);
    }
  };

  return (
    <>
      {path === "/" && ( // Add path check
        <div className="container flex justify-end mr-4 relative">
          <button
            className="bg-customPurple text-white rounded-full shadow-md right-1 border-solid mt-4 px-14 py-4"
            onClick={handleCreatePost}
          >
            Create Post
          </button>
        </div>
      )}
      {(isModalOpen || isEditing) && (
        <div className="fixed-overlay  fixed inset-0 flex items-center justify-center h-screen overflow-hidden bg-black bg-opacity-50 z-50 ">
          <div className="bg-white p-6 rounded-lg relative">
            <button
              className="absolute top-0 left-2 mt-2 text-black p-1 text-xl hover:bg-gray-800 hover:text-white hover:underline "
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Post" : "Create Post"}
            </h2>
            <form
              className="flex flex-col justify-start items-start"
              onSubmit={handleSubmit}
            >
              <div className="  mb-4">
                <label className="flex mb-2 text-gray-700 ">Title:</label>
                <input
                  className="border border-gray-400 px-3 py-2 rounded-lg w-full"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4 ">
                <label className=" flex mb-2 text-gray-700">Summary:</label>

                <ReactQuill
                  className=" h-32"
                  theme="snow"
                  value={editorHtml}
                  onChange={handleChange}
                  modules={modules}
                  formats={formats}
                />
              </div>
              <button
                className="bg-gradient-to-r from-customPink to-customPurple text-white px-4 py-2 rounded-lg mt-16"
                type="submit"
              >
                {isEditing ? "Save" : "Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
