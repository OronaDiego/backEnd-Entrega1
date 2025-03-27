import { connect } from "mongoose";

const MONGO_URL = 'db-conexion://localhost:27017/coderhouse';

export const initMongoDB = async ()=>{
    try {
        await connect(MONGO_URL);
    } catch (error) {
        throw new Error(error);
    }
}
