import clientPromise from "../../../lib/mongodb";
import { isEmpty } from "ramda";

export default async (req, res) => {
  const method = req.method;
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  switch (method) {
    case "GET":
      const allUsers = await db.collection("users").find({}).toArray();
      res.json(allUsers);
      return;
    case "POST":
      const { first_name, last_name, gender_selected } = req.body;

      if (!first_name || first_name.length === 0) {
        res.status(400).json({ message: "First Name is required" });
        return;
      }

      if (!last_name || last_name.length === 0) {
        res.status(400).json({ message: "Last Name is required" });
        return;
      }

      if (!gender_selected || gender_selected.length === 0) {
        res.status(400).json({ message: "Gender is required" });
        return;
      }

      const userAlreadyExist = await db
        .collection("users")
        .findOne({
          first_name: first_name.toLowerCase(),
          last_name: last_name.toLowerCase(),
        });

      if (userAlreadyExist && !isEmpty(userAlreadyExist)) {
        res
          .status(400)
          .json({
            message: `User [${first_name + last_name}] is already exist`,
          });
        return;
      }

      db.collection("users").insert({
        first_name: first_name.toLowerCase(),
        last_name: last_name.toLowerCase(),
        gender_selected,
      });
      res.status(200).json({ message: "User created" });
      return;
  }
};
