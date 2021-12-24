import mongoose from "mongoose";

const Product = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    pict: {
        type: String
    },
    published: {
        type: Boolean
    }

}, {
    timestamps: true
});

Product.method("toJSON", function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject()
    object.id = _id
    return object
})

export default mongoose.model('Products', Product);