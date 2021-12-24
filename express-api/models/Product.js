import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

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
    slug: {
        type: String,
        slug: "title",
        unique: true
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