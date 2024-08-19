import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaPlus, FaRegCalendarAlt } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { jobInfo, editJob, jobList } from "../../redux/Job/jobApi";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../redux/Job/jobSlice";
import { categoryList } from "../../redux/Category/categoryApi";
import { jobTypeList } from "../../redux/JobType/jobTypeApi";
import Loading from "../../components/Loading";
import PageHeading from "../../components/PageHeading";
import Error from "../../components/Error";
import { formats, modules } from "../../components/hooks/hook";
import MyDatePicker from "../../components/MyDatePicker";
import MySelect from "../../components/MySelect";
import MyImageUploader from "../../components/MyImageUploader";

const EditJob = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { userDetail } = useSelector((state) => state.auth);

  const { category } = useSelector((state) => state.category);
  const { jobType } = useSelector((state) => state.jobType);

  const { loading, error, success, job } = useSelector((state) => state.job);

  const dataInfo = job && job?.Values && job?.Values[0];
  const userInfo = (userDetail && userDetail.Values) || [];

  const categoryData = (category && category?.Values) || [];

  const dropDownValue = categoryData.map((item) => ({
    value: item._id,
    label: item.Category,
  }));

  const jobTypeData = (jobType && jobType?.Values) || [];

  const jobTypedropDownValue = jobTypeData.map((item) => ({
    value: item._id,
    label: item.JobType,
  }));

  const genderData = [
    {
      value: "Male",
    },
    {
      value: "Female",
    },
    {
      value: "Other",
    },
  ];

  const genderdropdownValue = genderData.map((item) => ({
    value: item.value,
    label: item.value,
  }));

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValue = {
    ComName: "",
    JobDesignation: "",
    Location: "",
    Salary: "",
    Experience: "",
    Qualification: "",
  };

  const [formValue, setFormValue] = useState(initialValue);
  const [JobImage, setJobImage] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [JobIsUploaded, setJobIsUploaded] = useState(false);
  const [JobDescription, setJobDescription] = useState("");
  const [IsPublished, setIsPublished] = useState(true);
  const [IsFeatured, setIsFeatured] = useState(false);
  const [value, onChange] = useState();
  const [Category, setCategory] = useState(null);
  const [JobType, setJobType] = useState(null);
  const [Gender, setGender] = useState(null);

  let year = (value && value.getFullYear()) || "";
  let month = (value && String(value.getMonth() + 1).padStart(2, "0")) || ""; // Months are zero-indexed
  let day = (value && String(value.getDate()).padStart(2, "0")) || "";

  const ExpiryDate = value ? `${year}-${month}-${day}` : "";

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
        setJobImage(e.target.result);
        setJobIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (dataInfo) {
      const selectedCategory = categoryData.filter(
        (item) => item._id === dataInfo.Category._id
      );
      const dropdownCategory = {
        value: selectedCategory[0]?._id,
        label: selectedCategory[0]?.Category,
      };

      const selectedJobType = jobTypeData.filter(
        (item) => item._id === dataInfo.JobType._id
      );
      const dropdownJobType = {
        value: selectedJobType[0]?._id,
        label: selectedJobType[0]?.JobType,
      };

      const selectedGender = genderData.filter(
        (item) => item.value === dataInfo.Gender
      );

      const dropdownGender = {
        value: selectedGender[0]?.value,
        label: selectedGender[0]?.value,
      };

      const baseFilename =
        (dataInfo.ComLogo && dataInfo.ComLogo.split("/")[5]) || "";
      const realFilename = (baseFilename && baseFilename.split("_")[2]) || "";

      setFormValue({
        ComName: dataInfo.ComName,
        JobDesignation: dataInfo.JobDesignation,
        Location: dataInfo.Location,
        Salary: dataInfo.Salary,
        Experience: dataInfo.Experience,
        Qualification: dataInfo.Qualification,
      });

      setJobImage(dataInfo.ComLogo ? dataInfo.ComLogo : null);
      setFilename(realFilename);
      setJobIsUploaded(dataInfo.ComLogo ? true : false);
      setJobDescription(dataInfo.JobDescription);
      onChange(new Date(dataInfo.ExpiryDate));
      setIsPublished(dataInfo.IsPublished === "Y" ? true : false);
      setIsFeatured(dataInfo.IsFeatured === "Y" ? true : false);

      setCategory(dropdownCategory);
      setJobType(dropdownJobType);
      setGender(selectedGender.length > 0 ? dropdownGender : null);
    }
  }, [dataInfo]);

  useEffect(() => {
    const dataForm = {
      FLAG: "SI",
      UserID: userInfo && userInfo.Id,
      JobID: params.id,
    };
    dispatch(jobInfo({ data: dataForm, token: currentUser.Token }));
  }, [params]);

  const handleSubmit = (e) => {
    const dataForm = {
      ...formValue,
      FLAG: "U",
      UserID: userInfo && userInfo.Id,
      JobID: params.id,
      JobDescription: JobDescription,
      IsPublished: IsPublished ? "Y" : "N",
      IsFeatured: IsFeatured ? "Y" : "N",
      ComLogo: JobImage
        ? JobImage
        : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305",
    };

    const formData = new FormData();
    formData.append("FLAG", "U");
    formData.append("UserID", userInfo && userInfo.Id);
    formData.append("ComName", formValue.ComName);
    formData.append("JobDesignation", formValue.JobDesignation);
    formData.append("Location", formValue.Location);
    formData.append("Salary", formValue.Salary);
    formData.append("ExpiryDate", ExpiryDate);
    formData.append("Category", (Category && Category?.value) || "");
    formData.append("JobType", (JobType && JobType?.value) || "");
    formData.append("Gender", (Gender && Gender?.value) || "");
    formData.append("Experience", formValue.Experience);
    formData.append("Qualification", formValue.Qualification);
    formData.append("JobDescription", JobDescription);
    formData.append("IsPublished", IsPublished ? "Y" : "N");
    formData.append("IsFeatured", IsFeatured ? "Y" : "N");
    formData.append("JobID", params.id);
    if (file) {
      formData.append("ComLogo", file);
    } else {
      formData.append("ComLogo", JobImage);
    }
    e.preventDefault();
    dispatch(editJob({ data: formData, token: currentUser.Token }));
  };

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "A",
    };
    dispatch(categoryList(dataForm));
    dispatch(jobTypeList(dataForm));
  }, []);

  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      UserID: userInfo && userInfo.Id,
      Category: "",
      IsPublished: "",
      IsFeatured: "",
    };
    if (success) {
      setFormValue(initialValue);
      toast.success("Job updated successfully", {
        theme: "light",
      });
      navigate("/job-list");
      setJobDescription("");
      setJobIsUploaded(false);
      setJobImage(null);
      setIsPublished(true);
      setIsFeatured(false);
      dispatch(jobList({ data: dataForm, token: currentUser.Token }));
      dispatch(clearError());
    }
  }, [success]);

  return (
    <div>
      <PageHeading title="Update Job" />

      <Error error={error} />

      {loading ? (
        <Loading />
      ) : (
        <div className="th-card mt-5">
          <form>
            <div className="grid grid-cols-2 gap-5 ">
              <div className="th-form">
                <label htmlFor="ComName">
                  Company Name<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="ComName"
                  value={formValue.ComName}
                  onChange={handleChange}
                  autoComplete="off"
                  id="ComName"
                  placeholder="ComName"
                  required
                />
              </div>
              <div className="th-form">
                <label htmlFor="JobDesignation">
                  Designation<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="JobDesignation"
                  value={formValue.JobDesignation}
                  onChange={handleChange}
                  autoComplete="off"
                  id="JobDesignation"
                  placeholder="JobDesignation"
                  required
                />
              </div>
              <div className="th-form">
                <label htmlFor="Location">
                  Location<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="Location"
                  value={formValue.Location}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Location"
                  placeholder="Location"
                  required
                />
              </div>
              <div className="th-form">
                <label htmlFor="Salary">
                  Salary<sup>*</sup>
                </label>
                <input
                  type="text"
                  name="Salary"
                  value={formValue.Salary}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Salary"
                  placeholder="Salary"
                  required
                />
              </div>
              <div className="th-form">
                <label htmlFor="ExpiryDate">
                  Expiry Date<sup>*</sup>
                </label>

                <MyDatePicker value={value} onChange={onChange} />
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
              <div className="th-form">
                <label htmlFor="JobType">
                  JobType<sup>*</sup>
                </label>
                <MySelect
                  dropDownValue={jobTypedropDownValue}
                  value={JobType}
                  onChange={setJobType}
                  placeholder="Job Type"
                />
              </div>
              <div className="th-form">
                <label htmlFor="Gender">Gender</label>
                <MySelect
                  dropDownValue={genderdropdownValue}
                  value={Gender}
                  onChange={setGender}
                  placeholder="Gender"
                />
              </div>
              <div className="th-form">
                <label htmlFor="Experience">Experience</label>
                <input
                  type="text"
                  name="Experience"
                  value={formValue.Experience}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Experience"
                  placeholder="Experience"
                  required
                />
              </div>
              <div className="th-form">
                <label htmlFor="Qualification">Qualification</label>
                <input
                  type="text"
                  name="Qualification"
                  value={formValue.Qualification}
                  onChange={handleChange}
                  autoComplete="off"
                  id="Qualification"
                  placeholder="Qualification"
                  required
                />
              </div>

              <div className="th-form col-span-2">
                <label htmlFor="JobDescription">
                  Job Description<sup>*</sup>
                </label>

                <ReactQuill
                  id="JobDescription"
                  modules={modules}
                  formats={formats}
                  value={JobDescription}
                  onChange={setJobDescription}
                />
              </div>
              <div className="th-form ">
                <label>Company Logo</label>

              <div>
              <MyImageUploader
                  Image={JobImage}
                  setImage={setJobImage}
                  IsUploaded={JobIsUploaded}
                  setIsUploaded={setJobIsUploaded}
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
                    name="IsPublished"
                    checked={IsPublished}
                    onChange={() => setIsPublished(!IsPublished)}
                    id="IsPublished"
                    className="!w-auto"
                  />
                  <label className="!m-0" htmlFor="IsPublished">
                    Publish
                  </label>
                </div>
                <div className="th-checkbox">
                  <input
                    type="checkbox"
                    name="IsFeatured"
                    checked={IsFeatured}
                    onChange={() => setIsFeatured(!IsFeatured)}
                    id="IsFeatured"
                    className="!w-auto"
                  />
                  <label className="!m-0" htmlFor="IsFeatured">
                    Featured
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

export default EditJob;
