import { Request, Response } from "express";
import { StateService } from "../services/stateService";

const nigeriaStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];


export class StateController {
  static async getAllStates(_: Request, res: Response) {
    try {
      const states = await StateService.getAllStates();
      res.status(200).json(states);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  }

  static async seedStates(req: Request, res: Response) { 
    try {
      const result = await StateService.seedStates(req.body.states || nigeriaStates);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error", error });
    }
  }
}