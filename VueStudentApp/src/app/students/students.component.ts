import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {MatTableDataSource} from "@angular/material/table";
import {Student} from "../model/students.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  students !:Array<Student>
  public dataSource!:MatTableDataSource<Student>;
  public displayedColumns=['id', 'code','firstName', 'lastName', 'programId','payments'];

  @ViewChild(MatPaginator ) paginator!: MatPaginator

  @ViewChild(MatSort) matSort!:MatSort

  constructor(private studentsService: StudentsService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.studentsService.getAllStudents()
      .subscribe({
        next : data=>{
          this.students=data
          this.dataSource=new MatTableDataSource(this.students);
          this.dataSource.paginator=this.paginator
          this.dataSource.sort=this.matSort
        },
        error : err=>{
          console.log(err)

        }
      });
  }



  studentPayments(student: Student) {
    this.router.navigateByUrl(`/admin/student-details/${student.code}`)

  }



}
