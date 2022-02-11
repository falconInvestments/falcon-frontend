import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FeedbackService } from '../feedback.service';
import { Feedback } from './feedback.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedback: Feedback= {
    feedbackId: 0,
    questionOne: false,
    questionTwo: 0,
    questionThree: 0,
    questionFour: ''
  }

  isSubmitted = false;

  feedbackForm!: FormGroup;

  custom1: string = "black";
  custom2: string = "black";
  custom3: string = "black";
  custom4: string = "black";
  custom5: string = "black";

  custom21: string = "black";
  custom22: string = "black";
  custom23: string = "black";
  custom24: string = "black";
  custom25: string = "black";

  count = 10;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      questionOne: ['', Validators.required],
      questionTwo: ['', Validators.required],
      questionThree: ['', Validators.required],
      questionFour: ['']
    })
  }

  onSubmit() {
    this.isSubmitted = true;
  }

  onSkip() {

  }
  // activateStars1(){
  //   this.custom1, this.custom2, this.custom3, this.custom4, this.custom5 = "black";
  //   if(this.feedbackForm.formControlName.questionTwo >= 1) this.custom1 = "yellow";
  //   if(this.questionTwo >= 2) this.custom2 = "yellow";
  //   if(this.fb.group.questionTwo >= 3) this.custom3 = "yellow";
  //   if(this.feedbackForm.questionTwo >= 4) this.custom4 = "yellow";
  //   if(this.feedbackForm.questionTwo >= 5) this.custom5 = "yellow";
  // }
  // activateStars2(){
  //   this.custom21, this.custom22, this.custom23, this.custom24, this.custom25 = "black";
  //   if(this.feedbackForm.questionThree >= 1) this.custom21 = "yellow";
  //   if(this.feedbackForm.questionThree >= 2) this.custom22 = "yellow";
  //   if(this.feedbackForm.questionThree >= 3) this.custom23 = "yellow";
  //   if(this.feedbackForm.questionThree >= 4) this.custom24 = "yellow";
  //   if(this.feedbackForm.questionThree >= 5) this.custom25 = "yellow";
  // }
}
