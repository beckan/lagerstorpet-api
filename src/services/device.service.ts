import mongoose from "mongoose";

class DevicesService {
  public devices = [];

  public async fetchAll() {
    const Device = mongoose.model("Device");

    try {
      this.devices = await Device.find({}).populate("type");
    } catch (error) {
      this.devices = [];
      console.error(error);
    }

    return this.devices;
  }
}

const instance = new DevicesService();

export default instance;
