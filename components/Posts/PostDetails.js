import { useRouter } from 'next/router';
import { Badge, Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deletePost } from '../../api/postData';

export default function PostsDetails({ postObj }) {
  const router = useRouter();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj?.id).then(() => router.push('/'));
    }
  };

  return (
    <Card className="text-center">
      <span>
        <Button onClick={deleteThisPost}>🗑</Button>
        <Button href={`/Posts/edit/${postObj?.id}`}>✍🏽</Button>
        <Card.Title>{postObj.title}</Card.Title>
        <Card.Text>{postObj.category?.label}</Card.Text>
      </span>
      <Card.Img variant="top" src={postObj.imageUrl} />
      <Card.Body>
        <span>
          <Card.Text>
            By {postObj.user?.first_name} {postObj.user?.last_name}
          </Card.Text>
          <Button href={`/Comments/posts/${postObj.id}`}>View Comments</Button>
          <div>
            <Badge pill bg="primary">
              😍
            </Badge>
            <Badge pill bg="primary">
              🤯
            </Badge>
            <Badge pill bg="primary">
              🤔
            </Badge>
            <Badge pill bg="primary">
              🤬
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
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    title: PropTypes.string,
    publicationDate: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
  }),
};
PostsDetails.defaultProps = {
  postObj: ({
    category: ({
      id: null,
      label: '',
    }),
    title: '',
    publicationDate: '',
    imageUrl: '',
    content: '',
  }),
};
