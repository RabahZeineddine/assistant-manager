import { AxiosResponse } from "axios";



export default class Helper {



    static downloadFile(content: any = "", type: string = "text/plain", fileName: string = "file") {
        const element = document.createElement("a");
        const file = new Blob([content], { type });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        element.remove();
    }


    static extractAxiosFileData(result: AxiosResponse) {
        const headers = result.headers;
        const name = headers["content-disposition"].split("filename=")[1];
        const type = headers["content-type"];
        return { name, type };
    }

}