import { useContext, useEffect } from 'react';
import {ProjectContext }from '../Contexts/ProjectContext';

const Message = () => {
    const {messageDetails} = useContext(ProjectContext)
    console.log(messageDetails)
    // useEffect(() => console.log(messageDetails), [messageDetails])

    return (
        <>
            <div className="message message-fade">
                {messageDetails.message}
            </div>
        </>
    )
}

export default Message;