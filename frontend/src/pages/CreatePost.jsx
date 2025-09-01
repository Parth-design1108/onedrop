import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  // state variables to store form data
  const [title, setTitle] = useState("");          // blog title
  const [content, setContent] = useState("");      // blog content
  const [postImage, setPostImage] = useState(null); // blog image
  const navigate = useNavigate();                 // for navigation after success

  // function to handle form submission
  const handleForm = async (e) => {
    try {
      e.preventDefault(); // prevent default page reload on form submit

      // create FormData object to send text + image
      let data = new FormData();
      data.append("title", title);
      data.append("content", content);
      data.append("postImage", postImage);

      // validation check for empty fields
      if (!title || !content) {
        alert("title or content required");
        return;
      }

      // send data to backend API
      const res = await fetch("/api/post/create-post", {
        method: "POST",
        body: data,
      });

      // check if request failed
      if (!res.ok) {
        console.log("error while getting response");
        return;
      }

      // parse response
      const result = await res.json();
          // show success message
    alert("Blog created Successfully!");
    // redirect user to homepage
    navigate("/");
  } catch (error) {
    // error handling
    console.log(error);
    alert("Blog creation process Failed !!");
  }
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
    {/* Blog Creation Form */}
    <form
      className="bg-white p-4 sm:p-6 space-y-3 sm:space-y-4 border-2 rounded-2xl
      text-sm sm:text-base md:text-lg lg:text-3xl 
      w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl"
      onSubmit={handleForm}
    >
      {/* Form Heading */}
      <h2 className="font-bold text-center text-base sm:text-lg md:text-xl lg:text-2xl">
        Create a blog
      </h2>

      {/* Input for Blog Title */}
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
        required
      />

      {/* Input for Blog Content */}
      <input
        type="text"
        name="content"
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 sm:p-3 md:p-4 border rounded text-sm sm:text-base md:text-lg lg:text-xl"
        required
      />
          {/* File Input for Blog Image */}
    <input
      type="file"
      name="postImage"
      accept="image/*"
      onChange={(e) => setPostImage(e.target.files[0])}
      className="w-full border rounded p-2 sm:p-3 md:p-4 text-sm sm:text-base lg:text-xl"
      required
    />

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-purple-600 text-white py-1 sm:py-2 md:py-3 
      rounded hover:bg-blue-600 text-sm sm:text-base md:text-lg lg:text-xl"
    >
      Create
    </button>
  </form>
</div>
);
}

export default CreatePost;
