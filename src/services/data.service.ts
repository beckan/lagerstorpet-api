import mongoose from "mongoose";

interface DataModel {
  device: string;
  unit: "celcius";
  value: string;
  date?: Date;
}

class DataService {
  public async insert(data: DataModel) {
    const Device = mongoose.model("Data");

    if (!data.date) {
      data.date = new Date();
    }

    try {
      await Device.create(data);
    } catch (error) {
      return false;
    }

    return true;
  }
}

const instance = new DataService();

export default instance;
