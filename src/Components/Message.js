import { useContext, useEffect } from 'react';
import {ProjectContext }from '../Contexts/ProjectContext';

const Message = () => {
    const {messageDetails, updateMessage} = useContext(ProjectContext)
    // useEffect(() => setTimeout(updateMessage({type: 'none'}), 1500), [messageDetails])
    
    return (
        <div className={`message message-${messageDetails.type}`}>
            {messageDetails.message}
        </div>
    )
}

export default Message;