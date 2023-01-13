import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL, uploadBytes, UploadMetadata, getMetadata, listAll } from "@angular/fire/storage";
import { Auth, sendPasswordResetEmail, signOut} from '@angular/fire/auth';



export interface ImageMetadata{
  owner:string,
  email:string,
  comment:string,
  timestamp:number
}

export interface ImageDataObj{
  url:string,
  metadata:ImageMetadata
}

@Injectable({
  providedIn: 'root'
})
export class ImagestorageService {

  readonly storage = getStorage();
  constructor(public auth:Auth) { }


  async getImage(id:string):Promise<ImageDataObj | null> {
    const pathReference = ref(this.storage, id);
    const metadata = await getMetadata(pathReference);
    const url = await getDownloadURL(pathReference);


    if(!metadata.customMetadata)
    {
      console.error("Invalid ID: " + id)
      return null;
    }

    const custommetadata:ImageMetadata = {
      owner: metadata.customMetadata['owner'] ? metadata.customMetadata['owner'] : "",
      email: metadata.customMetadata['email'] ? metadata.customMetadata['email'] : "",
      comment: metadata.customMetadata['comment'] ? metadata.customMetadata['comment'] : "",
      timestamp: metadata.customMetadata['timestamp'] ? Number(metadata.customMetadata['timestamp']) : 0,
    }

    return {url:url, metadata:custommetadata}
    
  }

  async getNewestImage(){
    console.log("lets go")
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, '');

    // Find all the prefixes and items.
    let list = await listAll(listRef);

    let id:string | null = null;
    list.items.forEach((itemRef) => {
      // All the items under listRef.
      id = String(itemRef.fullPath);
      console.log(itemRef.fullPath);
    });
    if(id){
      return this.getImage(id);
    } else {
      return null;
    }
  }


  async uploadImage(file:any, owner:string, email:string, comment:string){
    let timestamp:number = Date.now();

    let filename:string = String(timestamp);

    const metadata:UploadMetadata = {
      customMetadata:{
        owner:owner,
        email:email, 
        comment:comment,
        timestamp:String(timestamp)
      }
    };

    const storage = getStorage();
    const storageRef = ref(storage, filename);
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log(filename + " uploaded.");
    });

    return
  }
}
