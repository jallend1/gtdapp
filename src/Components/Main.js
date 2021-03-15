import NextActions from "./Projects/NextActions";
import Sidebar from "./Sidebar";

const Main = ({ completeAction }) => {
  return (
    <div className="container space-around">
      <NextActions completeAction={completeAction} />
      <Sidebar />
    </div>
  );
};

export default Main;
