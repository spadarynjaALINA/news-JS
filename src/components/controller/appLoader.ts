import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'b9edd1fd0ae843eca008c8144bb5a289', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
