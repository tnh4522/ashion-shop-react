const convertUrl = (url) => {
    if(url) {
        return url.replace("/media/", "/api/static/");
    }
}
export default convertUrl;