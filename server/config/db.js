import mongoose from "mongoose"
import colors from "colors"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mangodb database ${conn.connection.host}`.bgMagenta.white);
    } catch (err) {
        console.log(`error in Mongodb ${err}`.bgRed.white);
    }
}

export default connectDB;