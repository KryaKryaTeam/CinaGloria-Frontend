export default interface IUserNetwork {
  postLoginData: (email: string, password: string) => void;
  getDataFromServiceWorker: () => Promise<any>;
}
