const NewProject = () => {
  return (
    <div className="new-project">
      <header>
        <h2>New Project</h2>
      </header>
      <section>
        <form>
          <div>
            <label htmlFor="title">Project Name</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Name your project"
            ></input>
          </div>
          <label htmlFor="nextAction1">Add a next action:</label>
          <input
            type="text"
            name="nextAction1"
            id="nextAction1"
            placeholder="The very next action"
          ></input>
        </form>
      </section>
    </div>
  );
};

export default NewProject;
