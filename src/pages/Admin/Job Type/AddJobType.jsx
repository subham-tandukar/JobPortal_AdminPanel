import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addJobType, jobTypeList } from "../../../redux/JobType/jobTypeApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/JobType/jobTypeSlice";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
const AddJobType = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.jobType);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValue = {
    JobType: "",
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
    dispatch(addJobType(dataform));
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
      toast.success("Job Type created successfully", {
        theme: "light",
      });
      navigate("/jobType-list");
      setIsActive(true);
      dispatch(jobTypeList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Add Job Type" />

      <Error error={error} />

      <div className="th-card mt-5">
        <form>
          <div className="grid grid-cols-2 gap-5 ">
            <div className="th-form">
              <label htmlFor="JobType">
                Job Type<sup>*</sup>
              </label>
              <input
                type="text"
                name="JobType"
                value={formValue.JobType}
                onChange={handleChange}
                autoComplete="off"
                id="JobType"
                placeholder="JobType"
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

export default AddJobType;
