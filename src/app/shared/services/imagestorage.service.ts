import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL, uploadBytes, UploadMetadata, getMetadata, listAll,updateMetadata } from "@angular/fire/storage";
import { Auth, sendPasswordResetEmail, signOut} from '@angular/fire/auth';
import { orderBy } from '@angular/fire/firestore';



export interface ImageMetadata{
  owner:string,
  email:string,
  comment:string,
  reaction:string,
  reactiontimestamp:number,
  timestamp:number
}

export interface ImageDataObj{
  url:string,
  id:string,
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
      console.error("Invalid File: " + id)
      return null;
    }

    const custommetadata:ImageMetadata = {
      owner: metadata.customMetadata['owner'] ? metadata.customMetadata['owner'] : "",
      email: metadata.customMetadata['email'] ? metadata.customMetadata['email'] : "",
      comment: metadata.customMetadata['comment'] ? metadata.customMetadata['comment'] : "",
      reaction: metadata.customMetadata['reaction'] ? metadata.customMetadata['reaction'] : "",
      reactiontimestamp: metadata.customMetadata['reactiontimestamp'] ? Number(metadata.customMetadata['reactiontimestamp']) : 0,
      timestamp: metadata.customMetadata['timestamp'] ? Number(metadata.customMetadata['timestamp']) : 0,
    }

    return {url:url, id:String(custommetadata.timestamp), metadata:custommetadata}
    
  }

  async getNewestImage(){
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, '');

    // Find all the prefixes and items.
    let list = await listAll(listRef);

    let id:string | null = null;
    let count = 0;
    list.items.forEach((itemRef) => {
      // All the items under listRef.
      id = String(itemRef.fullPath);
      count++;
    });
    console.log("Images Total: " + String(count));
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
        reaction:"",
        timestamp:String(timestamp)
      }
    };

    const storage = getStorage();
    const storageRef = ref(storage, filename);
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log(filename + " uploaded.");
    });

    return true;
  }

  async updateReaction(id:string,reaction:string){
    const timestamp: number = Date.now();
    const pathReference = ref(this.storage, id);
    const metadata = await getMetadata(pathReference);

    if(!metadata.customMetadata)
    {
      console.error("Invalid File: " + id)
      return false;
    }

    let newmetadata = metadata.customMetadata;
    newmetadata['reaction'] = reaction;
    newmetadata['reactiontimestamp'] = String(timestamp);

    updateMetadata(pathReference, {
      customMetadata:newmetadata
    })

    return true;

  }
}
