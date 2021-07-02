import mongoose, {Schema, Document} from 'mongoose';

export interface DeviceType extends Document {
    name: string,
    type: 'thermometer'
}

const DeviceTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['thermometer']
    }
});

export default mongoose.model<DeviceType>('DeviceType', DeviceTypeSchema, 'deviceTypes');
