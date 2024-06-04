import "./project-reports.css";
import { Timeline, Spin, Empty } from "antd";
import dayjs from "dayjs";
import { ReactNode, useEffect, useState } from "react";
import { useGetProjectReportsQuery } from "src/share/services";

interface ProjectReportProp {
  projectId?: string;
}

interface TimelineItem {
  label: string;
  children: ReactNode;
}

export const ProjectReports = ({ projectId }: ProjectReportProp) => {
  const { data, isFetching, isSuccess } = useGetProjectReportsQuery({
    projectId,
  });
  const [timeline, setTimeline] = useState<TimelineItem[] | undefined>(
    undefined
  );
  const [timelineStatus, setTimelineStatus] = useState<boolean>(false);

  let unsortedTimeline: Record<string, unknown>[] = [];

  const createReport = () => {
    setTimelineStatus(false);
    if (data?.tasks) {
      data.tasks.forEach((task) => {
        for (const date in task.activities) {
          const timelineItem: Record<string, unknown> = { activities: [] };
          timelineItem["date"] = date;
          timelineItem["taskDescripion"] = task.description;
          task.activities[date].forEach((activity) => {
            timelineItem["activities"].push(activity);
          });
          unsortedTimeline.push(timelineItem);
        }
      });
    }

    const sortedTimeline = unsortedTimeline.sort(
      (a, b) =>
        dayjs(a.date, "YYYY/MM/DD").millisecond -
        dayjs(b.date, "YYYY/MM/DD").millisecond
    );

    setTimeline(sortedTimeline);
  };

  useEffect(() => {
    createReport();
  }, [projectId]);

  return (
    <Spin spinning={isFetching} size='large'>
      <div className='project-reports-container'>
        {isSuccess && data.tasks ? (
          <Timeline
            className='report-timeline'
            mode='alternate'

            // items={[
            //   {
            //     label: "2024-01-02",
            //     children: (
            //       <div className='project-report-detail'>
            //         Mock design
            //         <br />
            //         <span className='project-reporter'> by Nguyen Van A</span>
            //       </div>
            //     ),
            //   },
            //   {
            //     label: "2024-01-02",
            //     children: (
            //       <div className='project-report-detail'>
            //         Mock api
            //         <br />
            //         <span className='project-reporter'> by Nguyen Van A</span>
            //       </div>
            //     ),
            //   },
            //   {
            //     label: "2024-01-02",
            //     children: (
            //       <div className='project-report-detail'>
            //         Unit test
            //         <br />
            //         <span className='project-reporter'> by Nguyen Van A</span>
            //       </div>
            //     ),
            //     color: "gray",
            //   },
            // ]}
          />
        ) : (
          <Empty />
        )}
      </div>
    </Spin>
  );
};
