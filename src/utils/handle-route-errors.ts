import mongoose from 'mongoose';

const handleRouteError = (error, res) => {
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).send({
            status: 'validationError',
            message: error.message,
            errors: error.errors
        });
        return;
    }
    
    res.status(500).send({
        status: 'error',
        message: error.message
    });
};

export default handleRouteError;