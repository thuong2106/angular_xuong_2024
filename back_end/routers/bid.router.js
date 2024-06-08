import { Router } from "express";
import BidsController from "../controllers/bids.js";

const bidsRouter = Router();

const bidsController = new BidsController();

bidsRouter.post("/", bidsController.createBid);

export default bidsRouter;