import SensorData from "../models/SensorData.js";

export const getSensorsInfo = (req, res) => {
    res.send("SENSORS INFO");
};

export const getAllRecords = async (req, res) => {
    try {
        const records = await SensorData.find();
        res.status(200).json(records);
    } catch (error) {
        res.json({ message: error });
    }
};

export const getRecord = async (req, res) => {
    try {
        const record = await SensorData.findById(req.params.id);
        res.json(record);
    } catch (error) {
        res.json({ message: error });
    }
};

export const createRecord = async (req, res) => {
    const record = new SensorData({
        temperature: req.body.temperature,
        humidity: req.body.humidity,
    });

    record
        .save()
        .then((result) => {
            res.send(result);
            console.log("RECORD INSERTED:\n" + record);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const deleteRecord = async (req, res) => {
    try {
        const removedRecord = await SensorData.deleteOne({ _id: req.params.id });
        res.json(removedRecord);
    } catch (err) {
        res.json({ message: err });
    }
};

export const updateRecord = async (req, res) => {
    try {
        const updateRecord = await SensorData.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    temperature: req.body.temperature,
                    humidity: req.body.humidity,
                },
            }
        );
        res.json(updateRecord);
    } catch (err) {
        res.json({ message: err });
    }
};
