import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import {
  advertisementInfo,
  editAdvertisement,
  advertisementList,
} from "../../../redux/Advertisement/advertisementApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/Advertisement/advertisementSlice";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import MyImageUploader from "../../../components/MyImageUploader";

const EditAdvertisement = () => {
  const params = useParams();

  const { loading, error, success, advertisement } = useSelector(
    (state) => state.advertisement
  );

  const dataInfo =
    advertisement && advertisement?.Values && advertisement.Values[0];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValue = {
    Position: "",
    Link: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [Image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [IsUploaded, setIsUploaded] = useState(false);
  const [IsActive, setIsActive] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    if (dataInfo) {
      const baseFilename =
        (dataInfo.Image && dataInfo.Image.split("/")[5]) || "";
      const realFilename = (baseFilename && baseFilename.split("_")[2]) || "";

      setFormValue({
        Position: dataInfo.Position,
        Link: dataInfo.Link,
      });

      setImage(dataInfo.Image);
      setFilename(realFilename);
      setIsUploaded(true);
      setIsActive(dataInfo.Status === "A" ? true : false);
    }
  }, [dataInfo]);

  useEffect(() => {
    const dataform = {
      FLAG: "SI",
      AdvertisementID: params.id,
    };
    dispatch(advertisementInfo(dataform));
  }, [params]);

  const handleSubmit = (e) => {
    const dataform = {
      ...formValue,
      FLAG: "U",
      Status: IsActive ? "A" : "I",
      AdvertisementID: params.id,
      Image: Image,
    };

    const formData = new FormData();
    formData.append("FLAG", "U");
    formData.append("Link", formValue.Link);
    formData.append("Position", formValue.Position);
    formData.append("Status", IsActive ? "A" : "I");
    formData.append("AdvertisementID", params.id);
    if (file) {
      formData.append("Image", file);
    } else {
      formData.append("Image", Image);
    }

    e.preventDefault();
    dispatch(editAdvertisement(formData));
  };

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "",
    };
    if (success) {
      setFormValue(initialValue);
      toast.success("Advertisement updated successfully", {
        theme: "light",
      });
      navigate("/advertisement-list");
      setIsUploaded(false);
      setImage(null);
      setIsActive(true);
      dispatch(advertisementList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Update Advertisement" />

      <Error error={error} />

      {loading ? (
        <Loading />
      ) : (
        <div className="th-card mt-5">
          <form>
            <div className="grid grid-cols-2 gap-5 ">
              <div className="th-form">
                <label htmlFor="Position">
                  Position<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="Position"
                  value={formValue.Position}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Position"
                  placeholder="Position"
                  required
                />
              </div>

              <div className="th-form">
                <label htmlFor="Link">
                  Link<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="Link"
                  value={formValue.Link}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Link"
                  placeholder="Link"
                  required
                />
              </div>

              <div className="th-form">
                <label>
                  Image<sup>*</sup>
                </label>

                <div>
                  <MyImageUploader
                    Image={Image}
                    setImage={setImage}
                    IsUploaded={IsUploaded}
                    setIsUploaded={setIsUploaded}
                    setFile={setFile}
                    filename={filename}
                    setFilename={setFilename}
                  />
                </div>
              </div>

              <div className="th-form col-span-2 flex gap-10">
                <div className="th-checkbox">
                  <input
                    type="checkbox"
                    name="IsActive"
                    checked={IsActive}
                    onChange={() => setIsActive(!IsActive)}
                    id="IsActive"
                    className="!w-auto"
                  />
                  <label className="!m-0" htmlFor="IsActive">
                    Active
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="th-btn  mt-5"
              onClick={handleSubmit}
              disabled={loading ? true : false}
            >
              {loading ? <span>Please wait ...</span> : <span>Update</span>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditAdvertisement;
