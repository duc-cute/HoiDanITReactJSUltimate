/** @format */
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
} from "recharts";
import "./DashBoard.scss";
import { useEffect, useState } from "react";
import { getOverview } from "../../../services/apiService";
import { useTranslation } from "react-i18next";
const DashBoard = () => {
  const [dataChart, setDataChart] = useState([]);
  const [dataOverView, setDataOverView] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getDataOverView();
  }, []);

  const getDataOverView = async () => {
    const res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz;
      Qs = res?.DT?.others?.countQuestions;
      As = res?.DT?.others?.countAnswers;
      const data = [
        {
          name: "Quizzes",
          quantity: Qz,
        },
        {
          name: "Questions",
          quantity: Qs,
        },
        {
          name: "Answers",
          quantity: As,
        },
      ];
      setDataChart(data);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">{t("dashboardContent.title")}</div>
      <div className="dashboard-content">
        <div className="dashboard-analytics">
          <div className="analytic-block">
            <span className="analytic-title">
              {t("dashboardContent.totalUser")}
            </span>
            <span className="analytic-number">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                0
              )}
            </span>
          </div>

          <div className="analytic-block">
            <span className="analytic-title">
              {t("dashboardContent.totalQuizzes")}
            </span>
            <span className="analytic-number">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                0
              )}
            </span>
          </div>
          <div className="analytic-block">
            <span className="analytic-title">
              {t("dashboardContent.totalQuestions")}
            </span>
            <span className="analytic-number">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                0
              )}
            </span>
          </div>
          <div className="analytic-block">
            <span className="analytic-title">
              {t("dashboardContent.totalAnswers")}
            </span>
            <span className="analytic-number">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                0
              )}
            </span>
          </div>
        </div>
        <div className="dashboard-chart">
          <ResponsiveContainer width={"100%"} height="100%">
            <BarChart barSize={50} data={dataChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#413ea0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
