import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const NewPostModal = ({ message, setMessage }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", parseInt(price));
    formData.append("description", description);

    // Append each image file to the formData
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:9002/post",
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      console.log(response);

      document.getElementById("my_modal_5").close();
      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.error);
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
  return (
    <>
      <form method="dialog" onSubmit={submitForm}>
        <div
          role="alert"
          className={`alert alert-error mt-4 text-white ${
            message ? "" : "hidden"
          } `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
        </div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Deskripsi akun"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text">Pick a file</span>
          </div>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => {
              const files = e.target.files;
              if (files.length > 3) {
                // If more than 3 files are selected, clear the input
                e.target.value = null;
                // Optionally, you can display an error message to the user
                setMessage("Maximum 3 images are allowed");

                return;
              }
              handleImageChange(e);
            }}
            multiple
            // accept="image/*"
            required
          />
        </label>

        <button className=" btn btn-info" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default NewPostModal;
