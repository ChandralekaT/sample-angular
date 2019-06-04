import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Candidate';
  nestedForm:any=FormGroup;
  public userFile:any=File;

  boards=[{'id':1,'name':'CBSE'},{'id':2,'name':'ICSE'},{'id':3,'name':'IB'},
{'id':4,'name':'STATEBOARD'}];
/*  systems=[{'id':'Scale 10 grading system','name':'Scale 10 grading system'},
{'id':'Scale 4 grading system','name':'Scale 10 grading system'},
{'id':'% Marks of 100 Maximum','name':'% Marks of 100 Maximum'}]*/

  constructor(private fb:FormBuilder,private userService:UserService){
    this.nestedForm = this.fb.group({

      address: this.fb.array([this.addAddressGroup()])
    });
   }

   addAddressGroup() {
    return this.fb.group({
      primaryFlg: [],
      streetAddress: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      zipcode: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]]
    });
  }

  addAddress() {
    this.addressArray.push(this.addAddressGroup());
  }
  removeAddress(index) {
    this.addressArray.removeAt(index);
  }
  get addressArray() {
    return <FormArray>this.nestedForm.get('address');
  }

 
   /////////////////////////////////////////////////////////////
   saveForm(submitForm:FormGroup){
     if(submitForm.valid){
     // console.log(submitForm.value);
     // this.reactiveForm.reset();
      const user =submitForm.value;
      const formData=new FormData();
      formData.append('user',JSON.stringify(user));
      formData.append('file',this.userFile);
      this.userService.saveUserProfile(formData).subscribe((response=>{
        console.log(response);
      }))
     }else{
      this.validateFormFields(submitForm);
     }
   }

   validateFormFields(submitForm:FormGroup){
      Object.keys(submitForm.controls).forEach(field=>{
        const control=submitForm.get(field);
        if(control instanceof FormControl){
          control.markAsTouched({
            onlySelf:true
          });

          }else if(control instanceof FormGroup){
            this.validateFormFields(control);
          }
        }
      )}
              
      onSelectFile(event){
        const file=event.target.files[0];
        this.userFile=file;
      }
      onSelectSsc(event){
        const file=event.target.files[0];
        this.userFile=file;
      }
      onSelectInter(event){
        const file=event.target.files[0];
        this.userFile=file;
      }
      
   }
  

