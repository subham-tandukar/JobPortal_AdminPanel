import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { editPage, pageInfo, pageList } from "../../../redux/Page/pageApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/Page/pageSlice";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import { formats, modules } from "../../../components/hooks/hook";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPage = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { pageData, loading, error, success } = useSelector(
    (state) => state.page
  );
  const dataInfo = pageData && pageData?.Values && pageData?.Values[0];

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

  useEffect(() => {
    if (dataInfo) {
      setFormValue({
        Title: dataInfo.Title,
      });
      setDescription(dataInfo.Description);
    }
  }, [dataInfo]);

  useEffect(() => {
    const dataform = {
      FLAG: "SI",
      PageID: params.id,
    };
    dispatch(pageInfo(dataform));
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataform = {
      ...formValue,
      FLAG: "U",
      PageID: params.id,
      Description: Description,
    };
    dispatch(editPage(dataform));
  };

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
    };
    if (success) {
      toast.success("Page updated successfully", {
        theme: "light",
      });
      navigate("/page-list");
      dispatch(pageList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Update Page" />

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
              {loading ? <span>Please wait ...</span> : <span>Update</span>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPage;
