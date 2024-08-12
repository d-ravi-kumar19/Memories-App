import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import CommentSection from './CommentSection';

const PostDetails = () => {

	const { post, isLoading } = useSelector((state) => state.posts);   // state.posts is a reducer (?)
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const classes = useStyles();
	const { id } = useParams();

//     const reccStyles = { 
//         margin: '10px', cursor: 'pointer', border: '2px solid pink',
//         padding: '10px', borderRadius: '5px'
//     }

	useEffect(() => {
		dispatch(getPost(id));
	},[id]);

	useEffect(() => {
		if (post)	{
			dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
		}
	},[post])

	if (!post)	return null;

	if (isLoading)	{
		return <Paper elevation={6} className={classes.loadingPaper}>
			<CircularProgress size='7em'/>
		</Paper>
	}


	return (
		<Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>

			<div className={classes.card}>
				<div className={classes.section}>
					<Typography variant="h3" component="h2">{post.title}</Typography>
					<Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
					<Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
					<Typography variant="h6">Created by: {post.name}</Typography>
					<Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<CommentSection post={post} />
					<Divider style={{ margin: '20px 0' }} />
				</div>
				<div className={classes.imageSection}>
					{ post.selectedFile ? (
							<img className={classes.media} src={ post.selectedFile } alt={post.title} />
						)	:	(
							<p style={{ fontSize: '2rem', marginRight: '4rem' }}> (No Image uploaded) </p>
						)
					}
				</div>
			</div>
			
		</Paper>
	)
}

export default PostDetails;