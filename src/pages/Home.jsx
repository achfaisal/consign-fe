/* eslint-disable react/prop-types */
import Card from "../components/Card";

function Home({ posts }) {
  return (
    <div className="container mx-auto px-4">
      <div className="mt-20 mb-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.image}
            id={post.id}
            price={post.price}
            userId={post.userId}
            availability={post.isAvailable}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
