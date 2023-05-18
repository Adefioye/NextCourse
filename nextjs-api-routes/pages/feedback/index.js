import {
  buildFeedbackPath,
  extractFeedbackData,
} from "./../api/feedback/index";
import { useState } from "react";

function Feedback(props) {
  const { feedbackItems } = props;
  const [feedbackItem, setFeedbackItem] = useState();

  function feedbackDetailHandler(id) {
    console.log("detail handler fired!");
    fetch(`/api/feedback/${id}`)
      .then((res) => res.json())
      .then((data) => setFeedbackItem(data.feedback));
  }

  return (
    <>
      {feedbackItem && <h1>{feedbackItem.email}</h1>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.feedback}{" "}
            <button onClick={feedbackDetailHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedbackData(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}
export default Feedback;
