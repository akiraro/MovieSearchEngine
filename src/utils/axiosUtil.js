import axios from "axios";

const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
	// Do any authorization configuration here like cookie, token, etc
	
	return config;
});


export { httpClient };