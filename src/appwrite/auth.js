import config from "../config/config";
// import {Client, Account, ID} from 'appwrite';

// export class AuthService{
//     client = new Client();
//     account;

//     constructor(){
//         this.client
//             .setEndpoint(config.appwriteURL)
//             .setProject(config.appwriteProjectId);

//         this.account = new Account(this.client)
//     }

//     async createAccount({email, password, name}){
//         try {
//             const userAccount = await this.account.create(ID.unique(), email, password, name);
//             if(userAccount){
//                 // Another method
//                 return this.login({email, password})
//             }else{
//                 return userAccount
//             }
//         } catch (error) {
//             console.log('Appwrite Service Account Creation Error', error)
//             throw error;
//         }
//     }

//     async login({email, password}){
//         try{
//             return await this.account.createEmailSession(email, password)
//         }catch(error){
//             console.log('Appwrite Service Login Error', error)
//             throw error;
//         }
//     }

//     async getCurrentUser(){
//         try{
//            return await this.account.get()
//         }catch(error){
//             console.log('Appwrite Service Current User Error', error)
//             throw error;
//         }

//         return null;
//     }

//     async logout(){
//         try{
//             await this.account.deleteSessions()
//         }catch(error){
//             console.log('Appwrite Serive Logout Error', error)
//             throw error;
//         }
//     }
// }

// const authService = new AuthService()

// export default authService;

import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        // console.log('coming inn')
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

