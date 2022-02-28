const API = process.env.REACT_APP_API;

let token = window.localStorage.getItem('token') || '';

const headerPost = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}
const headerGet = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}
const headerPut = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}

const headerDelete = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}

export const ReactAPI = {
    //* USER REQUESTS */
    async signUp(data) {
        
        const response = await fetch(`${API}/customers`, {
            method: 'POST',
            headers: headerPost,
            body: JSON.stringify({
                ...data
            })
        });

        const json = await response.json();
        return json;
    },

    async verifyEmail(tokenVerify) {
        const response = await fetch(`${API}/auth/verify-email`, {
            method: 'POST',
            headers: headerPost,
            body: JSON.stringify({
                hash: tokenVerify
            })
        });
        const json = await response.json();
        return json;
    },

    async signIn(data) {
        const response = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: headerPost,
            body: JSON.stringify(data)
        });

        const user = await response.json();
        
        headerGet.Authorization = `Bearer ${user.data.token}`;
        headerPost.Authorization = `Bearer ${user.data.token}`;
        return user;
    },
    async registerService(data){
        const response = await fetch(`${API}/reqservices/`, {
            method: 'POST',
            headers: headerPost,
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    },
    async getServicesByUserId(userId) {
        const response = await fetch(`${API}/customers/${userId}/services`, {
            method: 'GET',
            headers: headerGet
        });
        const services = await response.json();
        return services;
    },
    async getServiceById(serviceId) {
        const response = await fetch(`${API}/reqservices/${serviceId}`, {
            method: 'GET',
            headers: headerGet
        });
        const service = await response.json();
        return service;
    },
    async updateServiceById(data) {
        
        const response = await fetch(`${API}/reqservices/${data.serviceId}`, {
            method: 'PUT',
            headers: headerPut,
            body: JSON.stringify({
                ...data.newData
            })
        });
        const json = await response.json();
        return json;
    },
    async deleteServiceById(serviceId) {
        const response = await fetch(`${API}/reqservices/${serviceId}`, {
            method: 'DELETE',
            headers: headerDelete,
        });
        const serviceDeleted = await response.json();
        return serviceDeleted;
    },
    //* UPLOAD FILES REQUESTS */
    async uploadFile(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${API}/upload/file`, {
            method: 'POST',
            body: formData
        });
        const json = await response.json();
        return json.data.url;
    },
    //pagos
    async registerCard(data) {
        const response = await fetch(`${API}/payment/card`, {
            method: 'POST',
            headers: headerPost,
            body: JSON.stringify(data)
        });
        const cardResult = await response.json();
        return cardResult;
    },

    async registerPayment(data) {
        const response = await fetch(`${API}/payment`, {
            method: 'POST',
            headers: headerPost,
            body: JSON.stringify(data)
        });
        const paymentResult = await response.json();
        return paymentResult;
    },
}