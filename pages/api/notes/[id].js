import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

const controller = async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);
        if (!note) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          newe: true,
          runValidators: true,
        });
        if (!note) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedNote = await Note.deleteOne({ _id: id });
        if (!deletedNote) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deletedNote });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default controller;
