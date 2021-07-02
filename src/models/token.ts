import mongoose, {Schema, Document} from 'mongoose';

export interface Token extends Document {
    name: string,
    token: string
}

const TokenSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

export default mongoose.model<Token>('Token', TokenSchema, 'tokens');
