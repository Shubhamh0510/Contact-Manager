import axios from "axios"

export class ContactServices{
  
    static serverURL="http://localhost:9000"

    static createContact(contact){
        let dataURL=`${this.serverURL}/contact`

        return axios.post(dataURL,contact)
        
    }

    static getGroup(){
        let dataURL = `${this.serverURL}/group`

        return axios.get(dataURL)
    }

    static getAllContacts(){
        let dataURL=`${this.serverURL}/contact`

        return axios.get(dataURL)
    }

    static getContact(contactId){
        let dataURL = `${this.serverURL}/contact/${contactId}`;

        return axios.get(dataURL);

    }

    static updateContact(contactId,contact){
        let dataURL = `${this.serverURL}/contact/${contactId}`;

        return axios.put(dataURL,contact);
    }

    static deleteContact(contactId){
        let dataURL = `${this.serverURL}/contact/${contactId}`;

        return axios.delete(dataURL);
    }

}