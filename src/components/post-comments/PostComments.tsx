import { useState } from 'react';
import IconButton from '../icon-button/IconButton';
// import IconButton from '../icon-button-with-tw/IconButton'; // enable to try the Tailwind CSS version
import Comment from './Comment';
import { CommentProps } from './types';
import submitIcon from './submit.svg';
import './index.css';

type PostCommentsProps = {
  initComments: CommentProps[];
};

// Can dynamically retrieves the comments for a post
// Additionally, updates to the comments should be stored on the server
const PostComments = ({ initComments }: PostCommentsProps) => {
  const [text, setText] = useState<string>('');
  const [comments, setComments] = useState<CommentProps[]>(initComments ?? []);
  const handleChange= (e: React.FormEvent<HTMLInputElement>) => {
    setText((e.target as HTMLInputElement).value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setText('');
    setComments([...comments, { username: 'currentUser', comment: text }]);
  }
  return (
    <div className="post-comments">
      <h2>{comments.length} comments:</h2>
      <ul>
        {/* Comments are append-only, so the index is a stable key here. */}
        {comments.map((comment, index) => (
          <li key={index}>
            <Comment {...comment} />
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          placeholder="Write a comment..."
          aria-label="Write a comment"
          onChange={handleChange}
        />
        <IconButton
          className="submit-button"
          type="submit"
          icon={submitIcon}
        />
      </form>
    </div>
  );
};

export default PostComments;
