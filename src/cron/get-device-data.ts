import DeviceService from "../services/device.service";
import getDeviceStatus from "../utils/get-device-status";
import DataService from "../services/data.service";

export async function getDeviceData() {
  const devices = await DeviceService.fetchAll();

  for (let i = 0; i < devices.length; i++) {
    const device = devices[i];

    try {
      if (device.type._id == "602fe1a3faf0ae352d1260a1" && device.address) {
        const deviceStatus = await getDeviceStatus(`${device.address}:3000`);

        await DataService.insert({
          device: device._id,
          unit: "celcius",
          value: deviceStatus.temperature,
        });
      }
    } catch {}
  }
}
