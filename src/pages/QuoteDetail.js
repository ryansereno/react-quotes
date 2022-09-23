import { useParams, Route } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";

import Card from "../components/UI/Card";
import Comments from "../components/comments/Comments";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true);
  useEffect(() => {
    sendRequest(params.quoteId);
  }, [sendRequest, params.quoteId]);
  if (status === "pending") {
    return <p>Loading..</p>;
  }
  if (error) {
    return <p>Error loading quote</p>;
  }
  if (status === "complete" && !loadedQuote) {
    return <p>No quote found</p>;
  }
  return (
    <Card>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Card>
  );
};

export default QuoteDetail;
