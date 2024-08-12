import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments || []);
    const [ comment, setComment ] = useState('');

    const commentsRef = useRef();

    const user = JSON.parse(localStorage.getItem('profile'))
    // console.log(user)

    const handleClick = async () => {
        try {
            // console.log(comment)
            const finalComment = `${user.result.name}: ${comment}`;
            // console.log(finalComment)
            const newComments = await dispatch(commentPost(finalComment, post._id));
            setComments(newComments);
            setComment('');
            if (commentsRef.current) {
                commentsRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };
    

    return (
        <div>
            <div className={classes.commentsOuterContainer} style={{ width: user ? '100%' : 'auto' }}>
                <div className={classes.commentsInnerContainer} >
                    <Typography gutterBottom fontWeight='bold' variant='h6'> Comments </Typography>
                    { comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong> { c.split(': ')[0] } </strong>
                            { c.split(':')[1] }
                        </Typography>
                    )) }
                    <div ref={commentsRef} />   { /*  this will be the anchor point to scroll to when new comment is added/page is refershed */}
                </div>
                { user?.result.name && (
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'> Write a Comment </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={ (e) => setComment(e.target.value) }
                        />
                        <Button style={{ marginTop: '10px'}} color='primary' fullWidth disabled={!comment} variant='contained' onClick={ handleClick }>
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentSection;