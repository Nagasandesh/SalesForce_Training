import { LightningElement } from 'lwc';

export default class SampleRegistrationPage extends LightningElement {
    firstname=''
    lastname=''
    Email=''
    Country=''
    Phone=''
    fNameErrorMsg=''
    lNameErrorMsg=''
    phoneErrorMsg=''
    showTable=false
    validForm=false
    counter=1
    buttonId=1
    othersField=false
    showSubmitButton=true
    showSaveButton=false
    arr=[]
    

    handleChange(event){    
        if(event.target.value=="Others"){
            this.othersField=true
        }
        else{
            this.othersField=false
        }
    }


    handleSubmit(event){
        event.preventDefault()
        this.showTable = true;
        console.log('outside if');
        try {
            this.validationCheck(event);
            if(this.validForm){
                console.log('inside if');
                let fieldValues = {
                    id:this.counter,
                    firstname: event.target.fName.value,
                    lastname: event.target.lName.value,
                    Email: event.target.email.value,
                    Country: event.target.country.value,
                    Phone: this.handlePhoneDisplay(event),
                    Button:this.buttonId
                }
                this.arr.push(fieldValues)
                this.counter +=1
                this.buttonId +=1
                this.firstname=''
                this.lastname=''
                this.Email=''
                this.Country=''
                this.Phone=''
                this.showTable=true
                this.othersField=false
            }
        } catch(e) {
            console.log(e.stack);
        }
        
        console.log('method called');
    }
    
    validationCheck(event){
        event.preventDefault()
        this.firstname=event.target.fName.value
        this.lastname=event.target.lName.value
        this.Email=event.target.email.value
        this.Country=event.target.country.value
        this.Phone=event.target.phone.value
        // var regFirstName= /^[a-zA-Z]+ [a-zA-Z]+$/
        // var regPhone = /[0-9]{9}/

        if(this.firstname=='' && this.firstname.length== 0){
            this.fNameErrorMsg='This field is required'
        }
        // else if (this.firstname && !(this.firstname).test(regFirstName)){
        //     this.fNameErrorMsg='Enter Valid First Name'
        // }
        else{
            this.validForm=true
        }
        
        if(this.lastname=='' && this.lastname.length== 0){
            this.lNameErrorMsg='This field is required'
        }
        // else if (this.lastname && !(this.lastname).test(regFirstName)){
        //     this.lNameErrorMsg='Enter Valid Last Name'
        // }
        else{
            this.validForm=true
        }
        if(this.Phone== ''){
            this.phoneErrorMsg='This field is required'
        }
        // else if (this.Phone && !(this.Phone).test(regPhone)){
        //     this.phoneErrorMsg='Enter Valid Phone Number'
        // }
        else{
            this.validForm=true
        }
    }


    handlePhoneDisplay(event){
        event.preventDefault()
        let country_code=event.target.country.value;
        let phone_no=event.target.phone.value;
        
        
        if(country_code=="India"){
            this.Country=event.target.country.value;
            return this.Phone=`+91-${phone_no}`;
        }
        else if(country_code=="USA"){
            this.Country=event.target.country.value;
            return this.Phone=`+1-${phone_no}`;
        }
        else if(country_code=="Mauritius"){
            this.Country=event.target.country.value;
            return this.Phone=`+960-${phone_no}`;
        }
        else if(country_code=="Maldives"){
            this.Country=event.target.country.value;
            return this.Phone=`+230-${phone_no}`;
        }
        else if(country_code=="Nepal"){
            this.Country=event.target.country.value;
            return this.Phone=`+977-${phone_no}`;
        }
        else{
            return (this.Country=event.target.otherCountry.value,this.Phone=event.target.phone.value);
        }
    }

    handleEditButton(event){
        console.log('inside-editHandler')
        let editId=event.target.dataset.id
        // this.showSaveButton=true
        // this.showSubmitButton=false
        for(let i=1;i<this.arr.length;i++){
            console.log('inside-for')
            if(this.arr[i].id==editId){
                console.log('inside-if')
                this.firstname=this.template.querySelector('input[data-id="' + this.arr[i].firstname + '"]');
                console.log(this.firstname)
            //    this.firstname=this.arr[i].firstname
               this.lastname=this.arr[i].lastname
               if(this.Country==='Others'){
                this.othersField=true
                this.otherCountry=this.arr[i].Country
               }
               else{
                this.othersField=false
               }
               this.Email=this.arr[i].Email
               this.Phone=this.handlePhoneDisplay(this.arr[i].Phone)
            } 
        }



    }

    handleDeleteButton(event){
        let buttonId=event.target.dataset.id
        let newArr=[]
        for(let i=1;i<this.arr.length;i++){
            if(this.arr[i].id==buttonId){
               newArr= this.arr.splice(i-1,i)
            } 
        }
        this.arr=newArr
    }
}
