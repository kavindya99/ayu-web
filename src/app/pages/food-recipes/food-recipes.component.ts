import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { RecipeDetails } from 'src/app/recipe-details';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-food-recipes',
  templateUrl: './food-recipes.component.html',
  styleUrls: ['./food-recipes.component.scss']
})

export class FoodRecipesComponent implements OnInit {

  // recipe$!:Observable<any[]>;
  
  updateFoodForm:any;
  addFoodForm:any;
  recipe=new RecipeDetails();
  p: number = 1; key:string=''; focus: any; focus2: any;
  recipes: any;
  getFoodRecipeForDelete: any;

  apiUrl = environment.backend_url;
  updateFoodID: any;
  showAllData: any;

  constructor(private formBuilder:FormBuilder,private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.foodFormValidations();
    this.getRecipes();
    this.updateFoodFormValidations();
  }

  private getRecipes(): void{
    this.service.getAllRecipes().subscribe(result=>{
      this.recipes = result;
      console.log(result);
    });
  }

  //add food

  foodFormValidations() {

    this.addFoodForm = new FormGroup({ 
      'Name': new FormControl(null),
      'Category': new FormControl(null),
      'Ingredients': new FormControl(null),
      'Steps': new FormControl(null)
    });
  }

  addFoodRecipe(){

    console.log(this.addFoodForm.value);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    const fd = new FormData();
    fd.append('Name',this.addFoodForm.value.Name);
    fd.append('Category',this.addFoodForm.value.Category);
    fd.append('Ingredients',this.addFoodForm.value.Ingredients);
    fd.append('Steps',this.addFoodForm.value.Steps);

    this.http.post(this.apiUrl+'/api/FoodRecipes',fd,{
      headers: headers,
      reportProgress:true,
      observe:'events',

    }).subscribe((event:HttpEvent<any>) =>{
      switch (event.type){
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
        break;
        case HttpEventType.Response:
        console.log(event);
      }
      this.SuccessMessage("Food Recipe Added Successfully");
      this.modalService.dismissAll();
      this.getRecipes();
    })
  }

  //edit food

  response:any = [];

  updateFoodFormValidations() {

    this.updateFoodForm = new FormGroup({ 
      'Name': new FormControl(null),
      'Category': new FormControl(null),
      'Ingredients': new FormControl(null),
      'Steps': new FormControl(null)
    });
}

  getMedcineForEdit(){
    this.http.get(this.apiUrl+'/api/FoodRecipes/food-by-id/'+this.updateFoodID,{observe: 'response'}).subscribe(res=>{
      this.response = res;
      console.log(this.response.status);
      console.log(this.updateFoodID);
      console.log(this.response.body);
        //console.log(this.selected_medicine_response.medicine);
        if(this.response.status==200){
          this.updateFoodForm.patchValue({
            Name:this.response.body.name,
            Category:this.response.body.category,
            Ingredients:this.response.body.ingredients,
            Steps:this.response.body.steps,
          })
        } else{
          console.log(this.response.status);
        }       
    })
  }

  updateFood(){
    console.log(this.updateFoodForm.value.Medicine);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    const fd = new FormData();
    console.log(this.updateFoodID);
    fd.append('Id',this.updateFoodID);
    fd.append('Name',this.updateFoodForm.value.Name);
    fd.append('Category',this.updateFoodForm.value.Category);
    fd.append('Ingredients',this.updateFoodForm.value.Ingredients);
    fd.append('Steps',this.updateFoodForm.value.Steps);
  this.http.post(this.apiUrl+'/api/FoodRecipes/update-food-recipe',fd,{
    headers: headers,
    reportProgress:true,
    observe:'events',

  }).subscribe((event:HttpEvent<any>) =>{
    switch (event.type){
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        break;
      case HttpEventType.UploadProgress:
      break;
      case HttpEventType.Response:
      console.log(event);
      this.SuccessMessage("Successfully updated the medicine");
    }
    this.modalService.dismissAll();
    this.getRecipes();    
  });
  //this.http.put(this.apiUrl+'/api/Medicines/'+this.updateMedicineID,fd,{ headers: headers }).subscribe(results =>console.log(results));
}

//delete recipe
  del_res:any;

  deleteRecipe(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/api/FoodRecipes/delete/'+this.getFoodRecipeForDelete
    ,{
      headers: headers,
      reportProgress:true,
      observe:'events',
  
    }
    ).subscribe(res=>{
      console.log(res);
      this.del_res = res;
      console.log(this.del_res.status);
      if (this.del_res.status == 200){
        //this.getMedicineById();
        console.log("deleted")
        this.SuccessMessage("Successfully removed the Recipe");
      }
      else{
        console.log('failed');
        this.ErrorMessage("Recipe Deletion failed");
      }
      this.modalService.dismissAll();
      this.getRecipes();
    })
  }

  getMedicineById(){
    this.http.get(this.apiUrl+'/api/Medicines/getMediById/'+this.getFoodRecipeForDelete,{observe: 'response'}).subscribe(res=>{
        console.warn(res);
        this.getFoodRecipeForDelete = res;
        if (this.getFoodRecipeForDelete.status === 0){
          console.log("Error!! ");
        }
        else{
          this.showAllData = this.getFoodRecipeForDelete.data;
  
        }
    })
  }


  

  editInfo(content1: any,id:any) {
    this.updateFoodID=id;
     this.modalService.open(content1, { centered: true });
   }

   addInfo(content2: any) {
    this.modalService.open(content2, { centered: true });
  }

  openDelete(content6: any,id: any) {
    this.getFoodRecipeForDelete = id;
    this.modalService.open(content6, { centered: true });
  }

  viewSteps(content4: any) {
    this.modalService.open(content4, { centered: true });
  }

  viewImage(content3: any) {
   this.modalService.open(content3, { centered: true });
 }

  ErrorMessage (text:any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: text
    })
  }

  SuccessMessage (text:any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'success',
      title: text
    })
  }

  

  // addSteps(){
  //   let row = document.createElement('div');  
  //     row.className = 'row';
  //     row.innerHTML = `
  //     <br>
  //     <div class="pb-4">
  //     <input type="text" class="inputs text-color form-control" id="steps" placeholder="Steps">
  //     </div>`;
  //     document.querySelector('#AddField')?.appendChild(row);
  // }

  // addIngredients(){
  //   let row = document.createElement('div');  
  //     row.className = 'row';
  //     row.innerHTML = `
  //     <br>
  //     <div class="pb-4">
  //     <input type="text" class="inputs text-color form-control" id="ingredients" placeholder="Ingredients">
  //     </div>`;
  //     document.querySelector('#AddNewField')?.appendChild(row);
  // }

}
