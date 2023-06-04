import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestapiservicesService } from './restapiservices.service';
import { TableRestApiModel } from './tablefilter/table-restapi.model';

@Component({
  selector: 'app-table-restapi',
  templateUrl: './table-restapi.component.html',
  styleUrls: ['./table-restapi.component.css']
})
export class TableRestapiComponent implements OnInit {
  public allCurrent!: Array<TableRestApiModel>;
  signInForm = new FormGroup({
    value: new FormControl('') // <== default value
  });
  isLoading = true;

  constructor(private http: RestapiservicesService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    const fields = this.signInForm.get('value')?.value; // Lấy giá trị của trường value trong form
    if (typeof fields === 'string') { // Kiểm tra fields có phải là string
      this.http.getcurrent(fields).subscribe(
        (res) => {
          this.allCurrent = res;
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.isLoading = false;
        }
      );
    } else {
      console.error('Giá trị của trường value không hợp lệ');
    }
  }

  onDelete(id: string) {
    const fields = this.signInForm.get('value')?.value;
    if (fields) {
      if (confirm('Bạn có chắc không?')) {
        this.http.deleteCurrent(id).subscribe(data1 => {
          this.http.getcurrent(fields).subscribe(data => {
            this.allCurrent = data;
            location.reload(); // Reload trang web
          });
        });
      }
    } else {
      console.error('Giá trị của trường value không hợp lệ');
    }
  }

  onPut(id: string) {
    this.http.putcurrent(id, this.signInForm.value).subscribe(da => { });
  }

  Put2(id: string) {
    const fields = this.signInForm.get('value')?.value;
    if (typeof fields === 'string') { // Kiểm tra fields có phải là string
      this.http.putcurrent(id, this.signInForm.value).subscribe(da => {
        this.http.getcurrent(fields).subscribe(data1 => {
          this.allCurrent = data1;
        })
      });
    } else {
      console.error('Giá trị của trường value không hợp lệ');
    }
  }
}
