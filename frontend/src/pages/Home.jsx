import { useState, useEffect } from "react";
function Home(){
  const [post, setPost] = useState(null);
  // useEffect to fetch posts when the component mounts
useEffect(() => {
  const fetchPost = async () => {
    try {
      // API request to get posts
      const res = await fetch("/api/post/get-posts", {
        method: "GET",
      });

      // Convert response to JSON
      const result = await res.json();

      // Update state with fetched posts
      setPost(result?.data?.allPosts);
    } catch (error) {
      // Handle errors during fetch
      console.log("error while fetching post", error);
      return;
    }
  };

  fetchPost(); // Call function once component loads
}, []); // Empty dependency array ensures it runs only once (on mount)


return (
  <div className="min-h-screen bg-gray-400">
    <div className="container mx-auto px-4 py-6">
      {/* If posts exist, display them in a grid layout */}
      {post && post.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {post.map((post, index) => (
            <div
              key={index} // Unique key for React list rendering
              className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition"
            >
              {/* Display post image if available */}
              {post?.postImage && (
                <img
                  src={post.postImage}
                  alt={post.title}
                  className="w-full h-70 object-cover"
                />
              )}
              <div className="p-4">
                <h1 className="font-bold text-lg">{post.title}</h1>
                <p className="text-gray-600">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h1 className="font-bold text-lg">
            No Posts Found
            </h1>
          
        </div>
      )}
    </div>
  </div>
);
}

export default Home;