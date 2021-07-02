import mongoose, {Schema, Document} from 'mongoose';

export interface Device extends Document {
    name: string,
    type: {}
}

const DeviceSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'DeviceType',
        required: true
    },
    address: {
        type: String,
        required: false
    }
});

export default mongoose.model<Device>('Device', DeviceSchema, 'devices');
