import "./project-reports.css";
import { Timeline } from "antd";

export const ProjectReports = () => {
  return (
    <div className='project-reports-container'>
      <Timeline
        className='report-timeline'
        mode='left'
        items={[
          {
            label: "2024-01-02",
            children: (
              <div className='project-report-detail'>
                Mock design
                <br />
                <span className='project-reporter'> by Nguyen Van A</span>
              </div>
            ),
          },
          {
            label: "2024-01-02",
            children: (
              <div className='project-report-detail'>
                Mock api
                <br />
                <span className='project-reporter'> by Nguyen Van A</span>
              </div>
            ),
          },
          {
            label: "2024-01-02",
            children: (
              <div className='project-report-detail'>
                Unit test
                <br />
                <span className='project-reporter'> by Nguyen Van A</span>
              </div>
            ),
            color: "gray",
          },
        ]}
      />
    </div>
  );
};
