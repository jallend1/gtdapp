const Message = ({message}) => {
    return (
        <>
            <div className="message">
                {message ? message : 'No message to share'}
            </div>
        </>
    )
}

export default Message;