import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedbackItems, setFeedbackItems] = useState([]);

  function formSubmitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler(event) {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbackItems(data.data));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={formSubmitHandler}>
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </p>
        <p>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            name="feedback"
            id="feedback"
            rows="5"
            ref={feedbackInputRef}
          />
        </p>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      {feedbackItems.length > 0 && (
        <ul>
          {feedbackItems.map((item) => (
            <li key={item.id}>{item.feedback}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
