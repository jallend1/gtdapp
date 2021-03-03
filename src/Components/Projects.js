import { useState, useEffect } from 'react';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    
    const getProjects = () => {
        fetch('data.json')
            .then(res => res.json())
            .then(data => setProjects(data));
    }


    // useEffect(() => getProjects(), []);
    return (
        <div className="container">
            <header>
                <h2>Project Page!</h2>            
            </header>
            <main>

            </main>

        </div>
    )
}

export default Projects