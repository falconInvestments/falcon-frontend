import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { AccountService } from '../account.service';
import { User } from '../user.model';
import { Account } from '../account.model';
import { switchMap, timer } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userResponse: any = null;
  newUser: User = { id: 0, firstName: '', lastName: '',  email: ''}
  accountUser: any = {id: 0, name: '', age: 0, password: ''};
  newAccount: Account = {id: 0, label: '', balance: 0, annualContribution: 0, userId: 2, newUserId: 0 }
  newUserId: number = 0;
  title = 'newMat';
     
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private _formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    this.userService.loadUsers().subscribe(payload => {
      this.newUserId = payload.length + 2;
      console.log(this.newUserId)
    })
    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      //userId: ['', Validators.required],
      label: ['', Validators.required],
      balance: ['', Validators.required],
      annualContribution: ['', Validators.required]
    });
  }
  
  submit(){
    this.newUser = this.firstFormGroup.value;
    this.newAccount = this.secondFormGroup.value;
    this.newAccount.userId = 2;
    this.newAccount.newUserId = this.newUserId;  

      this.userService.createUser(this.newUser).subscribe(payload => {
        console.log(payload);
      })

 console.log(this.newAccount)
      this.accountService.createAccount(this.newAccount).subscribe(payload => {
        console.log(payload);
      });
  }

}
