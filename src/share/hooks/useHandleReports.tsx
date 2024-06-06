import dayjs from "dayjs";
import { ReactNode, useEffect, useState, useCallback } from "react";
import type { ProjectReportResp } from "src/share/models/projectModels";
import { Typography } from "antd";

import type { TimelineItemProps } from "antd";
import { Activity } from "src/share/models";

interface PrepareReports {
  taskDesc?: string;
  date?: string;
  activities?: Activity[];
}

export const useHandleReports = (
  type: "department" | "project",
  reports: ProjectReportResp | undefined
) => {
  const [timelineItem, setTimelineItem] = useState<TimelineItemProps[]>();
  const { Text } = Typography;

  const handleReport = useCallback(() => {
    if (type === "project" && reports) {
      const newReportList: PrepareReports[] = [];
      reports.tasks.forEach((task) => {
        for (const date in task.activities) {
          const newReport: PrepareReports = {};
          newReport.taskDesc = task.description;
          newReport.date = date;
          newReport.activities = task.activities[date];
          newReportList.push(newReport);
        }
      });

      const sortedList = newReportList.sort(
        (a, b) =>
          dayjs(b.date as string).millisecond() -
          dayjs(a.date as string).millisecond()
      );

      const finalTimeline: TimelineItemProps[] = [];
      let timeItem: TimelineItemProps = {};
      const tempTimeChildren: ReactNode[] = [];
      sortedList?.forEach((report, index) => {
        if (index === 0) {
          timeItem.label = report.date;
        }
        if (index !== 0 && sortedList[index - 1].date !== report.date) {
          timeItem.children = tempTimeChildren.map((timeChild) => timeChild);
          tempTimeChildren.length = 0;
          finalTimeline.push(timeItem);
          timeItem = {};
          timeItem.label = report.date;
        }
        tempTimeChildren.push(
          <div className='project-report-detail'>
            <Text style={{ fontWeight: 700 }}>{report.taskDesc}</Text>
            {report.activities &&
              report.activities.map((activity) => {
                return (
                  <>
                    <span style={{ color: "#8c8c8c", fontWeight: 500 }}>
                      {activity.description}
                    </span>
                  </>
                );
              })}
          </div>
        );
        if (index === sortedList.length - 1) {
          timeItem.children = tempTimeChildren.map((timeChild) => timeChild);
          finalTimeline.push(timeItem);
        }
      });
      setTimelineItem(finalTimeline);
    }
  }, [reports]);

  useEffect(() => {
    handleReport();
  }, [reports]);

  return timelineItem;
};
