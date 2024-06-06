import "./project-reports.css";
import { Timeline, Spin, Empty } from "antd";
import { useGetProjectReportsQuery } from "src/share/services";
import { useHandleReports } from "src/share/hooks";

interface ProjectReportProp {
  projectId?: string;
}

export const ProjectReports = ({ projectId }: ProjectReportProp) => {
  const { data, isFetching, isSuccess } = useGetProjectReportsQuery({
    projectId,
  });

  const returnedItem = useHandleReports("project", data);

  return (
    <Spin spinning={isFetching} size='large'>
      <div className='project-reports-container'>
        {isSuccess && data.tasks ? (
          <Timeline
            className='report-timeline'
            mode='alternate'
            items={returnedItem}
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
