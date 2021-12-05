export interface IOptions {
  [key: string]: string;
}

export type TNewsJSON<T>= {
    [key:string]: T;
}[];
export interface INewsJSON {
    sources: TNewsJSON<string>;
    status: string;
    articles: TNewsJSON<string>;
    totalResults: number;
}
class Loader {
  public options: IOptions;
public baseLink:string

    constructor(baseLink:string, options:IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }:{endpoint:string, options?: IOptions },
        callback:(data:INewsJSON)=> void= () =>  {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options:IOptions, endpoint:string):string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method:string, endpoint:string, callback:(data:INewsJSON)=> void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
