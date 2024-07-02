import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StudentsService} from "../services/students.service";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
  public payments : any;
  public dataSource : any;
  public displayedColumns=['id', 'date', 'amount', 'type','status', 'firstName']

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;

  constructor(private studentsSerivce:StudentsService) {
  }
  ngOnInit() {
    this.studentsSerivce.getAllPayments()
      .subscribe({
        next : data => {
          this.payments = data;
          this.dataSource = new MatTableDataSource(this.payments);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort =this.sort;
        },
        error : err => {
          console.log(err);
        }
      })
  }

}
