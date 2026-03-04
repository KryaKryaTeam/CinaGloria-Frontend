import Email from "@/core/domain/value-object/Email";
import Request from "./Request";
import { Password } from "@/core/domain/value-object/Password";
import URLEnum from "../URLEnum";
import URLAddKey from "@/infrastructur/URLAddKey";

interface IDataRequest { 
    email: Email;
    password: Password;
    csrfToken?: boolean | string;   
}
export default class JWTChangeRequest extends Request<IDataRequest, true | Error> {

   async implementation(data: IDataRequest): Promise<Error | true> { 
    if (data.csrfToken === true) {
      data.csrfToken = await this.getCsrf();
    } else {
      throw new Error("CSRF token is required for this request");
    }
    const url = URLAddKey(URLEnum.LOGIN_LOCAL, "state", data.csrfToken as string);
    return new Promise((resolve, reject) => {
        if (!JWTChangeRequest.checkCanable()) {
            reject(new Error("Service worker not supported or not controlling the page"));
            return;
        }
        try {
            fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email.value,
        password: data.password.value,
      }),
    })
      .then((response) => response.json())
      .then((ServerData) => {
    // request on service worker to save token
    navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: "TOKEN",
        payload: ServerData.accessToken,
      });
    });
    resolve(true);
      })
      .catch((error) => {
        reject(error);
      })

        } catch (error) {
            reject(error);
        }
    }); 
}

    private static checkCanable(): boolean {
        if (!navigator.serviceWorker) return false;
        if (!navigator.serviceWorker.controller) return false;
        return true;
    }
}

// import Email from "@/core/domain/value-object/Email";
// import Request from "./Request";
// import { Password } from "@/core/domain/value-object/Password";
// import URLEnum from "../URLEnum";
// import { tr } from "zod/locales";


// interface IDataRequest { 
//     email: Email;
//     password: Password;
//     csrfToken?: boolean | string;   
// }
// export default class JWTChangeRequest extends Request<IDataRequest, true | Error> {

//    async implementation(data: IDataRequest): Promise<Error | true> { 
//     if (data.csrfToken === true) {
//       data.csrfToken = await this.getCsrf();
//     }
//     return new Promise((resolve, reject) => {
//         if (!JWTChangeRequest.checkCanable()) {
//           console.log("1")
//             reject(new Error("Service worker not supported or not controlling the page"));
//             return;
//         }
//         try {
//             fetch(URLEnum.LOGIN_LOCAL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: data.email.value,
//         password: data.password.value,
//       }),
//     })
//       .then((response) => response.json())
//       .then((ServerData) => {
//     // request on service worker to save token
//     navigator.serviceWorker.ready.then((registration) => {
//       registration.active?.postMessage({
//         type: "TOKEN",
//         payload: ServerData.accessToken,
//       });
//     });
//     resolve(true);
//       })
//       .catch((error) => {
//         console.log("2")
//         reject(error);
//       })

//         } catch (error) {
//           console.log("3")
//             reject(error);
//         }
//     }); 
// }

//     private static checkCanable(): boolean {
//         if (!navigator.serviceWorker) return false;
//         if (!navigator.serviceWorker.controller) return false;
//         return true;
//     }
// }