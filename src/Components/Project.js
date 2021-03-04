import { useParams } from 'react-router-dom';

const Project = (props) => {
    console.log(props)
    let {id} = useParams;
    console.log(id);
    return 'hello'
}

export default Project;