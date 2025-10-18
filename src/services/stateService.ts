import State from "../models/State";


export class StateService {
  static async getAllStates() {
    try {
    const states = await State.find({}, { _id: 0, name: 1 }).sort({ name: 1 });

    // Extract just the names into an array
    const stateNames = states.map((s) => s.name);
      return {
        success: true,
        count: stateNames.length,
        data: stateNames
      };
    } catch (error) {
      throw new Error("Server Error");
    }
  }

  static async seedStates(states: string[]) {
    try {
      // Check if states already exist
      const existing = await State.countDocuments();
      if (existing > 0) {
        return { success: false, message: "States already exist in the database." };
      }

      // Insert all states
      const statesData = states.map((name) => ({ name }));
      await State.insertMany(statesData);

      return { success: true, message: "All states inserted successfully!" };
    } catch (error) {
      return { success: false, message: "Server error", error };
    }
  }
}