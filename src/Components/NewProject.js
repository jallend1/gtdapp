const NewProject = () => {
    return (
        <div>
            <header>
                <h2>New Project</h2>
            </header>
            <section>
                <form>
                    <label htmlFor="title">Project Name</label>
                    <input type="text" name="title" id="title" placeholder="Name your project"></input>
                    <label htmlFor="user">User ID</label>
                    <input type="text" name="user" id="user" placeholder="Your user number"></input>
                    <label htmlFor="nextAction1">Next Action:</label>
                    <input type="text" name="nextAction1" id="nextAction1" placeholder="The very next action"></input>
                </form>
            </section>
        </div>
    )
}

export default NewProject;