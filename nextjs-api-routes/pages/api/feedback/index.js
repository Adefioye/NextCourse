import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedbackData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const text = req.body.text;

    const filePath = buildFeedbackPath();
    const data = extractFeedbackData(filePath);
    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback: text,
    };
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    console.log(data);

    res.status(201).json({ message: "Success!", data: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedbackData(filePath);

    res.status(200).json({ message: "Success!", data });
  }
}

export default handler;
