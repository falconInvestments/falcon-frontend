import { Component, OnInit } from '@angular/core';
import { Etf } from '../etf.model';
import { EtfService } from '../etf.service';

@Component({
  selector: 'app-etfs',
  templateUrl: './etfs.component.html',
  styleUrls: ['./etfs.component.scss']
})
export class EtfsComponent implements OnInit {
  etfs: Etf[] = []

  constructor(private eftService: EtfService) { }

  ngOnInit(): void {
    this.eftService.getEtfs().subscribe((res) => {
      this.etfs = res
      console.log("this is the res", res)
    })
  }

  nextStep() {
    console.log("hello")
  }

}
