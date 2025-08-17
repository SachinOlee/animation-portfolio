import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function BlogSection() {
  // Load posts from localStorage on component mount
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("blogPosts");
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
    // Default posts if no saved posts exist
    return [
      {
        id: 1,
        title: "Getting Started with React Animation",
        content:
          "Learn how to create smooth animations in React using Framer Motion and GSAP...",
        image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500",
        date: "2024-01-15",
        author: "Sachin Oli",
      },
      {
        id: 2,
        title: "Building Modern Portfolios",
        content:
          "Discover the best practices for creating stunning portfolio websites that stand out...",
        image:
          "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500",
        date: "2024-01-10",
        author: "Sachin Oli",
      },
    ];
  });

  const [isWriting, setIsWriting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  // Function to save posts to localStorage
  const savePostsToStorage = (updatedPosts) => {
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  // Auto-save posts whenever they change
  useEffect(() => {
    savePostsToStorage(posts);
  }, [posts]);

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        image:
          newPost.image ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
        date: new Date().toISOString().split("T")[0],
        author: "Sachin Oli",
      };
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      setNewPost({ title: "", content: "", image: "" });
      setIsWriting(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      image: post.image,
    });
    setIsWriting(true);
  };

  const handleUpdatePost = () => {
    if (editingPost && newPost.title && newPost.content) {
      const updatedPosts = posts.map((post) =>
        post.id === editingPost.id
          ? {
              ...post,
              title: newPost.title,
              content: newPost.content,
              image: newPost.image || post.image, // Keep original image if no new image
            }
          : post
      );
      setPosts(updatedPosts);
      setNewPost({ title: "", content: "", image: "" });
      setEditingPost(null);
      setIsWriting(false);
    }
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPost((prevPost) => ({ ...prevPost, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
    // Clear the file input
    event.target.value = "";
  };

  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Blog</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Share your thoughts, tutorials, and insights about web development
            and design.
          </p>
        </motion.div>

        {/* Write New Post Button */}
        <div className="text-center mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsWriting(true)}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write New Post
          </motion.button>
        </div>

        {/* Write/Edit Form */}
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingPost ? "Edit Post" : "Write New Post"}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Write your post content..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Image
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    Upload Media
                  </button>
                  <input
                    type="url"
                    value={newPost.image}
                    onChange={(e) =>
                      setNewPost({ ...newPost, image: e.target.value })
                    }
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Or enter image URL..."
                  />
                </div>
                {newPost.image && (
                  <div className="mt-4">
                    <img
                      src={newPost.image}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={editingPost ? handleUpdatePost : handleAddPost}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingPost ? "Update Post" : "Publish Post"}
                </button>
                <button
                  onClick={() => {
                    setIsWriting(false);
                    setEditingPost(null);
                    setNewPost({ title: "", content: "", image: "" });
                  }}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditPost(post)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {post.content}
                </p>

                <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Read More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
