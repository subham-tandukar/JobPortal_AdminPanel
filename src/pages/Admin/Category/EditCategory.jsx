import React, { useContext, useEffect, useState } from "react";
import { Fetchdata } from "../../../components/hooks/getData";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  editCategory,
  categoryInfo,
  categoryList,
} from "../../../redux/Category/categoryApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/Category/categorySlice";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
const EditCategory = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { category, loading, error, success } = useSelector(
    (state) => state.category
  );
  const dataInfo = category && category?.Values && category?.Values[0];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValue = {
    Category: "",
  };

  const [formValue, setFormValue] = useState(initialValue);

  const [IsActive, setIsActive] = useState(true);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  useEffect(() => {
    if (dataInfo) {
      setFormValue({
        Category: dataInfo.Category,
      });
      setIsActive(dataInfo.Status === "A" ? true : false);
    }
  }, [dataInfo]);

  useEffect(() => {
    const dataform = {
      FLAG: "SI",
      CategoryID: params.id,
    };
    dispatch(categoryInfo(dataform));
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataform = {
      ...formValue,
      FLAG: "U",
      CategoryID: params.id,
      Status: IsActive ? "A" : "I",
    };
    dispatch(editCategory(dataform));
  };

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "",
    };
    if (success) {
      toast.success("Category updated successfully", {
        theme: "light",
      });
      navigate("/category-list");
      dispatch(categoryList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Update Category" />

      <Error error={error} />

      {loading ? (
        <Loading />
      ) : (
        <div className="th-card mt-5">
          <form>
            <div className="grid grid-cols-2 gap-5 ">
              <div className="th-form">
                <label htmlFor="Category">
                  Category<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="Category"
                  value={formValue.Category}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Category"
                  placeholder="Category"
                  required
                />
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

export default EditCategory;
