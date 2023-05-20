function handler(req, res) {
  if (req.method === "POST") {
    const submittedEmail = req.body.email;
    res.status(201).json({ message: "Success!", email: submittedEmail });
  }
}

export default handler;
