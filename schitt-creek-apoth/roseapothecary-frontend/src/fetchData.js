import { useState, useEffect } from "react";
import axios from "axios"; // Import the Axios library

const FetchApi = () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

  // State to hold fetched data
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    // Fetch data using Promise with Axios
    const fetchUsingPromiseWithAxios = () => {
      axios
        .get(BASE_URL) // Fetch data based on the current page
        .then(({ data }) => {
          setPosts(data); // Set the fetched data
        });
    };

    // Trigger fetching method on component mount
    fetchUsingPromiseWithAxios();

  }, []); // Run the effect only once on component mount

  return (
    <div className="container">
      <h1>Fetching Data in React</h1>

      {/* Display the fetched data */}
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchApi;