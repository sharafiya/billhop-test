import http from "./http-common";
class JokeDataService {
  getJoke(val){
    return http.get(`/${val}`);
    
  }
}
export default new JokeDataService();