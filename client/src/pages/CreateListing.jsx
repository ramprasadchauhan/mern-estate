import { useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload 6 images per listing");
      setUploading(false);
    }
  };
  console.log(formData);
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done `);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="border p-3"
            maxLength={60}
            minLength={10}
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            id="description"
            className="border p-3"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="border p-3"
            required
          />
          <div className="flex gap-5 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" className="w-5" id="sale" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-1 items-center">
              <input
                type="number"
                id="badrooms"
                max="10"
                min="1"
                required
                className="p-2 border border-gray-300 rounded-lg "
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                id="bathrooms"
                max="10"
                min="1"
                required
                className="p-2 border border-gray-300 rounded-lg "
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                id="regularPrice"
                max="10"
                min="1"
                required
                className="p-2 border border-gray-300 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xm">($ / month) </span>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                id="discountPrice"
                max="10"
                min="1"
                required
                className="p-2 border border-gray-300 rounded-lg "
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xm">($ / month) </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 gap-4 flex-col">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={uploading}
              type="button"
              onClick={handleImageSubmit}
              className=" p-3 text-green-700 border border-green-700 uppercase hover:shadow-lg rounded disabled:opacity-80"
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
          <p className="text-red-600 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                className="flex justify-between p-3 items-center border"
                key={url}
              >
                <img
                  src={url}
                  className="w-20 h-20 object-contain rounded-lg"
                  alt="listing image"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-85 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="rounded-tl-md rounded-br-md w-full  text-center p-3 bg-gradient-to-r from-indigo-400 to-pink-500  text-white uppercase hover:opacity-95 hover:shadow-lg disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
