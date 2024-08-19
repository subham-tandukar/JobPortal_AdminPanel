import React, { useContext, useEffect, useState } from "react";
import { Fetchdata } from "../../../components/hooks/getData";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  editJobType,
  jobTypeInfo,
  jobTypeList,
} from "../../../redux/JobType/jobTypeApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../redux/JobType/jobTypeSlice";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
const EditJobType = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { jobType, loading, error, success } = useSelector(
    (state) => state.jobType
  );
  const dataInfo = jobType && jobType?.Values && jobType?.Values[0];

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

  useEffect(() => {
    if (dataInfo) {
      setFormValue({
        JobType: dataInfo.JobType,
      });
      setIsActive(dataInfo.Status === "A" ? true : false);
    }
  }, [dataInfo]);

  useEffect(() => {
    const dataform = {
      FLAG: "SI",
      JobTypeID: params.id,
    };
    dispatch(jobTypeInfo(dataform));
  }, [params]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataform = {
      ...formValue,
      FLAG: "U",
      JobTypeID: params.id,
      Status: IsActive ? "A" : "I",
    };
    dispatch(editJobType(dataform));
  };

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "",
    };
    if (success) {
      toast.success("Job Type updated successfully", {
        theme: "light",
      });
      navigate("/jobType-list");
      dispatch(jobTypeList(dataForm));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Update Job Type" />

      <Error error={error} />

      {loading ? (
        <Loading />
      ) : (
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
              {loading ? <span>Please wait ...</span> : <span>Update</span>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditJobType;
