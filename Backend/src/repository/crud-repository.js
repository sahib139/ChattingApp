class CrudRepository{
    
    constructor(model){
        this.model = model;
    }

    async create(data){
        try {
            const user = await this.model.create(data);
            return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async get(Id){
        try {
            const user = await this.model.findById(Id);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async update(Id,data){
        try {
            const user = await this.model.findByIdAndUpdate(Id,data,{new:true});
            return user;
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