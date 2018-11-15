import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Profile } from "../../model/profile/profile.model";


@Injectable()

export class PerfilService{

    private profileList = this.db.list<Profile>('Profile');


    constructor(private db : AngularFireDatabase){}


    newProfile(profile : Profile){
       return this.profileList.push(profile);
    }

    getProfile(uid: string){
        return this.db.list('/Profile/',ref =>  ref.orderByChild("user_id").equalTo(uid)).valueChanges();
    }
}
