import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { User } from '../../shared/User.model';
import { UserdataService } from '../../services/userdata.service';
import { ToastrService } from 'ngx-toastr';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';

export interface dataElement {
   id: number,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
}

var ELEMENT_DATA : dataElement[];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['select','id', 'firstName', 'lastName', 'email','role','action'];
   dataSource = new MatTableDataSource<dataElement>(ELEMENT_DATA);
   selection = new SelectionModel<dataElement>(true, []);
   @ViewChild(MatSort, {static: true}) sort: MatSort;
   @ViewChild(MatTable, {static: true}) table: MatTable<any>;
   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  user: User = new User();
  terms: '';
  reverse = false;
 // sort: string ;

  public id;
  public firstName;
  public lastName;
  public email;
  public role;
public Users = [];
  constructor( private service: UserdataService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private toastr: ToastrService ) { }

  ngOnInit(): void {
     ELEMENT_DATA = this.service.getUser();
     this.dataSource =new MatTableDataSource(ELEMENT_DATA);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;

    const sortState: Sort = {active: 'firstName', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  reset() {
    this.dataSource.data = ELEMENT_DATA.slice();
    this.table.renderRows();
  }

/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: dataElement): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeSelectedRows() {

    this.selection.selected.forEach(item => {
      let index: number = ELEMENT_DATA.findIndex(d => d === item);
      console.log(ELEMENT_DATA.findIndex(d => d === item));
      ELEMENT_DATA.splice(index,1)
      this.dataSource = new MatTableDataSource<dataElement>(ELEMENT_DATA);
    });
    this.selection = new SelectionModel<dataElement>(true, []);
  }
  public addUser(from: NgForm) {
    var Id = this.service.getUser().filter(x=>x.id == this.id)
    if(this.user.id == null || this.user.id == 0){
  let userId = this.Users.length + 1;
  this.user.id = userId;
  this.Users.push(this.user);
  this.user = new User();
  this.toastr.success('User added Successfully','User Record');
    } else {
      let userIndex = this.Users.findIndex(x=>x.id == this.user.id)
      this.Users.splice(userIndex,1,this.user);
      this.user = new User();
      this.toastr.success('User updated Successfully','User Record')
    }
  }
  updateUser(id: number){
    let Id = this.Users.find(x=>x.id == id);
   this.user.id = id;
   this.user.firstName = Id.firstName;
    this.user.lastName = Id.lastName;
    this.user.email =Id.email;
    this.user.role = Id.role;
  }
  
  deleteUser(i: number) {
    var status = confirm('Are You sure to delete the record?');
    if(status == true) {
      const data = this.dataSource.data;
    data.splice( i, 1);
    this.dataSource.data = data;
      // let userId = this.Users.findIndex(x=>x.id ==i)
      // this.Users.splice(userId,1);
       this.toastr.warning('User deleted successfully','User Record');
    }
  }
 public getDetails(item){
    this.router.navigate(['details', item.id], {relativeTo:this.route})
  }

//   sortType(sort: string){
// if(sort == 'firstName'){
//   this.sort = sort;
//   this.reverse = ! this.reverse;
//   this.Users = this.Users.sort((a,b) => {
//     let x = a.firstName.toLowerCase();
//       let y = b.firstName.toLowerCase();
      
//       if(x<y) {
//         return -1
//       } else if(x>y) {
//         return 1
//       } 
//         return 0
      
//   });
// }
// if(sort == 'email'){
//   this.sort = sort;
//   this.reverse = ! this.reverse;
//   this.Users = this.Users.sort((a,b) => {
//     let x = a.email.toLowerCase();
//       let y = b.email.toLowerCase();
//       if(x<y) {
//         return -1
//       } else if(x>y) {
//         return 1
//       } else {
//         return 0
//       }
//   });
// }
// if(sort == 'role'){
//   this.sort = sort;
//   this.reverse = ! this.reverse;
//   this.Users = this.Users.sort((a,b) => {
//     let x = a.role.toLowerCase();
//       let y = b.role.toLowerCase();
//       if(x<y) {
//         return -1
//       } else if(x>y) {
//         return 1
//       } else {
//         return 0
//       }
//   });
// }
//   }


  resetAll(){
    this.ngOnInit();
    this.toastr.info('Data reset');
  }
}
