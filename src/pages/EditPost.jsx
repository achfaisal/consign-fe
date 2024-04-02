import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { ...posts } = location.state ?? {};
  const images = posts.image;
  console.log(posts.id);

  const [image, setImage] = useState([]);
  const [updatedImage, setUpdatedImage] = useState(images);
  const [initialValues] = useState({
    title: posts.title,
    price: posts.price,
    description: posts.description,
  });
  const [title, setTitle] = useState(initialValues.title);
  const [price, setPrice] = useState(initialValues.price);
  const [description, setDescription] = useState(initialValues.description);

  const handleDeleteImage = async (index) => {
    try {
      const response = await axios.delete(
        "http://localhost:9002/post/deleteImage",
        {
          data: {
            id: posts.id,
            imageIndex: index,
          },
        }
      );
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = [];

    // Iterate through each selected file and add it to the selectedImages array
    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);
    }

    // Set the state with the selectedImages array
    setImage(selectedImages);
  };

  console.log("selectedImages:", image);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", parseInt(price));
    formData.append("description", description);
    formData.append("id", posts.id);
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("image", image[i]);
    // }

    // Append each image file to the formData

    try {
      const response = await axios.put(
        "http://localhost:9002/post/update",
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      console.log(response);
      // navigate("/my-posts");
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-16">
      <form onSubmit={submitForm}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">Gambar</label>

        <button className=" btn btn-info" type="submit">
          Submit
        </button>
      </form>

      <div className="flex">
        {[...Array(3)].map((_, index) => {
          if (index < updatedImage.length) {
            return (
              <div key={index} className="relative">
                <img
                  className={`w-48 mr-2 cursor-pointer`}
                  src={`http://localhost:9002/${updatedImage[index]}`}
                  alt=""
                  onClick={() => {
                    console.log(
                      `Clicked image: Index at : ${index}, Url : ${updatedImage[index]}`
                    );
                  }}
                />
                <button
                  className="absolute top-0 right-0 text-red-600 p-2 bg-red-100"
                  onClick={() => handleDeleteImage(index)}
                >
                  Delete
                </button>
              </div>
            );
          } else {
            return (
              <div key={index}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default EditPost;
