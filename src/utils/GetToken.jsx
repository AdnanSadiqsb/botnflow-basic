const getToken = () => {

    let token = localStorage.getItem('token') || '';

    if (token) {
        token = token.replace(/^"|"$/g, '');
    }

    return token;
}

export default getToken;
