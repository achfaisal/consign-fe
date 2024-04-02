import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:9002/posts/all`);
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => post.id === Number(id));
  console.log("Filtered Post", filteredPosts);

  return (
    <div className="mt-16">
      {filteredPosts.length > 0 && (
        <>
          <div className="container mx-auto px-4">
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  <a>Tes</a>
                </li>
                <li>
                  <a>Akun</a>
                </li>
                <li>Add Document</li>
              </ul>
            </div>
            <div className=" grid-cols-1 sm:grid-cols-2 grid gap-16">
              <div
                className="bg-center bg-no-repeat bg-cover items-center flex justify-center rounded-3xl"
                style={{
                  backgroundImage: "url('/images/picture-lake.jpeg')",
                }}
              >
                <div className="bg-white bg-opacity-40 backdrop-blur-lg w-full rounded-3xl">
                  <img
                    className="mx-auto max-h-96 object-cover"
                    src={
                      filteredPosts[0].image
                        ? `http://localhost:9002/${filteredPosts[0].image[0]}`
                        : "/images/placeholder.svg"
                    }
                    alt=""
                  />
                </div>
              </div>

              <div>
                <h1>{filteredPosts[0].title}</h1>
                <p className="whitespace-pre-line">
                  {filteredPosts[0].description}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
