import mongoose from "mongoose";

const SensorDataSchema = mongoose.Schema({
    temperature: {
        type: String,
        required: true,
    },
    humidity: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Sensor", SensorDataSchema);
