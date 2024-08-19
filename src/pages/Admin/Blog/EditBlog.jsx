import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { blogInfo, editBlog, blogList } from "../../../redux/Blog/blogApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/Blog/blogSlice";
import { categoryList } from "../../../redux/Category/categoryApi";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import { formats, modules } from "../../../components/hooks/hook";
import MySelect from "../../../components/MySelect";
import MyImageUploader from "../../../components/MyImageUploader";

const EditBlog = () => {
  const params = useParams();
  const { userDetail } = useSelector((state) => state.auth);

  const { category } = useSelector((state) => state.category);

  const { loading, error, success, blog } = useSelector((state) => state.blog);

  const userInfo = (userDetail && userDetail.Values) || [];

  const categoryData = (category && category?.Values) || [];

  const dropDownValue = categoryData.map((item) => ({
    value: item._id,
    label: item.Category,
  }));

  const dataInfo = blog && blog?.Values && blog?.Values[0];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValue = {
    Title: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [Image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [IsUploaded, setIsUploaded] = useState(false);
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState(null);
  const [IsActive, setIsActive] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (dataInfo) {
      const baseFilename =
        (dataInfo.Image && dataInfo.Image.split("/")[5]) || "";
      const realFilename = (baseFilename && baseFilename.split("_")[2]) || "";

      const selectedCategory = categoryData.filter(
        (item) => item._id === dataInfo.Category._id
      );
      const dropdownCategory = {
        value: selectedCategory[0]?._id,
        label: selectedCategory[0]?.Category,
      };
      setFormValue({
        Title: dataInfo.Title,
        Category: dataInfo.Category._id,
      });

      setImage(dataInfo.Image);
      setFilename(realFilename);
      setIsUploaded(true);
      setDescription(dataInfo.Description);
      setCategory(dropdownCategory);
      setIsActive(dataInfo.Status === "A" ? true : false);
    }
  }, [dataInfo]);

  useEffect(() => {
    const dataform = {
      FLAG: "SI",
      BlogID: params.id,
    };
    dispatch(blogInfo(dataform));
  }, [params]);

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("FLAG", "U");
    formData.append("Auther", userInfo && userInfo.Id);
    formData.append("Title", formValue.Title);
    formData.append("Description", Description);
    formData.append("Category", (Category && Category?.value) || "");
    formData.append("Status", IsActive ? "A" : "I");
    formData.append("BlogID", params.id);
    if (file) {
      formData.append("Image", file);
    } else {
      formData.append("Image", Image);
    }

    e.preventDefault();
    dispatch(editBlog(formData));
  };

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "A",
    };
    dispatch(categoryList(dataForm));
  }, []);

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "",
      Category: "",
    };
    if (success) {
      setFormValue(initialValue);
      toast.success("Blog updated successfully", {
        theme: "light",
      });
      navigate("/blog-list");
      setDescription("");
      setIsUploaded(false);
      setImage(null);
      setIsActive(true);
      dispatch(blogList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Update Blog" />

      <Error error={error} />

      {loading ? (
        <Loading />
      ) : (
        <div className="th-card mt-5">
          <form>
            <div className="grid grid-cols-2 gap-5 ">
              <div className="th-form">
                <label htmlFor="Title">
                  Title<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="Title"
                  value={formValue.Title}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Title"
                  placeholder="Title"
                  required
                />
              </div>

              <div className="th-form">
                <label htmlFor="Category">
                  Select Category<sup>*</sup>
                </label>
                <MySelect
                  dropDownValue={dropDownValue}
                  value={Category}
                  onChange={setCategory}
                  placeholder="Category"
                />
              </div>

              <div className="th-form col-span-2">
                <label htmlFor="Description">
                  Description<sup>*</sup>
                </label>

                <ReactQuill
                  id="Description"
                  modules={modules}
                  formats={formats}
                  value={Description}
                  onChange={setDescription}
                />
              </div>
              <div className="th-form">
                <label>Image</label>

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

export default EditBlog;
