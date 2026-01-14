import { NgModule } from "@angular/core";
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';



// import {MatSelectModule} from '@angular/material/option';

const matsArr = [MatInputModule,MatNativeDateModule,MatDatepickerModule,MatRadioModule,MatMenuModule,MatIconModule,MatSelectModule,MatCardModule,MatSnackBarModule,MatDialogModule,MatFormFieldModule,MatTabsModule ]
@NgModule({
   imports :[...matsArr],
   exports:[...matsArr],
   declarations: [
   
   ]
})


export class MaterialMdule{
   
}