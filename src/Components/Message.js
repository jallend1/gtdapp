import { useContext, useEffect } from "react";
import { ProjectContext } from "../Contexts/ProjectContext";

const Message = () => {
  const { messageDetails, updateMessage } = useContext(ProjectContext);
  
  const fadeMessage = () => {
    // TODO: Rather than messing with all this stuff (which very much does not work), maybe just set up the message itself to an empty string?
    const $message = document.getElementById('message');
    $message.classList.remove('message-hide');
    $message.classList.add('message-fade');  
    setTimeout(() => {
      $message.classList.add('message-hide');
      $message.classList.remove('message-fade');
      console.log('changing it!')
      console.log($message.classList)
    }, 3000)
    console.log($message.classList)
  }    
  // useEffect(() => setTimeout(updateMessage({type: 'none'}), 1500), [messageDetails])
  useEffect(() => fadeMessage(), [messageDetails]);

  return (
    <div className={`message message-${messageDetails.type} message-hide`} id="message">
      {messageDetails.message}
    </div>
  );
};

export default Message;
