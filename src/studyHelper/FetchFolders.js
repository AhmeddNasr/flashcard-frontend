import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//TODO LAZY LOADING

function FetchFolders() {
    // eslint-disable-next-line
    const [folders, setFolders] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/folders/8777')
            .then(result => result.json())
            .then(data => {
                let folders = [];
                for(let i = 0; i < data.folders.length; i++) {
                    let currentFolder = data.folders[i];
                    folders.push({
                        name: currentFolder.name, 
                        id: currentFolder.folder_id
                    });
                }
                setFolders(folders);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    let foldersDOM = [];
    folders.forEach((folder) => {
        foldersDOM.push(
            <Link to={`/study/folder/${folder.id}`}>
                name: {folder.name}
            </Link>
        )
    });
    return foldersDOM;
}

export default FetchFolders;