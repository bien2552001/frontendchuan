import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestapiservicesService } from '../restapiservices.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  signInForm = new FormGroup({
    a_sum: new FormControl(''),
    a_imp: new FormControl(''),
    a_exp: new FormControl(''),
    ua: new FormControl(''),
    ub: new FormControl(''),
    uc: new FormControl(''),
    ia: new FormControl(''),
    ib: new FormControl(''),
    ic: new FormControl(''),
    pt: new FormControl(''),
    pa: new FormControl(''),
    pb: new FormControl(''),
    pc: new FormControl(''),
    ft: new FormControl(''),
    fa: new FormControl(''),
    fb: new FormControl(''),
    fc: new FormControl('')
  });

  constructor(private http: RestapiservicesService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.signInForm.value);
  }
  onPost() {
    const formData = this.signInForm.value;
    this.http.postcurrent(formData).subscribe(data => {
      console.log(data);
    });
  }

    //console.log(this.signInForm.value);
  
  postsuccess() {
    alert('Post_successful');
  }

}
