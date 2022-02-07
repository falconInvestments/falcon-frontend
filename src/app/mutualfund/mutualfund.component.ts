import { Component, OnInit } from '@angular/core';
import { MutualFundsService } from '../mutual-funds.service';
import { ActivatedRoute } from '@angular/router';
import { MutualFund } from '../mutual-funds/mutual-fund.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mutualfund',
  templateUrl: './mutualfund.component.html',
  styleUrls: ['./mutualfund.component.scss']
})
export class MutualfundComponent implements OnInit {
  custom: string = "white";

  mutualfund:MutualFund = {
    mf_id: 0
  }

  makeRed(){
    this.custom = "red";
  }

  makeOrange(){
    this.custom = "orange";
  }

  makeYellow(){
    this.custom = "yellow";
  }

  makeYellowGreen(){
    this.custom = "yellowgreen";
  }

  makeGreen(){
    this.custom = "green";
  }
  constructor(private route:ActivatedRoute,
              private mutualFundService: MutualFundsService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const mf_id = +params['filteredFund.id'];
        // if(mf_id == NaN){
        //   this.route.navigateByUrl("/notfound")
        // }
      this.mutualFundService.getMutualFund(mf_id).subscribe(payload=>{
        this.mutualfund = payload;
        if(this.mutualfund.risk == 1) {
          this.makeGreen();
        } else if(this.mutualfund.risk == 2) {
          this.makeYellowGreen();
        } else if(this.mutualfund.risk == 3) {
          this.makeYellow();
        } else if(this.mutualfund.risk == 4) {
          this.makeOrange();
        } else {
          this.makeRed();
        }
      })
    })
  }

}
