import api from "./api";

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
        return api.post("/post_annonce", data);
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
        return api.put(`/update_categorie/${id}`, data);
    }

    deleteCategory(id){
        return api.delete(`/delete_categorie/${id}`);
    }

    //Reservation service

    createReservation(data){
        return api.post("/post_reservation", data);
    }

    getUserReservations(user){
        return api.get(`/get_user_reservations/${user}`);
    }

    getReceiverReservations(receiver){
        return api.get(`/get_receiver_reservations/${receiver}`);
    }
        



}

export default new MainService();