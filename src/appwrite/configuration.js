import config from '../config/config';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client 
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.log('Appwrite createPost error', error)
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(error){
            console.log('Appwrite updatePost error', error);
            throw error;
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        }catch(error){
            console.log('Appwrite deletePost error', error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        }catch(error){
            console.log('Appwrite getPost error', error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        }catch(error){
            console.log('Appwrite getPosts error', error)
            return false;
        }
    }

    // file upload methods
    async uploadFile(file){
        // console.log(file, 'file is updateing')
        try{
            return await this.bucket.createFile(
                config.appwriteBucketID,
                ID.unique(),
                file
            )
        }catch(error){
            console.log('Appwrite uploadFile error', error)
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketID,
                fileId 
            )
            return true;
        }catch(error){
            console.log('Appwrite deleteFile error', error)
            return false;
        }
    } 

    getFilePreview(fileId){
        // console.log(fileId, 'file id in configurationjs')
        return this.bucket.getFilePreview(
            config.appwriteBucketID,
            fileId
        )
    }

}

const service = new Service();

export default service;