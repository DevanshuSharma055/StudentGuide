import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.DatabaseUrl}/${process.env.DatabaseName}`);
    console.log('db connection done')
  } catch (error) {
    console.error("db connection failed", error);
  }
};
export default dbConnection;
