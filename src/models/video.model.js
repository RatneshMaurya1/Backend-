import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
        videoFile:{
            type:true,
            required: true
        },
        thumbnail:{
            type:true,
            required: true
        },
        title:{
            type:true,
            required: true
        },
        discripytion:{
            type:true,
            required: true
        },
        duration:{
            type: Number,
            required: true
        },
        views:{
            type: Number,
            default:0
        },
        isPublished:{
            type: Boolean,
            default:true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "user"
        },
    }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)