import { useContext } from 'react';
import {ProjectContext }from '../Contexts/ProjectContext';

const Message = () => {
    const {message} = useContext(ProjectContext)
    console.log(message)
    return (
        <>
            <div className="message">
                {message}
            </div>
        </>
    )
}

export default Message;