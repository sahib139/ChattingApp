class CrudRepository{
    
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async get(Id){
        try {
            const response = await this.model.findById(Id);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(Id,data){
        try {
            const response = await this.model.findByIdAndUpdate(Id,data,{new:true});
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(Id){
        try {
            const response = await this.model.findByIdAndDelete(Id);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = CrudRepository;