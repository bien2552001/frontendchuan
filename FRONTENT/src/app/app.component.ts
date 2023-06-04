import { Component ,ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admindashboard';
  constructor(public _router: Router) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*', // Điều chỉnh '*'' nếu chỉ muốn cho phép truy cập từ các nguồn cụ thể.
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Các phương thức HTTP được phép
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' // Các header được phép
    })
  };

  ngOnInit() {

  }
}
