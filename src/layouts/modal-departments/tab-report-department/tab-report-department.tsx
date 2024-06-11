import { Spin, Timeline } from "antd";
import { useGetReportDepartmentsQuery } from "src/share/services/departmentServices";
import { useHandleReports } from "src/share/hooks";

export const TabReportDepartment = ({
  department_id,
}: {
  department_id?: string;
}) => {
  const { data: reportData, isFetching } = useGetReportDepartmentsQuery({
    departmentId: department_id,
  });

  const reportTimelineItem = useHandleReports("department", reportData);
  return (
    <>
      <Spin spinning={isFetching}>
        <div className='time-line-report-department'>
          <Timeline mode={"left"} items={reportTimelineItem} />
        </div>
      </Spin>
    </>
  );
};
