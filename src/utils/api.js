import axios from 'axios';
import { GOOGLE_KEY } from 'constants/url.constant';

const request = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: {
        key: GOOGLE_KEY
    }
})
export default request
