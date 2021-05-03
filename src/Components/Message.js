import { useContext } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";

const Message = () => {
  const { messageDetails } = useContext(ProjectContext);

  return (
    <div className={`message message-${messageDetails.type}`} id="message">
      {messageDetails.message}
    </div>
  );
};

export default Message;
