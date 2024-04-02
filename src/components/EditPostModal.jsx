const EditPostModal = () => {
  return (
    <form onSubmit={submitForm}>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value=""
          onChange=""
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
          value=""
          onChange=""
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
          onChange={handleImageChange}
        />
      </label>

      <button className=" btn btn-info" type="submit" onClick={submitForm}>
        Submit
      </button>
    </form>
  );
};

export default EditPostModal;
