const { Router } = require("express");
const { BULK_API, ONE_API, SCHEMA_API } = process.env;

module.exports.initRecordListModel = (
  mongoose,
  schemaInitializer,
  recordSchema,
  _recordNameSingular
) => {
  let Record, getRecordSchema, recordName, router;
  Record = schemaInitializer(mongoose);
  getRecordSchema = recordSchema;
  recordName = _recordNameSingular;
  router = Router();

  /***************** Schema API Methods *****************/
  router.get(SCHEMA_API + "/", async (req, res) => {
    try {
      res.status(200).json(getRecordSchema().obj);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  /***************** Bulk API Methods *****************/
  router.get(BULK_API, async (req, res) => {
    try {
      let refPaths = "";
      for (let [key, value] of Object.entries(getRecordSchema().obj)) {
        if (value.ref) {
          if (refPaths === "") refPaths = key.toString();
          else refPaths += " " + key.toString();
        }
      }
      let recordList;

      refPaths
        ? (recordList = await Record.find().populate(refPaths, "name"))
        : (recordList = await Record.find());

      if (!recordList) throw new Error(`No ${recordName}s found`);
      res.status(200).json(recordList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.delete(BULK_API, async (req, res) => {
    const recordIdArray = req.body.Ids;
    try {
      const removed = await Record.deleteMany({ _id: { $in: recordIdArray } });
      if (!removed) throw Error("Something went wrong ");
      res.status(200).json(removed);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  /***************** One API Methods *****************/
  router.get(ONE_API + "/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const record = await Record.findOne({ _id: id }).exec();

      for (let [key, value] of Object.entries(getRecordSchema().obj)) {
        if (value.ref) await record.populate(key, "name");
      }

      if (!record) throw new Error(`No ${recordName}s found`);
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post(ONE_API, async (req, res) => {
    for (prop in req.body)
      if (req.body[prop] === "") req.body[prop] = undefined; // This will blank in db
    const newRecord = new Record(req.body);
    try {
      const record = await newRecord.save();
      if (!record)
        throw new Error(`Something went wrong saving the ${recordName}`);
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put(ONE_API, async (req, res) => {
    for (prop in req.body)
      if (req.body[prop] === "") req.body[prop] = undefined; // This will blank in db
    const newRecord = new Record(req.body);
    try {
      newRecord.isNew = false;
      const record = await newRecord.save();
      if (!record)
        throw new Error(`Something went wrong saving the ${recordName}`);
      res.status(200).json(record);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.delete(ONE_API + "/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const removed = await Record.findByIdAndDelete(id);
      if (!removed) throw Error("Something went wrong ");
      res.status(200).json(removed);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
