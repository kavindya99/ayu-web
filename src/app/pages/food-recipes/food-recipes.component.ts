import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AyuService } from 'src/app/ayu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-recipes',
  templateUrl: './food-recipes.component.html',
  styleUrls: ['./food-recipes.component.scss']
})
export class FoodRecipesComponent implements OnInit {

  recipe$!:Observable<any[]>;
  public recipeForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private modalService: NgbModal,private service: AyuService) { }

  ngOnInit(): void {
    // this.getAllBooks();
    // this.init();
    this.recipe$=this.service.getRecipes();
    console.log(this.recipe$);
    this.init();
  }

  public saveRecipe():void{
    this.service.addRecipe(this.recipeForm.value).subscribe(result=>{
      alert("new recipe added");
    })
  }
  
  private init(): void{
    this.recipeForm=this.formBuilder.group({
      name:[],
      type:[],
      ingredients:[],
      steps:[],
      image:[],
    });
  }

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

  

  addSteps(){
    let row = document.createElement('div');  
      row.className = 'row';
      row.innerHTML = `
      <br>
      <div class="pb-4">
      <input type="text" class="inputs text-color form-control" id="steps" placeholder="Steps">
      </div>`;
      document.querySelector('#AddField')?.appendChild(row);
  }

  addIngredients(){
    let row = document.createElement('div');  
      row.className = 'row';
      row.innerHTML = `
      <br>
      <div class="pb-4">
      <input type="text" class="inputs text-color form-control" id="ingredients" placeholder="Ingredients">
      </div>`;
      document.querySelector('#AddNewField')?.appendChild(row);
  }

}
