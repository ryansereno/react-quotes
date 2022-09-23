import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = () => {
  const { status, sendRequest, data: loadedComments } = useHttp(getAllComments);
  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  let comments;

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
    setIsAddingComment(false);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    console.log("loading");
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && loadedComments) {
    console.log("there is a comments list");
    comments = <CommentsList comments={loadedComments} />;
  }
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    console.log("no comments");
    comments = <p className="centered">No comments yet</p>;
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddedComment={addCommentHandler}
          quoteId={params.quoteId}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
