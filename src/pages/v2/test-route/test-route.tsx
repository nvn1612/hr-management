import { ProjectCard } from "src/components/v2";
export const TestRoute = () => {
  return (
    <>
      <ProjectCard
        project={{
          name: "Message App",
          description: "A messsage app that better than Zalo",
        }}
      />
    </>
  );
};
