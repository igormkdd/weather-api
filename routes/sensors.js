import express from "express";
import verify from "./verifyToken.js";
import {
    getSensorsInfo,
    getAllRecords,
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord,
} from "../controllers/sensors.js";

const router = express.Router();

router.get("/", verify, getSensorsInfo);
router.get("/dht", verify, getAllRecords);
router.get("/dht/:id", verify, getRecord);
router.post("/dht", verify, createRecord);
router.delete("/dht/:id", verify, deleteRecord);
router.patch("/dht/:id", verify, updateRecord);

export default router;
