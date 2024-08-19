import React from "react";
import PageHeading from "../../../components/PageHeading";
import { BsSuitcaseLg } from "react-icons/bs";
import { PiNoteDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dashboardCountApi } from "../../../redux/Dasboard/dashboardApi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardCount, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardCountApi());
  }, []);

  const countList =
    dashboardCount &&
    dashboardCount.Values &&
    dashboardCount.Values.length > 0 &&
    dashboardCount.Values[0];

  return (
    <>
      <PageHeading title="Dashboard Home!" />

      <div className="th-dashboard mt-10">
        <div className="grid grid-cols-4 gap-2">
          <div>
            <div className="dashboard-card">
              <div>
                <div className="icon">
                  <BsSuitcaseLg />
                </div>
              </div>

              <div className="text-right">
                {isLoading ? (
                  <div class="dots-container">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                ) : (
                  <h4>{countList?.Jobs}</h4>
                )}
                <p>{countList?.Jobs > "1" ? "Posted Jobs" : "Posted Job"}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="dashboard-card secondary">
              <div>
                <div className="icon">
                  <PiNoteDuotone />
                </div>
              </div>

              <div className="text-right">
                {isLoading ? (
                  <div class="dots-container ">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                ) : (
                  <h4>{countList?.Applications}</h4>
                )}

                <p>
                  {countList?.Applications > "1"
                    ? "Applications"
                    : "Application"}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="dashboard-card success">
              <div>
                <div className="icon">
                  <PiNoteDuotone />
                </div>
              </div>

              <div className="text-right">
                {isLoading ? (
                  <div class="dots-container ">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                ) : (
                  <h4>{countList?.Approved}</h4>
                )}

                <p>Approved</p>
              </div>
            </div>
          </div>
          <div>
            <div className="dashboard-card danger">
              <div>
                <div className="icon">
                  <PiNoteDuotone />
                </div>
              </div>

              <div className="text-right">
                {isLoading ? (
                  <div class="dots-container ">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                ) : (
                  <h4>{countList?.Rejected}</h4>
                )}
                <p>Rejected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
