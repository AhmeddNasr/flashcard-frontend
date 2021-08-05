import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './styles/style.css'
//TODO LAZY LOADING

function FetchFolders() {
    // eslint-disable-next-line
    const [folders, setFolders] = useState([false,[]]);
    useEffect(() => {
        fetch('http://localhost:8080/api/folders/87767', {credentials: 'include'})
            .then((result) => {
                if(result.ok) {
                    return result.json()
                }
            })
            .then(data => {
                let folders = [];
                for(let i = 0; i < data.folders.length; i++) {
                    let currentFolder = data.folders[i];
                    folders.push({
                        name: currentFolder.name, 
                        id: currentFolder.folder_id
                    });
                }
                setFolders([true, folders]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    let foldersDOM = [];

    if (folders[0] === true && folders[1].length === 0) {
        return (
            <div>
                <h4>
                    It looks like you don't have any classes!
                </h4>
                <Button variant="contained" color="primary">
                    <Link to="/study/create-new-class/" className="plain-link">
                        Create your first class
                    </Link>
                </Button>
            </div>
        )
    }

    folders[1].forEach((folder) => {
        foldersDOM.push(
            <Grid item md={4} xs={6}>
                <Button className='cry' variant="contained" color="secondary">
                    <Link to={`/study/folder/${folder.id}`} className="plain-link">
                        {folder.name}
                    </Link>
                </Button>
            </Grid>
        )
    });

    if(folders[0] === true) {
        return (
            <Grid
            spacing = {1}
            container
            direction="row"
            align="center"
            >
                {foldersDOM}
            </Grid>
        );
    } else {
        return <div>loading</div>
    }
}

export default FetchFolders;