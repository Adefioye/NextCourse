import { buildFeedbackPath, extractFeedbackData } from "./index";

function handler(req, res) {
  const feedbackId = req.query.feedbackId;
//   console.log(req.query);
  if (req.method === "POST") {
    // Enough info
  }
  const filePath = buildFeedbackPath();
  const fileData = extractFeedbackData(filePath);
  const selectedFeedback = fileData.find((data) => data.id === feedbackId);

  res.status(200).json({ message: "Success", feedback: selectedFeedback });
}

export default handler;
