import URLEnum from "../URLEnum";

interface requestWithCSRF { 
    csrfToken?: boolean | string;
}
export default abstract class Request<Data extends requestWithCSRF, Response> { 
    async getCsrf(): Promise<string> {
    let csrfToken: string = ""; 
    try {
      const response = await fetch(URLEnum.CSRF, {
        method: "GET"
      });
      const data = await response.json();
      if (data?.csrf) csrfToken = data.csrf;
      else console.warn("CSRF token not found in response");
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
    return csrfToken;
  }
   async execute(data: Data): Promise<Response>{
        try {
            return await this.implementation(data);
        } catch (error) {
            return Promise.reject("Network request failed");
        }
    };
    abstract implementation(data: Data): Promise<Response>;
}   