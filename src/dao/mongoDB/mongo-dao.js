 export default class MongoDao{
    constructor(model){
        this.model= model;
    }

    getAll = async() => {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(error)
        }
    };

    getById = async (id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    create = async (product) =>{
        try {
            return await this.model.create(product);
        } catch (error) {
            throw new Error(error)
        }
    };

    update = async(id, obj) =>{
        try {
            return await this.model.findByIdAdnUpdate(id,obj, {new:true});
        } catch (error) {
            throw new Error(error);
        }
    };

    delete = async (id) => {
        try {
            return await this.model.findByIdAdnDelete(id);
        } catch (error) {
            throw new Error(error);
        }
    };
}