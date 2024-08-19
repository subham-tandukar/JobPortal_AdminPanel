import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addPage, pageList } from "../../../redux/Page/pageApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/Page/pageSlice";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import { formats, modules } from "../../../components/hooks/hook";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.page);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValue = {
    Title: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [Description, setDescription] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    const dataform = {
      ...formValue,
      FLAG: "I",
      Description: Description,
    };
    e.preventDefault();
    dispatch(addPage(dataform));
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
    };
    if (success) {
      setFormValue(initialValue);
      toast.success("Page created successfully", {
        theme: "light",
      });
      navigate("/page-list");
      setDescription("");
      dispatch(pageList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Add Page" />

      <Error error={error} />

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
          </div>

          <button
            type="submit"
            className="th-btn  mt-5"
            onClick={handleSubmit}
            disabled={loading ? true : false}
          >
            {loading ? <span>Please wait ...</span> : <span>Submit</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
