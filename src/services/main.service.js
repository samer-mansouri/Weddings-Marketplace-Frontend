import api from "./api";
import api1 from "./api1";

class MainService {

    //Annonces service
    getAllAnnonces() {
        return api.get("/get_annonces");
    }

    getAnnonce(id){
        return api.get(`/get_annonce/${id}`);
    }

    getAnnoncesByCategory(category){
        return api.get(`/get_annonces_by_category/${category}`);
    }

    getAnnoncesByUser(user){
        return api.get(`/get_annonces_by_user/${user}`);
    }

    createAnnonce(data){
        return api1.post("/post_annonce", data);
    }

    updateAnnonce(id, data){
        return api.put(`/update_annonce/${id}`, data);
    }

    deleteAnnonce(id){
        return api.delete(`/delete_annonce/${id}`);
    }

    //Categories service

    CreateCategory(data){
        return api.post("/create_category", data);
    }

    getAllCategories(){
        return api.get("/get_categories");
    }

    getCategoriesNames(){
        return api.get("/get_categories_names");
    }

    getCategory(id){
        return api.get(`/get_category/${id}`);
    }

    updateCategorie(id, data){
        return api.put(`/update_category/${id}`, data);
    }

    deleteCategory(id){
        return api.delete(`/delete_category/${id}`);
    }

    //User service 

    getUser(id){
        return api.get(`/user/${id}`);
    }

    getAllUsers(){
        return api.get("/users");
    }

    deleteUser(id){
        return api.delete(`/deleteuser/${id}`);
    }

    updateUser(data){
        return api.put(`/updateuser`, data);
    }

    //Reservation service

    createReservation(data){
        return api.post("/create_reservation", data);
    }

    getUserReservations(user){
        return api.get(`/get_user_reservations`);
    }

    getReceiverReservations(receiver){
        return api.get(`/get_receiver_reservations`);
    }

    deleteReservation(id){
        return api.delete(`/delete_reservation/${id}`)
    }
    
    //Message Service
    getMessages(data){
        return api.post(`/get_messages`, data);
    }

    addMessage(data){
        return api.post(`/add_message`, data);
    }





}

export default new MainService();