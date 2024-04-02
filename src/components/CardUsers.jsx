import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const CardUsers = ({ title, description }) => {
  // const handleEditClick = () => {
  //   console.log(id);
  // };

  return (
    <div className="card sm:card-side bg-base-100 border mb-6">
      <figure>
        <img
          className="w-full h-60 object-cover"
          src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link
            className="btn btn-outline"
            to="/edit-post"
            state={{ title: title, description: description }}
          >
            Edit post
          </Link>

          <button className="btn btn-error text-white">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default CardUsers;
