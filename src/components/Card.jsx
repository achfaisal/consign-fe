import { Link } from "react-router-dom";
import BadgeSold from "./BadgeSold";
import BadgeAvailable from "./BadgeAvailable";
import formatPrice from "./FormatPrice";

// eslint-disable-next-line react/prop-types
const Card = ({ title, image, id, price, availability }) => {
  const formattedPrice = formatPrice(price);

  // Todo : Map image array into link
  return (
    <Link
      to={`/post/${id}`}
      className="card bg-base-100 shadow hover:shadow-xl h-80"
    >
      <figure>
        <img
          className="h-80 min-w-full object-cover"
          src={
            image
              ? `http://localhost:9002/${image[0]}`
              : "/images/placeholder.svg"
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body h-64 p-4">
        <h1 className="card-title font-normal">{title}</h1>

        <p className=" text-lg font-medium">{formattedPrice}</p>
        {availability ? <BadgeAvailable /> : <BadgeSold />}
      </div>
    </Link>
  );
};

export default Card;
