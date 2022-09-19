import axios from "axios";

const instance=axios.create({
    baseURL:"/openApi/restful/"
});

export default instance;