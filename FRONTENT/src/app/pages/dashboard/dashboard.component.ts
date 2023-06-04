import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { DashboardService } from './dashboard.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pzem017Model } from './pzem017.model';
import { DTSU666Model } from './dtsu666.model';
import { FormControl, FormGroup } from '@angular/forms';
//Custom Chart
Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Tất cả màu trong biểu đồ
  label = Chart.defaults.color = '#808080';


  constructor(private http: DashboardService) { }

  // Khai báo biến 
  //-----------------------thẻ chung ---------------
  //Thời gian :
  hientai = moment().format("HH:mm:ss");


  //---------------------Thẻ Moment-------------------------
  public dtsu_ngay!: Array<DTSU666Model>;
  public dtsu1_ngay!: Array<DTSU666Model>
  public dtsu2_ngay!: Array<DTSU666Model>;
  public pzem017_ngay!: Array<Pzem017Model>;
  //LÀm tròn
  public lastDtsuNgay1!: Array<DTSU666Model>;
  //Lưu giá trị mới nhất
  public lastDtsuNgay!: DTSU666Model;
  public lastDtsu1Ngay!: DTSU666Model;
  public lastDtsu2Ngay!: DTSU666Model;
  public lastPzem017Ngay!: Pzem017Model;


  //---------------------Thẻ To Day--------------------
  public pzem017today!: Array<Pzem017Model>;
  //---------------------Thẻ Last week---------------------


  //---------------------Thẻ Last Month--------------------



  //---------------------Thẻ Custom------------------------

  // Lọc
  datea!: any;
  dateb!: any;
  startDate!: Date;
  endDate!: Date;
  //Model
  public pzem017custom!: Array<Pzem017Model>;
  public dtsu66table!: Array<DTSU666Model>;
  public pzem017table!: Array<Pzem017Model>;
  public daterangertable1!: Array<DTSU666Model>;
  public dtsu666today!: Array<DTSU666Model>;
  public dtsu666custom!: Array<DTSU666Model>;
  //Chart
  public myChart!: Chart;
  isLoading = true;


  //// Lọc
  //datea!: any;
  //dateb!: any;
  //field!: string;
  //startDate!: Date;
  //endDate!: Date;
  ////Model
 
  //public pzem017custom!: Array<Pzem017Model>;
  //public dtsu66table!: Array<DTSU666Model>;
  //public pzem017table!: Array<Pzem017Model>;
  //public daterangertable1!: Array<DTSU666Model>;
  //public dtsu666today!: Array<DTSU666Model>;
  //public dtsu666custom!: Array<DTSU666Model>;
  //public dtsu666custom_alldata!: Array<DTSU666Model>;
  ////Chart
  //public myChart!: Chart;
  //isLoading = true;
  //signInForm = new FormGroup({
  //  value: new FormControl('') // <== default value
  //});

  //---------------------------------------------------------------------------------------------------------------------------------------
  // Hàm khởi tạo sau constructor
  ngOnInit(): void {
    //---------------------Thẻ Chung--------------------
    setInterval(() => {
      this.hientai = moment().format("HH:mm:ss");
    }, 1000);

    //---------------------Thẻ Moment--------------------
    this.Dashboard_Moment();

    //---------------------Thẻ To day--------------------
    this.Dashboard_Today();

    //---------------------Thẻ Last week--------------------
    this.Dashboard_Lastweek();

    //---------------------Thẻ Custom--------------------
    this.Dashboard_Custom();


    setInterval(() => {
      //---------------------Thẻ Moment--------------------
      this.Dashboard_Moment();

      //---------------------Thẻ To day--------------------
      this.Dashboard_Today();

      //---------------------Thẻ Last week--------------------
      this.Dashboard_Lastweek();

      //---------------------Thẻ Custom--------------------
      this.Dashboard_Custom();
    }, 180000);

  }

  //---------------------------------------------------------------------------------------------------------------------------------------


  // --------------------------------------TRIỂN KHAI CÁC PHƯƠNG THỨC CHO TỪNG TAB--------------------------------------------------------
  //---------------------Thẻ Moment---------------------
  async Dashboard_Moment() {
    // DTSU666
    this.DTSU666_ui_moment();
    this.DTSU666_pqphi_moment();
    this.DTSU666_a_moment();
    //PZEM017 
    this.Pzem017_uipa_moment();
  }
  // DTSU666
  async DTSU666_ui_moment() {
    try {
      const cs = await this.http.DTSU666_uimoment().toPromise();
      if (cs !== undefined) {
        this.dtsu_ngay = cs;
        this.lastDtsuNgay = cs[cs.length - 1]; // Lấy giá trị cuối cùng
      }
    } catch (error) {
      console.error(error);
    }
  }
  async DTSU666_pqphi_moment() {
    try {
      const cs = await this.http.DTSU666_pqphimoment().toPromise();
      if (cs !== undefined) {
        this.dtsu1_ngay = cs;
        this.lastDtsu1Ngay = cs[cs.length - 1]; // Lấy giá trị cuối cùng
      }
    } catch (error) {
      console.error(error);
    }
  }

  async DTSU666_a_moment() {
    try {
      const cs = await this.http.DTSU666_amoment().toPromise();
      if (cs !== undefined) {
        this.dtsu2_ngay = cs;
        this.lastDtsu2Ngay = cs[cs.length - 1]; // Lấy giá trị cuối cùng
      }
    } catch (error) {
      console.error(error);
    }
  }

  async Pzem017_uipa_moment() {
    try {
      const da = await this.http.Pzem017_uipamoment().toPromise();
      if (da !== undefined) {
        this.pzem017_ngay = da;
        this.lastPzem017Ngay = da[da.length - 1]; // Lấy giá trị cuối cùng
      }
    } catch (error) {
      console.error(error);
    }
  }



  //---------------------Thẻ To day--------------------
  async Dashboard_Today() {
    // DTSU666
    this.dtsu666_uphatoday();
    this.dtsu666_iphatoday();
    this.dtsu666_pphatoday();
    this.dtsu666_aphatoday();
    //PZEM017 
    this.pzem017_uphatoday();
    this.pzem017_iphatoday();
    this.pzem017_pphatoday();
    this.pzem017_aphatoday();
  }
  // DTSU666
  async dtsu666_uphatoday() {
    await this.http.DTSU666_dienappha_today().subscribe(
      result => {
        this.dtsu666today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const ua = this.dtsu666today.map(data => data.Ua);
        const ub = this.dtsu666today.map(data => data.Ub);
        const uc = this.dtsu666today.map(data => data.Uc);
        const date1 = this.dtsu666today.map(data => data.Date);

        // Tính trung bình
        const avgArray_ua = Array.from({ length: ua.length }, () => ua.reduce((acc, val) => acc + val) / ua.length);
        const avgArray_ub = Array.from({ length: ub.length }, () => ub.reduce((acc, val) => acc + val) / ub.length);
        const avgArray_uc = Array.from({ length: uc.length }, () => uc.reduce((acc, val) => acc + val) / uc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dienapphatoday');
        if (chart) {
          chart.destroy();
        }
        this.myChart = new Chart('dtsu666_dienapphatoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Ua',
                data: ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Uatb',
                data: avgArray_ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 2,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Ub',
                data: ub,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 0.8,
                hidden: true,
              },
              {
                label: 'Ubtb',
                data: avgArray_ub,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1.5,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Uc',
                data: uc,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Uctb',
                data: avgArray_uc,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1.5,
                pointRadius: 0,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'ĐIỆN ÁP PHA',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: false,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                type: 'linear',
                //min: 0,
                //max: 300,
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },

              }

            },

          },

        });

      })
  }
  async dtsu666_iphatoday() {
    await this.http.DTSU666_dongdienpha_today().subscribe(
      result => {
        this.dtsu666today = result;
        const ia1 = this.dtsu666today.map(data => data.Ia);
        const ib1 = this.dtsu666today.map(data => data.Ib);
        const ic1 = this.dtsu666today.map(data => data.Ic);
        const date1 = this.dtsu666today.map(data => data.Date);
        // Tính trung bình
        const avgArray_ia1 = Array.from({ length: ia1.length }, () => ia1.reduce((acc, val) => acc + val) / ia1.length);
        const avgArray_ib1 = Array.from({ length: ib1.length }, () => ib1.reduce((acc, val) => acc + val) / ib1.length);
        const avgArray_ic1 = Array.from({ length: ic1.length }, () => ic1.reduce((acc, val) => acc + val) / ic1.length);
        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dongdienphatoday');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_dongdienphatoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Ia',
                data: ia1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Iatb',
                data: avgArray_ia1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Ib',
                data: avgArray_ib1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Ibtb',
                data: ib1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Ic',
                data: ic1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Ictb',
                data: avgArray_ic1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'DÒNG ĐIỆN PHA',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },


              }

            },

          },

        });

      })
  }
  async dtsu666_pphatoday() {
    await this.http.DTSU666_ptieuthupha_today().subscribe(
      result => {
        this.dtsu666today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const pft = this.dtsu666today.map(data => data.Pft);
        const pfa = this.dtsu666today.map(data => data.Pfa);
        const pfb = this.dtsu666today.map(data => data.Pfb);
        const pfc = this.dtsu666today.map(data => data.Pfc);
        const date1 = this.dtsu666today.map(data => data.Date);

        // Tính trung bình
        const avgArray_ft = Array.from({ length: pft.length }, () => pft.reduce((acc, val) => acc + val) / pft.length);
        const avgArray_fa = Array.from({ length: pfa.length }, () => pfa.reduce((acc, val) => acc + val) / pfa.length);
        const avgArray_fb = Array.from({ length: pfb.length }, () => pfb.reduce((acc, val) => acc + val) / pfb.length);
        const avgArray_fc = Array.from({ length: pfc.length }, () => pfc.reduce((acc, val) => acc + val) / pfc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_pphatoday');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('dtsu666_pphatoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Pt',
                data: pft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Pttb',
                data: avgArray_ft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Pa',
                data: pfa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Patb',
                data: avgArray_fa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Pb',
                data: pfb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Pbtb',
                data: avgArray_fb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Pc',
                data: pfc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Pctb',
                data: avgArray_fc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'CÔNG SUẤT TIÊU THỤ NGÀY',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,
                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async dtsu666_aphatoday() {
    await this.http.DTSU666_dienangtieuthu_today().subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const asum = this.dtsu666custom.map(data => data.A_sum);
        const aimp = this.dtsu666custom.map(data => data.A_imp);
        const aexp = this.dtsu666custom.map(data => data.A_exp);
        const date22 = this.dtsu666custom.map(data => data.Date);

        // Tính trung bình
        const avgArray_asum = Array.from({ length: asum.length }, () => asum.reduce((acc, val) => acc + val) / asum.length);
        const avgArray_aimp = Array.from({ length: aimp.length }, () => aimp.reduce((acc, val) => acc + val) / aimp.length);
        const avgArray_aexp = Array.from({ length: aexp.length }, () => aexp.reduce((acc, val) => acc + val) / aexp.length);
        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_diennangtieuthutoday');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_diennangtieuthutoday', {
          type: 'line',
          data: {
            labels: date22.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'Asum',
                data: asum,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Asumtb',
                data: avgArray_asum,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
              {
                label: 'Aimp',
                data: aimp,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Aimptb',
                data: avgArray_aimp,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Aexp',
                data: aexp,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Aexptb',
                data: avgArray_aexp,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'ĐIỆN NĂNG TIÊU THỤ NGÀY',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,
                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  //PZEM017 
  async pzem017_uphatoday() {

    await this.http.PZEM017_dienappha_today().subscribe(
      result => {
        this.pzem017today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const u1 = this.pzem017today.map(data => data.U1);
        const date1 = this.pzem017today.map(data => data.Date1);
        // Tính trung bình
        const avgArray_u1 = Array.from({ length: u1.length }, () => u1.reduce((acc, val) => acc + val) / u1.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dienapphatoday');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017_dienapphatoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'U1',
                data: u1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'U1tb',
                data: avgArray_u1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - ĐIỆN ÁP',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                type: 'linear',
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_iphatoday() {
    await this.http.PZEM017_dongdien_today().subscribe(
      result => {
        this.pzem017today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const i1 = this.pzem017today.map(data => data.I1);
        const date1 = this.pzem017today.map(data => data.Date1);
        // Tính trung bình
        const avgArray_i1 = Array.from({ length: i1.length }, () => i1.reduce((acc, val) => acc + val) / i1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dongdientoday');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017_dongdientoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'I1',
                data: i1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'I1tb',
                data: avgArray_i1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - DÒNG ĐIỆN',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_pphatoday() {

    await this.http.PZEM017_ptieuthu_today().subscribe(
      result => {
        this.pzem017today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const p1 = this.pzem017today.map(data => data.P1);
        const date1 = this.pzem017today.map(data => data.Date1);
        // Tính trung bình
        const avgArray_p1 = Array.from({ length: p1.length }, () => p1.reduce((acc, val) => acc + val) / p1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017congsuattoday');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017congsuattoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'P1',
                data: p1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'P1tb',
                data: avgArray_p1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - CÔNG SUẤT',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_aphatoday() {

    await this.http.PZEM017_atieuthu_today().subscribe(
      result => {
        this.pzem017today = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const a1 = this.pzem017today.map(data => data.A1);
        const date1 = this.pzem017today.map(data => data.Date1);
        // Tính trung bình
        const avgArray_a1 = Array.from({ length: a1.length }, () => a1.reduce((acc, val) => acc + val) / a1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017diennangtoday');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017diennangtoday', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('HH:mm')),
            datasets: [
              {
                label: 'A1',
                data: a1,
                borderColor: '#00FFFF',
                backgroundColor: '#00FFFF',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'A1tb',
                data: avgArray_a1,
                borderColor: '#00FFFF',
                backgroundColor: '#00FFFF',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - ĐIỆN NĂNG',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }


  //---------------------Thẻ Last week--------------------

  async Dashboard_Lastweek() {
    // DTSU666
    this.dtsu666_uphalastweek();
    this.dtsu666_iphalastweek();
    this.dtsu666_pphalastweek();
    this.dtsu666_aphalastweek();
    // PZEM017
    this.pzem017_ulastweek();
    this.pzem017_ilastweek();
    this.pzem017_plastweek();
    this.pzem017_alastweek();
  }
  // DTSU666
  async dtsu666_uphalastweek() {
    // Điện áp ngày 1 
    const last1DayResult = await this.http.DTSU666_last1day().toPromise();
    const ua1: number[] = last1DayResult?.map(data => data.Ua) ?? [];
    const ub1: number[] = last1DayResult?.map(data => data.Ub) ?? [];
    const uc1: number[] = last1DayResult?.map(data => data.Uc) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date).format('DD/MM/YYYY') : '';

    // Điện áp ngày 2
    const last2DayResult = await this.http.DTSU666_last2day().toPromise();
    const ua2: number[] = last2DayResult?.map(data => data.Ua) ?? [];
    const ub2: number[] = last2DayResult?.map(data => data.Ub) ?? [];
    const uc2: number[] = last2DayResult?.map(data => data.Uc) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 3
    const last3DayResult = await this.http.DTSU666_last3day().toPromise();
    const ua3: number[] = last3DayResult?.map(data => data.Ua) ?? [];
    const ub3: number[] = last3DayResult?.map(data => data.Ub) ?? [];
    const uc3: number[] = last3DayResult?.map(data => data.Uc) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 4
    const last4DayResult = await this.http.DTSU666_last4day().toPromise();
    const ua4: number[] = last4DayResult?.map(data => data.Ua) ?? [];
    const ub4: number[] = last4DayResult?.map(data => data.Ub) ?? [];
    const uc4: number[] = last4DayResult?.map(data => data.Uc) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 5
    const last5DayResult = await this.http.DTSU666_last5day().toPromise();
    const ua5: number[] = last5DayResult?.map(data => data.Ua) ?? [];
    const ub5: number[] = last5DayResult?.map(data => data.Ub) ?? [];
    const uc5: number[] = last5DayResult?.map(data => data.Uc) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 6
    const last6DayResult = await this.http.DTSU666_last6day().toPromise();
    const ua6: number[] = last6DayResult?.map(data => data.Ua) ?? [];
    const ub6: number[] = last6DayResult?.map(data => data.Ub) ?? [];
    const uc6: number[] = last6DayResult?.map(data => data.Uc) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 7
    const last7DayResult = await this.http.DTSU666_last7day().toPromise();
    const ua7: number[] = last7DayResult?.map(data => data.Ua) ?? [];
    const ub7: number[] = last7DayResult?.map(data => data.Ub) ?? [];
    const uc7: number[] = last7DayResult?.map(data => data.Uc) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date).format('DD/MM/YYYY') : '';

    // Điện áp trung bình ngày 1
    const avgUa1: number = parseFloat((ua1.reduce((acc, val) => acc + val, 0) / ua1.length).toFixed(1));
    const avgUb1: number = parseFloat((ub1.reduce((acc, val) => acc + val, 0) / ub1.length).toFixed(1));
    const avgUc1: number = parseFloat((uc1.reduce((acc, val) => acc + val, 0) / uc1.length).toFixed(1));
    // Điện áp trung bình ngày 2
    const avgUa2: number = parseFloat((ua2.reduce((acc, val) => acc + val, 0) / ua2.length).toFixed(1));
    const avgUb2: number = parseFloat((ub2.reduce((acc, val) => acc + val, 0) / ub2.length).toFixed(1));
    const avgUc2: number = parseFloat((uc2.reduce((acc, val) => acc + val, 0) / uc2.length).toFixed(1));
    // Điện áp trung bình ngày 3
    const avgUa3: number = parseFloat((ua3.reduce((acc, val) => acc + val, 0) / ua3.length).toFixed(1));
    const avgUb3: number = parseFloat((ub3.reduce((acc, val) => acc + val, 0) / ub3.length).toFixed(1));
    const avgUc3: number = parseFloat((uc3.reduce((acc, val) => acc + val, 0) / uc3.length).toFixed(1));
    // Điện áp trung bình ngày 4
    const avgUa4: number = parseFloat((ua4.reduce((acc, val) => acc + val, 0) / ua4.length).toFixed(1));
    const avgUb4: number = parseFloat((ub4.reduce((acc, val) => acc + val, 0) / ub4.length).toFixed(1));
    const avgUc4: number = parseFloat((uc4.reduce((acc, val) => acc + val, 0) / uc4.length).toFixed(1));
    // Điện áp trung bình ngày 5
    const avgUa5: number = parseFloat((ua5.reduce((acc, val) => acc + val, 0) / ua5.length).toFixed(1));
    const avgUb5: number = parseFloat((ub5.reduce((acc, val) => acc + val, 0) / ub5.length).toFixed(1));
    const avgUc5: number = parseFloat((uc5.reduce((acc, val) => acc + val, 0) / uc5.length).toFixed(1));
    // Điện áp trung bình ngày 6
    const avgUa6: number = parseFloat((ua6.reduce((acc, val) => acc + val, 0) / ua6.length).toFixed(1));
    const avgUb6: number = parseFloat((ub6.reduce((acc, val) => acc + val, 0) / ub6.length).toFixed(1));
    const avgUc6: number = parseFloat((uc6.reduce((acc, val) => acc + val, 0) / uc6.length).toFixed(1));
    // Điện áp trung bình ngày 7
    const avgUa7 = parseFloat((ua7.reduce((acc, val) => acc + val, 0) / ua7.length).toFixed(1));
    const avgUb7 = parseFloat((ub7.reduce((acc, val) => acc + val, 0) / ub7.length).toFixed(1));
    const avgUc7 = parseFloat((uc7.reduce((acc, val) => acc + val, 0) / uc7.length).toFixed(1));

    // Tạo mảng data để vẽ biểu đồ
    const avgArrayua: number[] = [avgUa7, avgUa6, avgUa5, avgUa4, avgUa3, avgUa2, avgUa1];
    const avgArrayub: number[] = [avgUb7, avgUb6, avgUb5, avgUb4, avgUb3, avgUb2, avgUb1];
    const avgArrayuc: number[] = [avgUc7, avgUc6, avgUc5, avgUc4, avgUc3, avgUc2, avgUc1];

    // Tạo biểu đồ
    const chart = Chart.getChart('dtsu666_dienapphalastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('dtsu666_dienapphalastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'Ua',
            data: avgArrayua,
            borderColor: 'rgb(255, 23, 22)',
            backgroundColor: 'rgb(255, 23, 22,0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
          {
            label: 'Ub',
            data: avgArrayub,
            borderColor: 'rgb(255, 246, 0)',
            backgroundColor: 'rgb(255, 246, 0, 0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
          {
            label: 'Uc',
            data: avgArrayuc,
            borderColor: 'rgb(43, 255, 0)',
            backgroundColor: 'rgb(43, 255, 0,0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'ĐIỆN ÁP PHA',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
  async dtsu666_iphalastweek() {
    // Điện áp ngày 1 
    const last1DayResult = await this.http.DTSU666_last1day().toPromise();
    const ia1: number[] = last1DayResult?.map(data => data.Ia) ?? [];
    const ib1: number[] = last1DayResult?.map(data => data.Ib) ?? [];
    const ic1: number[] = last1DayResult?.map(data => data.Ic) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date).format('DD/MM/YYYY') : '';

    // Điện áp ngày 2
    const last2DayResult = await this.http.DTSU666_last2day().toPromise();
    const ia2: number[] = last2DayResult?.map(data => data.Ia) ?? [];
    const ib2: number[] = last2DayResult?.map(data => data.Ib) ?? [];
    const ic2: number[] = last2DayResult?.map(data => data.Ic) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 3
    const last3DayResult = await this.http.DTSU666_last3day().toPromise();
    const ia3: number[] = last3DayResult?.map(data => data.Ia) ?? [];
    const ib3: number[] = last3DayResult?.map(data => data.Ib) ?? [];
    const ic3: number[] = last3DayResult?.map(data => data.Ic) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 4
    const last4DayResult = await this.http.DTSU666_last4day().toPromise();
    const ia4: number[] = last4DayResult?.map(data => data.Ia) ?? [];
    const ib4: number[] = last4DayResult?.map(data => data.Ib) ?? [];
    const ic4: number[] = last4DayResult?.map(data => data.Ic) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 5
    const last5DayResult = await this.http.DTSU666_last5day().toPromise();
    const ia5: number[] = last5DayResult?.map(data => data.Ia) ?? [];
    const ib5: number[] = last5DayResult?.map(data => data.Ib) ?? [];
    const ic5: number[] = last5DayResult?.map(data => data.Ic) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 6
    const last6DayResult = await this.http.DTSU666_last6day().toPromise();
    const ia6: number[] = last6DayResult?.map(data => data.Ia) ?? [];
    const ib6: number[] = last6DayResult?.map(data => data.Ib) ?? [];
    const ic6: number[] = last6DayResult?.map(data => data.Ic) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 7
    const last7DayResult = await this.http.DTSU666_last7day().toPromise();
    const ia7: number[] = last7DayResult?.map(data => data.Ia) ?? [];
    const ib7: number[] = last7DayResult?.map(data => data.Ib) ?? [];
    const ic7: number[] = last7DayResult?.map(data => data.Ic) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date).format('DD/MM/YYYY') : '';

    // Điện áp trung bình ngày 1
    const avgIa1: number = parseFloat((ia1.reduce((acc, val) => acc + val, 0) / ia1.length).toFixed(1));
    const avgIb1: number = parseFloat((ib1.reduce((acc, val) => acc + val, 0) / ib1.length).toFixed(1));
    const avgIc1: number = parseFloat((ic1.reduce((acc, val) => acc + val, 0) / ic1.length).toFixed(1));
    // Điện áp trung bình ngày 2
    const avgIa2: number = parseFloat((ia2.reduce((acc, val) => acc + val, 0) / ia2.length).toFixed(1));
    const avgIb2: number = parseFloat((ib2.reduce((acc, val) => acc + val, 0) / ib2.length).toFixed(1));
    const avgIc2: number = parseFloat((ic2.reduce((acc, val) => acc + val, 0) / ic2.length).toFixed(1));
    // Điện áp trung bình ngày 3
    const avgIa3: number = parseFloat((ia3.reduce((acc, val) => acc + val, 0) / ia3.length).toFixed(1));
    const avgIb3: number = parseFloat((ib3.reduce((acc, val) => acc + val, 0) / ib3.length).toFixed(1));
    const avgIc3: number = parseFloat((ic3.reduce((acc, val) => acc + val, 0) / ic3.length).toFixed(1));
    // Điện áp trung bình ngày 4
    const avgIa4: number = parseFloat((ia4.reduce((acc, val) => acc + val, 0) / ia4.length).toFixed(1));
    const avgIb4: number = parseFloat((ib4.reduce((acc, val) => acc + val, 0) / ib4.length).toFixed(1));
    const avgIc4: number = parseFloat((ic4.reduce((acc, val) => acc + val, 0) / ic4.length).toFixed(1));
    // Điện áp trung bình ngày 5
    const avgIa5: number = parseFloat((ia5.reduce((acc, val) => acc + val, 0) / ia5.length).toFixed(1));
    const avgIb5: number = parseFloat((ib5.reduce((acc, val) => acc + val, 0) / ib5.length).toFixed(1));
    const avgIc5: number = parseFloat((ic5.reduce((acc, val) => acc + val, 0) / ic5.length).toFixed(1));
    // Điện áp trung bình ngày 6
    const avgIa6: number = parseFloat((ia6.reduce((acc, val) => acc + val, 0) / ia6.length).toFixed(1));
    const avgIb6: number = parseFloat((ib6.reduce((acc, val) => acc + val, 0) / ib6.length).toFixed(1));
    const avgIc6: number = parseFloat((ic6.reduce((acc, val) => acc + val, 0) / ic6.length).toFixed(1));
    // Điện áp trung bình ngày 7
    const avgIa7 = parseFloat((ia7.reduce((acc, val) => acc + val, 0) / ia7.length).toFixed(1));
    const avgIb7 = parseFloat((ib7.reduce((acc, val) => acc + val, 0) / ib7.length).toFixed(1));
    const avgIc7 = parseFloat((ic7.reduce((acc, val) => acc + val, 0) / ic7.length).toFixed(1));

    // Tạo mảng data để vẽ biểu đồ
    const avgArrayia: number[] = [avgIa7, avgIa6, avgIa5, avgIa4, avgIa3, avgIa2, avgIa1];
    const avgArrayib: number[] = [avgIb7, avgIb6, avgIb5, avgIb4, avgIb3, avgIb2, avgIb1];
    const avgArrayic: number[] = [avgIc7, avgIc6, avgIc5, avgIc4, avgIc3, avgIc2, avgIc1];

    // Tạo biểu đồ
    const chart = Chart.getChart('dtsu666_dongienphalastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('dtsu666_dongienphalastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'Ia',
            data: avgArrayia,
            borderColor: 'rgb(255, 23, 22)',
            backgroundColor: 'rgb(255, 23, 22,0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
          {
            label: 'Ib',
            data: avgArrayib,
            borderColor: 'rgb(255, 246, 0)',
            backgroundColor: 'rgb(255, 246, 0, 0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
          {
            label: 'Ic',
            data: avgArrayic,
            borderColor: 'rgb(43, 255, 0)',
            backgroundColor: 'rgb(43, 255, 0,0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'DÒNG ĐIỆN PHA',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
  async dtsu666_pphalastweek() {
    // Công suất tiêu thụ  ngày 1 
    const last1DayResult = await this.http.DTSU666_last1day().toPromise();
    const pft1: number[] = last1DayResult?.map(data => data.Pft) ?? [];
    const pfa1: number[] = last1DayResult?.map(data => data.Pfa) ?? [];
    const pfb1: number[] = last1DayResult?.map(data => data.Pfb) ?? [];
    const pfc1: number[] = last1DayResult?.map(data => data.Pfc) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ  ngày 2
    const last2DayResult = await this.http.DTSU666_last2day().toPromise();
    const pft2: number[] = last2DayResult?.map(data => data.Pft) ?? [];
    const pfa2: number[] = last2DayResult?.map(data => data.Pfa) ?? [];
    const pfb2: number[] = last2DayResult?.map(data => data.Pfb) ?? [];
    const pfc2: number[] = last2DayResult?.map(data => data.Pfc) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date).format('DD/MM/YYYY') : '';
    //Công suất tiêu thụ  ngày 3
    const last3DayResult = await this.http.DTSU666_last3day().toPromise();
    const pft3: number[] = last3DayResult?.map(data => data.Pft) ?? [];
    const pfa3: number[] = last3DayResult?.map(data => data.Pfa) ?? [];
    const pfb3: number[] = last3DayResult?.map(data => data.Pfb) ?? [];
    const pfc3: number[] = last3DayResult?.map(data => data.Pfc) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ  ngày 4
    const last4DayResult = await this.http.DTSU666_last4day().toPromise();
    const pft4: number[] = last4DayResult?.map(data => data.Pft) ?? [];
    const pfa4: number[] = last4DayResult?.map(data => data.Pfa) ?? [];
    const pfb4: number[] = last4DayResult?.map(data => data.Pfb) ?? [];
    const pfc4: number[] = last4DayResult?.map(data => data.Pfc) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date).format('DD/MM/YYYY') : '';
    //Công suất tiêu thụ ngày 5
    const last5DayResult = await this.http.DTSU666_last5day().toPromise();
    const pft5: number[] = last5DayResult?.map(data => data.Pft) ?? [];
    const pfa5: number[] = last5DayResult?.map(data => data.Pfa) ?? [];
    const pfb5: number[] = last5DayResult?.map(data => data.Pfb) ?? [];
    const pfc5: number[] = last5DayResult?.map(data => data.Pfc) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ  ngày 6
    const last6DayResult = await this.http.DTSU666_last6day().toPromise();
    const pft6: number[] = last6DayResult?.map(data => data.Pft) ?? [];
    const pfa6: number[] = last6DayResult?.map(data => data.Pfa) ?? [];
    const pfb6: number[] = last6DayResult?.map(data => data.Pfb) ?? [];
    const pfc6: number[] = last6DayResult?.map(data => data.Pfc) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ  ngày 7
    const last7DayResult = await this.http.DTSU666_last7day().toPromise();
    const pft7: number[] = last7DayResult?.map(data => data.Pft) ?? [];
    const pfa7: number[] = last7DayResult?.map(data => data.Pfa) ?? [];
    const pfb7: number[] = last7DayResult?.map(data => data.Pfb) ?? [];
    const pfc7: number[] = last7DayResult?.map(data => data.Pfc) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date).format('DD/MM/YYYY') : '';


    // Công suất tiêu thụ  trung bình ngày 1
    const avgpft1: number = parseFloat((pft1.reduce((acc, val) => acc + val, 0) / pft1.length).toFixed(1));
    const avgpfa1: number = parseFloat((pfa1.reduce((acc, val) => acc + val, 0) / pfa1.length).toFixed(1));
    const avgpfb1: number = parseFloat((pfb1.reduce((acc, val) => acc + val, 0) / pfb1.length).toFixed(1));
    const avgpfc1: number = parseFloat((pfc1.reduce((acc, val) => acc + val, 0) / pfc1.length).toFixed(1));
    // Công suất tiêu thụ  trung bình ngày 2
    const avgpft2: number = parseFloat((pft2.reduce((acc, val) => acc + val, 0) / pft2.length).toFixed(1));
    const avgpfa2: number = parseFloat((pfa2.reduce((acc, val) => acc + val, 0) / pfa2.length).toFixed(1));
    const avgpfb2: number = parseFloat((pfb2.reduce((acc, val) => acc + val, 0) / pfb2.length).toFixed(1));
    const avgpfc2: number = parseFloat((pfc2.reduce((acc, val) => acc + val, 0) / pfc2.length).toFixed(1));
    //Công suất tiêu thụ  trung bình ngày 3
    const avgpft3: number = parseFloat((pft3.reduce((acc, val) => acc + val, 0) / pft3.length).toFixed(1));
    const avgpfa3: number = parseFloat((pfa3.reduce((acc, val) => acc + val, 0) / pfa3.length).toFixed(1));
    const avgpfb3: number = parseFloat((pfb3.reduce((acc, val) => acc + val, 0) / pfb3.length).toFixed(1));
    const avgpfc3: number = parseFloat((pfc3.reduce((acc, val) => acc + val, 0) / pfc3.length).toFixed(1));
    // Công suất tiêu thụ  trung bình ngày 4
    const avgpft4: number = parseFloat((pft4.reduce((acc, val) => acc + val, 0) / pft4.length).toFixed(1));
    const avgpfa4: number = parseFloat((pfa4.reduce((acc, val) => acc + val, 0) / pfa4.length).toFixed(1));
    const avgpfb4: number = parseFloat((pfb4.reduce((acc, val) => acc + val, 0) / pfb4.length).toFixed(1));
    const avgpfc4: number = parseFloat((pfc4.reduce((acc, val) => acc + val, 0) / pfc4.length).toFixed(1));
    // Công suất tiêu thụ  trung bình ngày 5
    const avgpft5: number = parseFloat((pft5.reduce((acc, val) => acc + val, 0) / pft5.length).toFixed(1));
    const avgpfa5: number = parseFloat((pfa5.reduce((acc, val) => acc + val, 0) / pfa5.length).toFixed(1));
    const avgpfb5: number = parseFloat((pfb5.reduce((acc, val) => acc + val, 0) / pfb5.length).toFixed(1));
    const avgpfc5: number = parseFloat((pfc5.reduce((acc, val) => acc + val, 0) / pfc5.length).toFixed(1));
    // Công suất tiêu thụ  trung bình ngày 6
    const avgpft6: number = parseFloat((pft6.reduce((acc, val) => acc + val, 0) / pft6.length).toFixed(1));
    const avgpfa6: number = parseFloat((pfa6.reduce((acc, val) => acc + val, 0) / pfa6.length).toFixed(1));
    const avgpfb6: number = parseFloat((pfb6.reduce((acc, val) => acc + val, 0) / pfb6.length).toFixed(1));
    const avgpfc6: number = parseFloat((pfc6.reduce((acc, val) => acc + val, 0) / pfc6.length).toFixed(1));
    // Công suất tiêu thụ  trung bình ngày 7
    const avgpft7: number = parseFloat((pft7.reduce((acc, val) => acc + val, 0) / pft7.length).toFixed(1));
    const avgpfa7: number = parseFloat((pfa7.reduce((acc, val) => acc + val, 0) / pfa7.length).toFixed(1));
    const avgpfb7: number = parseFloat((pfb7.reduce((acc, val) => acc + val, 0) / pfb7.length).toFixed(1));
    const avgpfc7: number = parseFloat((pfc7.reduce((acc, val) => acc + val, 0) / pfc7.length).toFixed(1));

    // Tạo mảng data để vẽ biểu đồ
    const avgArraypfa: number[] = [avgpfa7, avgpfa6, avgpfa5, avgpfa4, avgpfa3, avgpfa2, avgpfa1];
    const avgArraypfb: number[] = [avgpfb7, avgpfb6, avgpfb5, avgpfb4, avgpfb3, avgpfb2, avgpfb1];
    const avgArraypfc: number[] = [avgpfc7, avgpfc6, avgpfc5, avgpfc4, avgpfc3, avgpfc2, avgpfc1];
    const avgArraypft: number[] = [avgpft7, avgpft6, avgpft5, avgpft4, avgpft3, avgpft2, avgpft1];

    // Tạo biểu đồ
    const chart = Chart.getChart('dtsu666_congsuatphalastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('dtsu666_congsuatphalastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'Pft',
            data: avgArraypft,
            borderColor: 'rgb(255, 23, 22)',
            backgroundColor: 'rgb(255, 23, 22,0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
          {
            label: 'Pfa',
            data: avgArraypfa,
            borderColor: 'rgb(255, 246, 0)',
            backgroundColor: 'rgb(255, 246, 0, 0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
          {
            label: 'Pfb',
            data: avgArraypfb,
            borderColor: 'rgb(43, 255, 0)',
            backgroundColor: 'rgb(43, 255, 0,0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
          {
            label: 'Pfc',
            data: avgArraypfc,
            borderColor: 'rgb(38, 160, 255)',
            backgroundColor: 'rgb(38, 160, 255,0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'CÔNG SUẤT TIÊU THỤ PHA',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
  async dtsu666_aphalastweek() {
    // Điện áp ngày 1 
    const last1DayResult = await this.http.DTSU666_last1day().toPromise();
    const a1: number[] = last1DayResult?.map(data => data.A_sum) ?? [];
    const b1: number[] = last1DayResult?.map(data => data.A_imp) ?? [];
    const c1: number[] = last1DayResult?.map(data => data.A_exp) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date).format('DD/MM/YYYY') : '';

    // Điện áp ngày 2
    const last2DayResult = await this.http.DTSU666_last2day().toPromise();
    const a2: number[] = last2DayResult?.map(data => data.A_sum) ?? [];
    const b2: number[] = last2DayResult?.map(data => data.A_imp) ?? [];
    const c2: number[] = last2DayResult?.map(data => data.A_exp) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 3
    const last3DayResult = await this.http.DTSU666_last3day().toPromise();
    const a3: number[] = last3DayResult?.map(data => data.A_sum) ?? [];
    const b3: number[] = last3DayResult?.map(data => data.A_imp) ?? [];
    const c3: number[] = last3DayResult?.map(data => data.A_exp) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 4
    const last4DayResult = await this.http.DTSU666_last4day().toPromise();
    const a4: number[] = last4DayResult?.map(data => data.A_sum) ?? [];
    const b4: number[] = last4DayResult?.map(data => data.A_imp) ?? [];
    const c4: number[] = last4DayResult?.map(data => data.A_exp) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 5
    const last5DayResult = await this.http.DTSU666_last5day().toPromise();
    const a5: number[] = last5DayResult?.map(data => data.A_sum) ?? [];
    const b5: number[] = last5DayResult?.map(data => data.A_imp) ?? [];
    const c5: number[] = last5DayResult?.map(data => data.A_exp) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 6
    const last6DayResult = await this.http.DTSU666_last6day().toPromise();
    const a6: number[] = last6DayResult?.map(data => data.A_sum) ?? [];
    const b6: number[] = last6DayResult?.map(data => data.A_imp) ?? [];
    const c6: number[] = last6DayResult?.map(data => data.A_exp) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date).format('DD/MM/YYYY') : '';
    // Điện áp ngày 7
    const last7DayResult = await this.http.DTSU666_last7day().toPromise();
    const a7: number[] = last7DayResult?.map(data => data.A_sum) ?? [];
    const b7: number[] = last7DayResult?.map(data => data.A_imp) ?? [];
    const c7: number[] = last7DayResult?.map(data => data.A_exp) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date).format('DD/MM/YYYY') : '';

    // Điện áp trung bình ngày 1
    const avga1: number = parseFloat((a1.reduce((acc, val) => acc + val, 0) / a1.length).toFixed(1));
    const avgb1: number = parseFloat((b1.reduce((acc, val) => acc + val, 0) / b1.length).toFixed(1));
    const avgc1: number = parseFloat((c1.reduce((acc, val) => acc + val, 0) / c1.length).toFixed(1));
    // Điện áp trung bình ngày 2
    const avga2: number = parseFloat((a2.reduce((acc, val) => acc + val, 0) / a2.length).toFixed(1));
    const avgb2: number = parseFloat((b2.reduce((acc, val) => acc + val, 0) / b2.length).toFixed(1));
    const avgc2: number = parseFloat((c2.reduce((acc, val) => acc + val, 0) / c2.length).toFixed(1));
    // Điện áp trung bình ngày 3
    const avga3: number = parseFloat((a3.reduce((acc, val) => acc + val, 0) / a3.length).toFixed(1));
    const avgb3: number = parseFloat((b3.reduce((acc, val) => acc + val, 0) / b3.length).toFixed(1));
    const avgc3: number = parseFloat((c3.reduce((acc, val) => acc + val, 0) / c3.length).toFixed(1));
    // Điện áp trung bình ngày 4
    const avga4: number = parseFloat((a4.reduce((acc, val) => acc + val, 0) / a4.length).toFixed(1));
    const avgb4: number = parseFloat((b4.reduce((acc, val) => acc + val, 0) / b4.length).toFixed(1));
    const avgc4: number = parseFloat((c4.reduce((acc, val) => acc + val, 0) / c4.length).toFixed(1));
    // Điện áp trung bình ngày 5
    const avga5: number = parseFloat((a5.reduce((acc, val) => acc + val, 0) / a5.length).toFixed(1));
    const avgb5: number = parseFloat((b5.reduce((acc, val) => acc + val, 0) / b5.length).toFixed(1));
    const avgc5: number = parseFloat((c5.reduce((acc, val) => acc + val, 0) / c5.length).toFixed(1));
    // Điện áp trung bình ngày 6
    const avga6: number = parseFloat((a6.reduce((acc, val) => acc + val, 0) / a6.length).toFixed(1));
    const avgb6: number = parseFloat((b6.reduce((acc, val) => acc + val, 0) / b6.length).toFixed(1));
    const avgc6: number = parseFloat((c6.reduce((acc, val) => acc + val, 0) / c6.length).toFixed(1));
    // Điện áp trung bình ngày 7
    const avga7 = parseFloat((a7.reduce((acc, val) => acc + val, 0) / a7.length).toFixed(1));
    const avgb7 = parseFloat((b7.reduce((acc, val) => acc + val, 0) / b7.length).toFixed(1));
    const avgc7 = parseFloat((c7.reduce((acc, val) => acc + val, 0) / c7.length).toFixed(1));

    // Tạo mảng data để vẽ biểu đồ
    const avgArraya: number[] = [avga7, avga6, avga5, avga4, avga3, avga2, avga1];
    const avgArrayb: number[] = [avgb7, avgb6, avgb5, avgb4, avgb3, avgb2, avgb1];
    const avgArrayc: number[] = [avgc7, avgc6, avgc5, avgc4, avgc3, avgc2, avgc1];

    // Tạo biểu đồ
    const chart = Chart.getChart('dtsu666_diennanglastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('dtsu666_diennanglastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'Asum',
            data: avgArraya,
            borderColor: 'rgb(255, 23, 22)',
            backgroundColor: 'rgb(255, 23, 22,0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
          {
            label: 'Aimp',
            data: avgArrayb,
            borderColor: 'rgb(255, 246, 0)',
            backgroundColor: 'rgb(255, 246, 0, 0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
          {
            label: 'Aexp',
            data: avgArrayc,
            borderColor: 'rgb(38, 160, 255)',
            backgroundColor: 'rgb(38, 160, 255,0.2)',
            borderWidth: 0.3,
            hidden: true,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'ĐIỆN NĂNG TIÊU THỤ',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
  // PZEM017
  async pzem017_ulastweek() {
    // Điện áp ngày 1 
    const last1DayResult = await this.http.PZEM017_last1day().toPromise();
    const u1: number[] = last1DayResult?.map(data => data.U1) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Điện áp ngày 2
    const last2DayResult = await this.http.PZEM017_last2day().toPromise();
    const u2: number[] = last2DayResult?.map(data => data.U1) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 3
    const last3DayResult = await this.http.PZEM017_last3day().toPromise();
    const u3: number[] = last3DayResult?.map(data => data.U1) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 4
    const last4DayResult = await this.http.PZEM017_last4day().toPromise();
    const u4: number[] = last4DayResult?.map(data => data.U1) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 5
    const last5DayResult = await this.http.PZEM017_last5day().toPromise();
    const u5: number[] = last5DayResult?.map(data => data.U1) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 6
    const last6DayResult = await this.http.PZEM017_last6day().toPromise();
    const u6: number[] = last6DayResult?.map(data => data.U1) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 7
    const last7DayResult = await this.http.PZEM017_last7day().toPromise();
    const u7: number[] = last7DayResult?.map(data => data.U1) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Điện áp trung bình ngày 1
    const avgu1: number = parseFloat((u1.reduce((acc, val) => acc + val, 0) / u1.length).toFixed(1));
    const avgu2: number = parseFloat((u2.reduce((acc, val) => acc + val, 0) / u2.length).toFixed(1));
    const avgu3: number = parseFloat((u3.reduce((acc, val) => acc + val, 0) / u3.length).toFixed(1));
    const avgu4: number = parseFloat((u4.reduce((acc, val) => acc + val, 0) / u4.length).toFixed(1));
    const avgu5: number = parseFloat((u5.reduce((acc, val) => acc + val, 0) / u5.length).toFixed(1));
    const avgu6: number = parseFloat((u6.reduce((acc, val) => acc + val, 0) / u6.length).toFixed(1));
    const avgu7: number = parseFloat((u7.reduce((acc, val) => acc + val, 0) / u7.length).toFixed(1));


    // Tạo mảng data để vẽ biểu đồ
    const avgArrayu1: number[] = [avgu7, avgu6, avgu5, avgu4, avgu3, avgu2, avgu1];


    // Tạo biểu đồ
    const chart = Chart.getChart('pzem017_dienaplastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('pzem017_dienaplastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'U1',
            data: avgArrayu1,
            borderColor: 'rgb(255, 23, 22)',
            backgroundColor: 'rgb(255, 23, 22,0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'PZEM-017 ĐIỆN ÁP',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
  async pzem017_ilastweek() {
    // Điện áp ngày 1 
    const last1DayResult = await this.http.PZEM017_last1day().toPromise();
    const i1: number[] = last1DayResult?.map(data => data.I1) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Điện áp ngày 2
    const last2DayResult = await this.http.PZEM017_last2day().toPromise();
    const i2: number[] = last2DayResult?.map(data => data.I1) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 3
    const last3DayResult = await this.http.PZEM017_last3day().toPromise();
    const i3: number[] = last3DayResult?.map(data => data.I1) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 4
    const last4DayResult = await this.http.PZEM017_last4day().toPromise();
    const i4: number[] = last4DayResult?.map(data => data.I1) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 5
    const last5DayResult = await this.http.PZEM017_last5day().toPromise();
    const i5: number[] = last5DayResult?.map(data => data.I1) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 6
    const last6DayResult = await this.http.PZEM017_last6day().toPromise();
    const i6: number[] = last6DayResult?.map(data => data.I1) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Điện áp ngày 7
    const last7DayResult = await this.http.PZEM017_last7day().toPromise();
    const i7: number[] = last7DayResult?.map(data => data.I1) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Điện áp trung bình ngày 1
    const avgi1: number = parseFloat((i1.reduce((acc, val) => acc + val, 0) / i1.length).toFixed(1));
    const avgi2: number = parseFloat((i2.reduce((acc, val) => acc + val, 0) / i2.length).toFixed(1));
    const avgi3: number = parseFloat((i3.reduce((acc, val) => acc + val, 0) / i3.length).toFixed(1));
    const avgi4: number = parseFloat((i4.reduce((acc, val) => acc + val, 0) / i4.length).toFixed(1));
    const avgi5: number = parseFloat((i5.reduce((acc, val) => acc + val, 0) / i5.length).toFixed(1));
    const avgi6: number = parseFloat((i6.reduce((acc, val) => acc + val, 0) / i6.length).toFixed(1));
    const avgi7: number = parseFloat((i7.reduce((acc, val) => acc + val, 0) / i7.length).toFixed(1));


    // Tạo mảng data để vẽ biểu đồ
    const avgArrayi1: number[] = [avgi7, avgi6, avgi5, avgi4, avgi3, avgi2, avgi1];


    // Tạo biểu đồ
    const chart = Chart.getChart('pzem017_dongdienlastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('pzem017_dongdienlastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'I1',
            data: avgArrayi1,
            borderColor: 'rgb(255, 246, 0)',
            backgroundColor: 'rgb(255, 246, 0, 0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'PZEM-017 DÒNG ĐIỆN',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
  async pzem017_plastweek() {
    // Công suất tiêu thụ ngày 1 
    const last1DayResult = await this.http.PZEM017_last1day().toPromise();
    const p1: number[] = last1DayResult?.map(data => data.P1) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Công suất tiêu thụ ngày 2
    const last2DayResult = await this.http.PZEM017_last2day().toPromise();
    const p2: number[] = last2DayResult?.map(data => data.P1) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 3
    const last3DayResult = await this.http.PZEM017_last3day().toPromise();
    const p3: number[] = last3DayResult?.map(data => data.P1) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 4
    const last4DayResult = await this.http.PZEM017_last4day().toPromise();
    const p4: number[] = last4DayResult?.map(data => data.P1) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 5
    const last5DayResult = await this.http.PZEM017_last5day().toPromise();
    const p5: number[] = last5DayResult?.map(data => data.P1) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 6
    const last6DayResult = await this.http.PZEM017_last6day().toPromise();
    const p6: number[] = last6DayResult?.map(data => data.P1) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 7
    const last7DayResult = await this.http.PZEM017_last7day().toPromise();
    const p7: number[] = last7DayResult?.map(data => data.P1) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Điện áp trung bình 
    const avgp1: number = parseFloat((p1.reduce((acc, val) => acc + val, 0) / p1.length).toFixed(1));
    const avgp2: number = parseFloat((p2.reduce((acc, val) => acc + val, 0) / p2.length).toFixed(1));
    const avgp3: number = parseFloat((p3.reduce((acc, val) => acc + val, 0) / p3.length).toFixed(1));
    const avgp4: number = parseFloat((p4.reduce((acc, val) => acc + val, 0) / p4.length).toFixed(1));
    const avgp5: number = parseFloat((p5.reduce((acc, val) => acc + val, 0) / p5.length).toFixed(1));
    const avgp6: number = parseFloat((p6.reduce((acc, val) => acc + val, 0) / p6.length).toFixed(1));
    const avgp7: number = parseFloat((p7.reduce((acc, val) => acc + val, 0) / p7.length).toFixed(1));


    // Tạo mảng data để vẽ biểu đồ
    const avgArrayp1: number[] = [avgp7, avgp6, avgp5, avgp4, avgp3, avgp2, avgp1];


    // Tạo biểu đồ
    const chart = Chart.getChart('pzem017_congsuatlastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('pzem017_congsuatlastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'P1',
            data: avgArrayp1,
            borderColor: 'rgb(43, 255, 0)',
            backgroundColor: 'rgb(43, 255, 0,0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'PZEM-017 CÔNG SUẤT TIÊU THỤ',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }
  async pzem017_alastweek() {
    // Công suất tiêu thụ ngày 1 
    const last1DayResult = await this.http.PZEM017_last1day().toPromise();
    const a1: number[] = last1DayResult?.map(data => data.A1) ?? [];
    const date1: string = last1DayResult && last1DayResult[0] ? moment(last1DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Công suất tiêu thụ ngày 2
    const last2DayResult = await this.http.PZEM017_last2day().toPromise();
    const a2: number[] = last2DayResult?.map(data => data.A1) ?? [];
    const date2: string = last2DayResult && last2DayResult[0] ? moment(last2DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 3
    const last3DayResult = await this.http.PZEM017_last3day().toPromise();
    const a3: number[] = last3DayResult?.map(data => data.A1) ?? [];
    const date3: string = last3DayResult && last3DayResult[0] ? moment(last3DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 4
    const last4DayResult = await this.http.PZEM017_last4day().toPromise();
    const a4: number[] = last4DayResult?.map(data => data.A1) ?? [];
    const date4: string = last4DayResult && last4DayResult[0] ? moment(last4DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 5
    const last5DayResult = await this.http.PZEM017_last5day().toPromise();
    const a5: number[] = last5DayResult?.map(data => data.A1) ?? [];
    const date5: string = last5DayResult && last5DayResult[0] ? moment(last5DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 6
    const last6DayResult = await this.http.PZEM017_last6day().toPromise();
    const a6: number[] = last6DayResult?.map(data => data.A1) ?? [];
    const date6: string = last6DayResult && last6DayResult[0] ? moment(last6DayResult[0].Date1).format('DD/MM/YYYY') : '';
    // Công suất tiêu thụ ngày 7
    const last7DayResult = await this.http.PZEM017_last7day().toPromise();
    const a7: number[] = last7DayResult?.map(data => data.A1) ?? [];
    const date7: string = last7DayResult && last7DayResult[0] ? moment(last7DayResult[0].Date1).format('DD/MM/YYYY') : '';

    // Điện áp trung bình 
    const avga1: number = parseFloat((a1.reduce((acc, val) => acc + val, 0) / a1.length).toFixed(1));
    const avga2: number = parseFloat((a2.reduce((acc, val) => acc + val, 0) / a2.length).toFixed(1));
    const avga3: number = parseFloat((a3.reduce((acc, val) => acc + val, 0) / a3.length).toFixed(1));
    const avga4: number = parseFloat((a4.reduce((acc, val) => acc + val, 0) / a4.length).toFixed(1));
    const avga5: number = parseFloat((a5.reduce((acc, val) => acc + val, 0) / a5.length).toFixed(1));
    const avga6: number = parseFloat((a6.reduce((acc, val) => acc + val, 0) / a6.length).toFixed(1));
    const avga7: number = parseFloat((a7.reduce((acc, val) => acc + val, 0) / a7.length).toFixed(1));


    // Tạo mảng data để vẽ biểu đồ
    const avgArraya1: number[] = [avga7, avga6, avga5, avga4, avga3, avga2, avga1];


    // Tạo biểu đồ
    const chart = Chart.getChart('pzem017_diennanglastweek');
    if (chart) {
      chart.destroy();
    }

    this.myChart = new Chart('pzem017_diennanglastweek', {
      type: 'bar',
      data: {
        labels: [date7, date6, date5, date4, date3, date2, date1],
        datasets: [
          {
            label: 'A1',
            data: avgArraya1,
            borderColor: 'rgb(38, 160, 255)',
            backgroundColor: 'rgb(38, 160, 255,0.2)',
            borderWidth: 0.3,
            hidden: false,
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        plugins: {
          datalabels: {
            display: true
          },
          subtitle: {
            display: true,
            text: 'PZEM-017 ĐIỆN NĂNG TIÊU THỤ',
            font: {
              size: 15,
              family: "'Nunito', sans-serif",
            },
            color: 'white',
            padding: {
              top: 5,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 15,
              boxHeight: 8,

            },
          },
        },

        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              color: '#2d2b2b'
            },
          }
        },
      },
    });
  }


  //---------------------Thẻ Custom--------------------
  //DATE RANGERPICKER
  async Dashboard_Custom() {
    await this.http.DTSU666_bangcustom(this.datea, this.dateb).subscribe(
      (data) => {
        this.dtsu66table = data;
        // To day
        this.dtsu666_uphatoday();
        this.dtsu666_iphatoday();
        this.dtsu666_pphatoday();
        this.dtsu666_aphatoday();
        this.pzem017_uphatoday();
        this.pzem017_iphatoday();
        this.pzem017_pphatoday();
        this.pzem017_aphatoday();
        // Custom
        this.dtsu666_uphacustom();
        this.dtsu666_iphacustom();
        this.dtsu666_pphacustom();
        this.dtsu666_aphacustom();
        this.pzem017_uphacustom();
        this.pzem017_iphacustom();
        this.pzem017_pphacustom();
        this.pzem017_aphacustom();
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      });

    await this.http.PZEM017_bangcustom(this.datea, this.dateb).subscribe(
      (data1) => {
        this.pzem017table = data1;
      });

  }
  //----DTSU666 Filter Date----
  async dtsu666_uphacustom() {
    await this.http.DTSU666_dienapphacustom(this.datea, this.dateb).subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const ua = this.dtsu666custom.map(data => data.Ua);
        const ub = this.dtsu666custom.map(data => data.Ub);
        const uc = this.dtsu666custom.map(data => data.Uc);
        const date1 = this.dtsu666custom.map(data => data.Date);

        // Tính trung bình
        const avgArray_ua = Array.from({ length: ua.length }, () => ua.reduce((acc, val) => acc + val) / ua.length);
        const avgArray_ub = Array.from({ length: ub.length }, () => ub.reduce((acc, val) => acc + val) / ub.length);
        const avgArray_uc = Array.from({ length: uc.length }, () => uc.reduce((acc, val) => acc + val) / uc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dienapphatodaycustom');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_dienapphatodaycustom', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            //labels: date1.map(date => format(new Date(date), 'hh:mm')),
            labels: date1.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'Ua',
                data: ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Uatb',
                data: avgArray_ua,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
              {
                label: 'Ub',
                data: ub,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Ubtb',
                data: avgArray_ub,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Uc',
                data: uc,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Uctb',
                data: avgArray_uc,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'ĐIỆN ÁP PHA',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                type: 'linear',
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },

              }

            },

          },

        });

      })
  }
  async dtsu666_iphacustom() {

    await this.http.DTSU666_dongienphacustom(this.datea, this.dateb).subscribe(

      result => {
        this.dtsu666custom = result;
        const ia1 = this.dtsu666custom.map(data => data.Ia);
        const ib1 = this.dtsu666custom.map(data => data.Ib);
        const ic1 = this.dtsu666custom.map(data => data.Ic);
        const date1 = this.dtsu666custom.map(data => data.Date);
        // Tính trung bình
        const avgArray_ia1 = Array.from({ length: ia1.length }, () => ia1.reduce((acc, val) => acc + val) / ia1.length);
        const avgArray_ib1 = Array.from({ length: ib1.length }, () => ib1.reduce((acc, val) => acc + val) / ib1.length);
        const avgArray_ic1 = Array.from({ length: ic1.length }, () => ic1.reduce((acc, val) => acc + val) / ic1.length);
        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_dongdienphacustom');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_dongdienphacustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'Ia',
                data: ia1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Iatb',
                data: avgArray_ia1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
              {
                label: 'Ib',
                data: avgArray_ib1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Ibtb',
                data: ib1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Ic',
                data: ic1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Ictb',
                data: avgArray_ic1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'DÒNG ĐIỆN PHA',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },


              }

            },

          },

        });

      })
  }
  async dtsu666_pphacustom() {

    //await this.dtsu666today.dtsu666_ppha_today().subscribe(
    await this.http.DTSU666_cstieuthucustom(this.datea, this.dateb).subscribe(

      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const pft = this.dtsu666custom.map(data => data.Pft);
        const pfa = this.dtsu666custom.map(data => data.Pfa);
        const pfb = this.dtsu666custom.map(data => data.Pfb);
        const pfc = this.dtsu666custom.map(data => data.Pfc);
        const date1 = this.dtsu666custom.map(data => data.Date);

        // Tính trung bình
        const avgArray_ft = Array.from({ length: pft.length }, () => pft.reduce((acc, val) => acc + val) / pft.length);
        const avgArray_fa = Array.from({ length: pfa.length }, () => pfa.reduce((acc, val) => acc + val) / pfa.length);
        const avgArray_fb = Array.from({ length: pfb.length }, () => pfb.reduce((acc, val) => acc + val) / pfb.length);
        const avgArray_fc = Array.from({ length: pfc.length }, () => pfc.reduce((acc, val) => acc + val) / pfc.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_pphacustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('dtsu666_pphacustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'Pt',
                data: pft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Pttb',
                data: avgArray_ft,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
              {
                label: 'Pa',
                data: pfa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Patb',
                data: avgArray_fa,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Pb',
                data: pfb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Pbtb',
                data: avgArray_fb,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Pc',
                data: pfc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Pctb',
                data: avgArray_fc,
                borderColor: 'blue',
                backgroundColor: 'blue',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'CÔNG SUẤT TIÊU THỤ',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,
                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async dtsu666_aphacustom() {

    await this.http.DTSU666_atieuthucustom(this.datea, this.dateb).subscribe(
      result => {
        this.dtsu666custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử 
        const asum = this.dtsu666custom.map(data => data.A_sum);
        const aimp = this.dtsu666custom.map(data => data.A_imp);
        const aexp = this.dtsu666custom.map(data => data.A_exp);
        const date22 = this.dtsu666custom.map(data => data.Date);

        // Tính trung bình
        const avgArray_asum = Array.from({ length: asum.length }, () => asum.reduce((acc, val) => acc + val) / asum.length);
        const avgArray_aimp = Array.from({ length: aimp.length }, () => aimp.reduce((acc, val) => acc + val) / aimp.length);
        const avgArray_aexp = Array.from({ length: aexp.length }, () => aexp.reduce((acc, val) => acc + val) / aexp.length);
        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('dtsu666_diennangtieuthucustom');
        if (chart) {
          chart.destroy();
        }

        this.myChart = new Chart('dtsu666_diennangtieuthucustom', {
          type: 'line',
          data: {
            labels: date22.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'Asum',
                data: asum,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'Asumtb',
                data: avgArray_asum,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
              {
                label: 'Aimp',
                data: aimp,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Aimptb',
                data: avgArray_aimp,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
              {
                label: 'Aexp',
                data: aexp,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: true,
              },
              {
                label: 'Aexptb',
                data: avgArray_aexp,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: true,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'ĐIỆN NĂNG TIÊU THỤ',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,
                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  //PZEM017 FilterDate
  async pzem017_uphacustom() {

    await this.http.PZEM017_dienapDCcustom(this.datea, this.dateb).subscribe(
      result => {
        this.pzem017custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const u1 = this.pzem017custom.map(data => data.U1);
        const date1 = this.pzem017custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_u1 = Array.from({ length: u1.length }, () => u1.reduce((acc, val) => acc + val) / u1.length);

        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dienapphacustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017_dienapphacustom', {
          type: 'line',
          data: {
            //labels: Array.from({ length: 7 }, (_, i) => subMonths(new Date(), i)).reverse().map(date => format(date, 'MMM')),
            //labels: date1.map(date => format(new Date(date), 'hh:mm')),
            labels: date1.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'U1',
                data: u1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'U1tb',
                data: avgArray_u1,
                borderColor: 'red',
                backgroundColor: 'red',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - ĐIỆN ÁP',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                type: 'linear',
                beginAtZero: true,
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_iphacustom() {

    await this.http.PZEM017_dongdienDCcustom(this.datea, this.dateb).subscribe(
      result => {
        this.pzem017custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const i1 = this.pzem017custom.map(data => data.I1);
        const date1 = this.pzem017custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_i1 = Array.from({ length: i1.length }, () => i1.reduce((acc, val) => acc + val) / i1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017_dongdienphacustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017_dongdienphacustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'I1',
                data: i1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'I1tb',
                data: avgArray_i1,
                borderColor: 'yellow',
                backgroundColor: 'yellow',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - DÒNG ĐIỆN',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_pphacustom() {

    await this.http.PZEM017_conguatDCcustom(this.datea, this.dateb).subscribe(
      result => {
        this.pzem017custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const p1 = this.pzem017custom.map(data => data.P1);
        const date1 = this.pzem017custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_p1 = Array.from({ length: p1.length }, () => p1.reduce((acc, val) => acc + val) / p1.length);



        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017congsuatcustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017congsuatcustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'P1',
                data: p1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'P1tb',
                data: avgArray_p1,
                borderColor: 'green',
                backgroundColor: 'green',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - CÔNG SUẤT',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }
  async pzem017_aphacustom() {

    await this.http.PZEM017_diennangDCcustom(this.datea, this.dateb).subscribe(
      result => {
        this.pzem017custom = result;
        // Trả về 1 chuỗi giá trị của từng phần tử
        const a1 = this.pzem017custom.map(data => data.A1);
        const date1 = this.pzem017custom.map(data => data.Date1);
        // Tính trung bình
        const avgArray_a1 = Array.from({ length: a1.length }, () => a1.reduce((acc, val) => acc + val) / a1.length);


        // Hủy Chart hiện tại (nếu có)
        const chart = Chart.getChart('pzem017diennangcustom');
        if (chart) {
          chart.destroy();
        }


        this.myChart = new Chart('pzem017diennangcustom', {
          type: 'line',
          data: {
            labels: date1.map(date => moment(date).format('DD/MM - HH:mm')),
            datasets: [
              {
                label: 'A1',
                data: a1,
                borderColor: '#00FFFF',
                backgroundColor: '#00FFFF',
                borderWidth: 0.8,
                pointRadius: 1,
                hidden: false,
              },
              {
                label: 'A1tb',
                data: avgArray_a1,
                borderColor: '#00FFFF',
                backgroundColor: '#00FFFF',
                borderWidth: 1,
                pointRadius: 0.5,
                hidden: false,
              },
            ]
          },
          options: {
            plugins: {
              datalabels: {
                display: false
              },
              subtitle: {
                display: true,
                text: 'PZEM017 - ĐIỆN NĂNG',
                font: {
                  size: 15,
                  family: "'Nunito', sans-serif",
                },
                color: 'white',
                padding: {
                  top: 5,
                  bottom: 0
                }
              },
              legend: {
                display: true,
                position: 'top',
                align: 'end',
                labels: {
                  boxWidth: 10,
                  boxHeight: 5,

                },
              },
              decimation: {
                enabled: true,
                algorithm: 'min-max',
              },
              tooltip: {
                enabled: true
              }
            },

            scales: {
              x: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              },
              y: {
                ticks: {
                  font: {
                    size: 10,     // Cỡ chữ
                  }
                },
                display: true,
                beginAtZero: true,
                type: 'linear',
                offset: true,
                grid: {
                  color: '#2d2b2b'
                },
              }
            },
          },
        });
      })
  }

  //---------------------Thẻ Chung--------------------
  ngAfterViewInit() {
    const t = document.getElementById("moment");
    const w = document.getElementById("today");
    const m = document.getElementById("lastweek");
    const y = document.getElementById("custom");
    const date = document.getElementById("date");

    if (t) {
      t.addEventListener('click', () => {
        date!.innerHTML = moment().format('MMMM, Do YYYY');
      });
      t.click();
    }
    w?.addEventListener('click', () => {
      date!.innerHTML = moment().format('MMMM, Do YYYY');
    });

    m?.addEventListener('click', () => {
      const startOfPreviousWeek = moment().subtract(7, 'days').startOf('day').format('MMMM Do');
      const endOfPreviousWeek = moment().subtract(1, 'day').endOf('day').format('MMMM Do, YYYY');
      date!.innerHTML = `From ${startOfPreviousWeek} to ${endOfPreviousWeek}`;
    });

    // logic for year button when the user is on dashboard
    y?.addEventListener('click', () => {
      date!.innerHTML = moment().format('YYYY');
    });

    const modal1 = document.getElementById('exampleModalToggle');
    if (modal1) {
      modal1.addEventListener('hidden.bs.modal', function (event) {
        modal1.remove();
        modal1.classList.remove('show');
        modal1.style.display = 'none';
        console.log('Modal 1 hidden');
      });
    }

    const modal2 = document.getElementById('exampleModalToggle2');
    if (modal2) {
      modal2.addEventListener('hidden.bs.modal', function (event) {
        modal2.remove();
        modal2.classList.remove('show');
        modal2.style.display = 'none';
        console.log('Modal 2 hidden');
      });
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------

}




