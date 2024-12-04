const mongoose = require('mongoose');

const getconection = async () => {

    try {

        const url = 'mongodb://jperezre:Depechemode101@cluster0-shard-00-00.jd5fn.mongodb.net:27017,cluster0-shard-00-01.jd5fn.mongodb.net:27017,cluster0-shard-00-02.jd5fn.mongodb.net:27017/BD-peliculas?ssl=true&replicaSet=atlas-rvyvxk-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
    
        await mongoose.connect(url);
        console.log('conexion exitosa');

    } catch (error) {
        console.log(error);

    }
    
}

module.exports = {
    getconection

}
