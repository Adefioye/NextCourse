function handler(req, res) {
  const { eventId } = req.query;
  
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      email.trim() === "" ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input..." });
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      text,
      name,
    };

    res.status(201).json({ message: "Success!", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: 1,
        email: "test@test.com",
        text: "This is first comment",
        name: "Max",
      },
      {
        id: 2,
        email: "test2@test.com",
        text: "This is second comment",
        name: "Manuel",
      },
    ];

    res.status(200).json({ message: "Success!", comments: dummyList });
  }
}

export default handler;
