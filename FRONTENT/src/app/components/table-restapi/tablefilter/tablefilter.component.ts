import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-tablefilter',
  templateUrl: './tablefilter.component.html',
  styleUrls: ['./tablefilter.component.css']
})
export class TablefilterComponent implements OnInit {

  @Input() dynamicdata: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
    this.tablefilter()
  }

  tablefilter() {
    //get request from web api
    this.http.get('https://localhost:5001/data/current').subscribe(data => {
      this.dynamicdata = data;
      setTimeout(() => {
        $('#dataTables-example').DataTable({
          pagingType: 'first_last_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25]
        });
      }, 1);
    }, error => console.error(error));

    //datepicker
    $('.dateadded').on('change', function (ret: any) {
      var v = ret.target.value  // getting search input value
      $('#dataTables-example').DataTable().columns(3).search(v).draw();
    });
  }
}
