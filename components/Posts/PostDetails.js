import { useRouter } from 'next/router';
import { Badge, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deletePost } from '../../api/postData';

export default function PostsDetails({ postObj }) {
  const router = useRouter();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => router.push('/'));
    }
  };

  return (
    <Card className="text-center">
      <span>
        <Button onClick={deleteThisPost}>🗑</Button>
        <Button href={`/Posts/edit/${postObj.id}`}>✍🏽</Button>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Text>{postObj.category_label}</Card.Text>
      </span>
      <Card.Img variant="top" src={postObj.image_url} />
      <Card.Body>
        <span>
          <Card.Text>By {postObj.username}</Card.Text>
          <Button href={`/comments/${postObj.id}`}>View Comments</Button>
          <div>
            <Badge pill bg="primary">
              😍 {postObj.love_reaction}
            </Badge>
            <Badge pill bg="primary">
              🤯 {postObj.mind_blown_reaction}
            </Badge>
            <Badge pill bg="primary">
              🤔 {postObj.thought_reaction}
            </Badge>
            <Badge pill bg="primary">
              🤬 {postObj.hate_reaction}
            </Badge>
          </div>
        </span>
        <Card.Text>{postObj.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

PostsDetails.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    username: PropTypes.string,
    title: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    category_label: PropTypes.string,
    category_id: PropTypes.number,
    love_reaction: PropTypes.number,
    mind_blown_reaction: PropTypes.number,
    thought_reaction: PropTypes.number,
    hate_reaction: PropTypes.number,
  }),
};
PostsDetails.defaultProps = {
  postObj: PropTypes.shape({
    id: null,
    user_id: null,
    username: '',
    title: '',
    publication_date: '',
    image_url: '',
    content: '',
    category_label: '',
    category_id: null,
    love_reaction: 0,
    mind_blown_reaction: 0,
    thought_reaction: 0,
    hate_reaction: 0,
  }),
};
