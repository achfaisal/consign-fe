import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UserPosts = ({ username, isLoggedIn }) => {
  const navigate = useNavigate();

  const [filteredPost, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9002/posts/all");
        const posts = response.data.data;
        if (username) {
          const userPosts = posts.filter((post) => post.userId === username);
          setFilteredPosts(userPosts);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [navigate, username]);

  return (
    <div className="container mx-auto px-4">
      <div className="mt-20 overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className=" min-w-64">Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredPost.map((post, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td className="min-w-64">{post.title}</td>
                <td>
                  <p className="line-clamp-2">{post.description}</p>
                </td>
                <td>{post.price}</td>
                <td>{post.isAvailable ? "Available" : "Sold"}</td>
                <td>
                  <Link
                    to="/edit-post"
                    className="btn btn-ghost btn-xs"
                    state={{
                      ...post,
                    }}
                  >
                    edit
                  </Link>
                  <button className="btn btn-ghost btn-xs text-red-600">
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPosts;
