export class TableRestApiModel {

  Id!: string;
  Name!: string;
  //Công suất tổng
  A_sum!: number;
  A_imp!: number;
  A_exp!: number;
  //Công suất phản kháng Q
  Q1!: number;
  Q2!: number;
  Q3!: number;
  Q4!: number;
  //Điện áp dây
  Uab!: number;
  Ubc!: number;
  Uca!: number;
  //Điện áp pha 
  Ua!: number;
  Ub!: number;
  Uc!: number;
  //Dòng điện pha
  Ia!: number;
  Ib!: number;
  Ic!: number;
  //Công suất tiêu thụ pha
  Pft!: number;
  Pfa!: number;
  Pfb!: number;
  Pfc!: number;
  //Công suất phản kháng pha
  Qft!: number;
  Qfa!: number;
  Qfb!: number;
  Qfc!: number;
  //Hệ số công suất pha
  Cosft!: number;
  Cosfa!: number;
  Cosfb!: number;
  Cosfc!: number;
  //Tần số
  Hz!: number;
  Date!:string;

}
