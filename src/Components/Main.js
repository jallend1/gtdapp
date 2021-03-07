import NextActions from "./NextActions";
import Sidebar from "./Sidebar";

const Main = ({ projects, completeAction }) => {
  return (
    <div className="container space-around">
      <NextActions projects={projects} completeAction = {completeAction}/>
      <Sidebar projects={projects} />
    </div>
  );
};

export default Main;
