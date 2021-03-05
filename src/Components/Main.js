import NextActions from "./NextActions";
import Sidebar from "./Sidebar";

const Main = ({ projects }) => {
  return (
    <div className="container space-around">
      <NextActions />
      <Sidebar projects={projects} />
    </div>
  );
};

export default Main;
