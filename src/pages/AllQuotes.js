import QuoteList from "../components/quotes/QuoteList";
import Card from "../components/UI/Card";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const quotes = [
  { author: "ryan", text: "enjoy the moment", key: "1", id: "1" },
  { author: "jackie", text: "enjoy the bone", key: "2", id: "2" },
  { author: "dominique", text: "enjoy the sun", key: "3", id: "3" },
];

const AllQuotes = (props) => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }
  if (error) {
    return <p className="centered focused">Could not load quotes</p>;
  }
  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0 || loadedQuotes === null)) {
    return <NoQuotesFound />;
  }


  return (
    <Card rotation={4} timing={100}>
      <h1>All Quotes</h1>
      <QuoteList quotes={loadedQuotes} />
    </Card>
  );
};

export default AllQuotes;
