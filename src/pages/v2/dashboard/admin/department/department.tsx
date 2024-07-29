import "./department.css";
import { Typography } from "antd";
import { ResponsivePie } from "@nivo/pie";

export const AdminDepartment = () => {
  return (
    <div className='department-page'>
      <section className='main'>
        <header className='main-header'>
          <div className='title-des'>
            <Typography.Title level={1}>Deparment Detail</Typography.Title>
            <Typography.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
              ipsam, aperiam ipsum delectus dolores iste. Assumenda hic dolor
              error totam perferendis, ipsam nesciunt veritatis eius!
            </Typography.Text>
          </div>
          <div className='pie-chart'>
            <ResponsivePie
              data={[
                { id: "todo", title: "Todo", color: "#31ADC1", value: 100 },
                {
                  id: "on progress",
                  title: "On progress",
                  color: "#333333",
                  value: 100,
                },
                {
                  id: "done",
                  title: "Done",
                  color: "#h1h1h1",
                  value: 100,
                },
              ]}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor='#333333'
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "todo",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "on progress",
                  },
                  id: "dots",
                },
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </header>
      </section>
    </div>
  );
};
