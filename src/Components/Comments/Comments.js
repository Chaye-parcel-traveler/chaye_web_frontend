import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dropdown, TextArea, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/comment.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


function Comments() {
    const [userData, setUserData] = useState('');
    useEffect(() => {
        axios.get('http://localhost:5000/getConnectedUser', { withCredentials: true })
        .then(response => {
          setUserData(response.data);
          console.log(response.data);
        }).catch(error => {
          setUserData(false);
        });
    }, []);
    return (
        <div className="rating">
            <h1>Notation et Commentaires</h1>
            <form action="http://localhost:5000/comments" method="post">
            <input type="hidden" name='memberId' className="form-control" value={userData.id} />
                    <label>Notez notre site</label>
                    <Stack spacing={1}>
                        <Rating name="ratingStars" defaultValue={1} precision={0.5}  size="large" />
                    </Stack>
            
                <div className="comment">
                    <h2>Laissez un commentaire :</h2>
                    <textarea id="commentText" name="content" />
                </div>
                <Button primary>Soumettre</Button>
            </form>
            {/* <div className="comments">
            <h2>Commentaires et notes :</h2>
            <List divided relaxed>
                {comments.map((comment, index) => (
                <List.Item key={index}>
                    <List.Content>
                    <List.Header>{`Note : ${comment.rating}`}</List.Header>
                    <List.Description>{comment.text}</List.Description>
                    </List.Content>
                </List.Item>
                ))}
            </List>
            </div> */}
        </div>
    );
}

export default Comments
