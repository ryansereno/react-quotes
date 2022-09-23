import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const { status, error, sendRequest } = useHttp(addComment);
  const { onAddedComment } = props;
  const commentTextRef = useRef();

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [error, status, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log("comment object: ", {
      text: commentTextRef.current.value,
      quoteId: props.quoteId,
    });
    sendRequest({
      commentData: { text: commentTextRef.current.value },
      quoteId: props.quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
