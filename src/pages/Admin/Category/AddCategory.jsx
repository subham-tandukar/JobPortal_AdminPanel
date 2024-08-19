import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addCategory, categoryList } from "../../../redux/Category/categoryApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/Category/categorySlice";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
const AddCategory = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.category);

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

  const handleSubmit = (e) => {
    const dataform = {
      ...formValue,
      FLAG: "I",
      Status: IsActive ? "A" : "I",
    };
    e.preventDefault();
    dispatch(addCategory(dataform));
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "",
    };
    if (success) {
      setFormValue(initialValue);
      toast.success("Category created successfully", {
        theme: "light",
      });
      navigate("/category-list");
      setIsActive(true);
      dispatch(categoryList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Add Category" />

      <Error error={error} />

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
            {loading ? <span>Please wait ...</span> : <span>Submit</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
