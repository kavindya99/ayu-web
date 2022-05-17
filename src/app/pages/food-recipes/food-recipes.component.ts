import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { RecipeDetails } from 'src/app/recipe-details';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-food-recipes',
  templateUrl: './food-recipes.component.html',
  styleUrls: ['./food-recipes.component.scss']
})

export class FoodRecipesComponent implements OnInit {

  // recipe$!:Observable<any[]>;
  public recipeForm!:FormGroup;
  public recipes:any;  
  public ingreds:any;
  public count:number=0;
  public stepcount:number=0;
  public steps:any;
  public amount:any;

  recipe=new RecipeDetails();
  p: number = 1; key:string=''; focus: any; focus2: any;
  constructor(private formBuilder:FormBuilder,private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    // this.getAllBooks();
    // this.init();
    this.getRecipes();
  }

  private getRecipes(): void{
    this.service.getAllRecipes().subscribe(result=>{
      this.recipes = result;
      console.log(result);
      let i=1;
      this.steps=result[i].steps.split(',');
      this.stepcount=result.count;
      // console.log(result);
      this.count=result[i].steps.split(',').count;
      // console.log(result[0].steps.split(','));
      // console.log(result);
      this.ingreds=result[i].ingredients.split(',');
      //this.amount=this.ingreds.split(':')[1];
      console.log(this.steps);
      //console.log(this.amount);
    });
  }

  // level = [
  //   {
  //     id: 1,
  //     name: 'Cooked Food',

  //   },
  //   {
  //     id: 2,
  //     name: 'UnCooked Food',

  //   },
  //   {
  //     id: 3,
  //     name: 'Sweet Items',

  //   },
  //   {
  //     id: 4,
  //     name: 'Beverages',

  //   },
  // ];

  // mySelect = '2';
  // selectedValue: any;

  // selectChange() {
  //   this.selectedValue = this.service.getDropDownText(this.mySelect, this.level)[0].name;
  // }

  // addVacancy(){


  //   const fd = new FormData();
  //   fd.append('Name',this.recipe.Name);
  //   fd.append('Category',this.selectedValue);
  //   fd.append('Image',this.recipe.Image);
  //   fd.append('Steps',this.recipe.Steps);
  //   fd.append('Ingredients',this.recipe.Ingredients);


  //   console.log(this.recipe.Name);
  //   console.log(this.recipe.Image);
  //   console.log(this.recipe.Steps);
  //   console.log(this.recipe.Ingredients);


  //   this.http.post('https://localhost:5001/api/FoodRecipes',fd,{
  //     reportProgress:true,
  //     observe:'events'

  //   }).subscribe((event:HttpEvent<any>) =>{
  //     switch (event.type){
  //       case HttpEventType.Sent:
  //         console.log('Request has been made!');
  //         break;
  //       case HttpEventType.ResponseHeader:
  //         console.log('Response header has been received!');
  //         break;
  //       case HttpEventType.UploadProgress:
  //       break;
  //       case HttpEventType.Response:
  //       console.log(event);
  //     }
  //   })

  // }

  public saveRecipe():void{
    this.service.addRecipe(this.recipeForm.value).subscribe(result=>{
      alert("new recipe added");
    });
  }
  
  // private init(): void{
  //   this.recipeForm=this.formBuilder.group({
  //     name:[],
  //     type:[],
  //     ingredients:[],
  //     steps:[],
  //     image:[],
  //   });
  // }

  editInfo(content1: any) {
     this.modalService.open(content1, { centered: true });
   }

   addInfo(content2: any) {
    this.modalService.open(content2, { centered: true });
  }

  viewSteps(content4: any) {
    this.modalService.open(content4, { centered: true });
  }

  viewImage(content3: any) {
   this.modalService.open(content3, { centered: true });
 }

  ErrorMessage () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: "Edit Failed"
    })
  }

  SuccessMessage () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'success',
      title: "Editted Successfully"
    })
  }

  ErrorAdd () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: "Adding Failed"
    })
  }

  SuccessAdd () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'success',
      title: "Added Successfully"
    })
  }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Remove Recipe</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      
      html:
        'Do you want to Remove this recipe?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Remove',
      cancelButtonText:
        'Cancel',      
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
