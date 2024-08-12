import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import moment from 'moment';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useStyles from './styles.js';
import noImage from '../../../images/no-image.png';
import { deletePost, likePost } from '../../../actions/posts.js';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    // Retrieve user profile from localStorage
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.googleId ;  // Use googleId for Google auth
    const [likes, setLikes] = useState(post?.likes || []);
    const hasLikedPost = likes.find((like) => like === userId);

    // console.log("User ID (googleId):", userId);
    // console.log("User ID (custom):", user?.result?._id);
    // console.log("Post Creator ID:", post?.creator);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const hoverStyles = {
        cursor: 'pointer',
        backgroundColor: isHovered ? 'lightgrey' : 'transparent',
    };

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else {
            setLikes([ ...post.likes, userId ]);
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return hasLikedPost ? (
                <> 
                    <ThumbUpAltIcon fontSize="small" />&nbsp;
                    { likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize='small' />&nbsp;
                    {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }

    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }

    return (
        <Card sx={{ borderRadius: '15px' }} className={classes.card} raised elevation={6}>
            <div 
                style={hoverStyles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                onClick={openPost}
            >
                <CardMedia className={classes.media} image={ post.selectedFile ? post.selectedFile : noImage } title={post.title} />
                <div className={classes.overlay}>
                    <Typography variant='h5'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
                    
                </div>
                
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{ post.tags.map((tag) => `#${tag} `) }</Typography>
                </div> 
                <Typography className={classes.title} variant='h6' gutterBottom>{ post.title }</Typography>
                <CardContent sx={{ padding: '5px 15px', margin: '0px' }}>
                    <Typography variant='body2' color='textSecondary' component='p' >{ post.message }</Typography>
                </CardContent>
            </div>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary' disabled={!user?.result} onClick={ handleLike }>
                    <Likes />
                </Button>
                
                { userId === post?.creator && 
                    (
                        <>
                            <Button style={{ color: 'grey' }} onClick={ () => setCurrentId(post._id) }>
                                <EditIcon fontSize='medium' />
                            </Button>
                            <Button size='small' color='error' onClick={ () => dispatch(deletePost(post._id)) }>
                                <DeleteIcon fontSize='small'/>
                                Delete
                            </Button>
                        </>
                    )
                }
            </CardActions>
        </Card>
    );
}


export default Post;