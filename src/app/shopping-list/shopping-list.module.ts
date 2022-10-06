import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShoppingEditComponent } from "./components/shopping-edit/shopping-edit.component";
import { RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ShoppingEditComponent, ShoppingListComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild([{ path: "", component: ShoppingListComponent }])],
})
export class ShoppingListModule {}
