import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DTSU666Model } from './dtsu666.model';
import { Pzem017Model } from './pzem017.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  //BaseUrl = "http://localhost:5000"
  BaseUrl = "http://192.168.1.82:5000"

  constructor(private http: HttpClient) { }


  //---------------------------------------------------------------------------------------------Moment---------------------------------------------------------------------
  //-------------------------------------DTSU66--------------------------------------------------------
  //Biến chung
  dtsu666_ui = 'Ua,Ub,Uc,Uab,Ubc,Uca,Ia,Ib,Ic';
  dtsu666PQPhiMomentFields = 'Pft,Pfa,Pfb,Pfc,Qft,Qfa,Qfb,Qfc,Cosft,Cosfa,Cosfb,Cosfc,Hz';
  dtsu666AMomentFields = 'A_sum,A_imp,A_exp,Q1,Q2,Q3,Q4';
  pzem017UIPAMomentFields = 'U1,I1,P1,A1';


  //Phương thức chung
  DTSU666_Moment(fields: string): Observable<Array<DTSU666Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&Fields=${fields}&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }

  PZEM017_Moment(fields: string): Observable<Array<Pzem017Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Fields1=${fields}&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  

  //---------------Điện áp pha,Điện áp dây, Dòng điện pha ----------------
  DTSU666_uimoment(): Observable<Array<DTSU666Model>> {
    return this.DTSU666_Moment(this.dtsu666_ui);
  }

  //---------------Công suất theo pha: p,q ; Cosphi ; Hz ----------------
  DTSU666_pqphimoment(): Observable<Array<DTSU666Model>> {
    return this.DTSU666_Moment(this.dtsu666PQPhiMomentFields);
  }
 
  //-------------Công suất -------------------
  DTSU666_amoment(): Observable<Array<DTSU666Model>> {
    return this.DTSU666_Moment(this.dtsu666AMomentFields);
  }
  
  
  //---------------------PZEM-017------------------------------
  Pzem017_uipamoment(): Observable<Array<Pzem017Model>> {
    return this.PZEM017_Moment(this.pzem017UIPAMomentFields);
  }


  //-----------------------------------------------------------------------------------------Today----------------------------------------------------------------------
  //---------------------------------------------------------------------DTSU666------------------------------
  //Biến chung


  //---------------Điện áp pha ----------------
  DTSU666_dienappha_today(): Observable<Array<DTSU666Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&Fields=Ua,Ub,Uc,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }

  //---------------Dòng điện pha ----------------
  DTSU666_dongdienpha_today(): Observable<Array<DTSU666Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&Fields=Ia,Ib,Ic,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }


  //---------------P tieu thu pha----------------
  DTSU666_ptieuthupha_today(): Observable<Array<DTSU666Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&&Fields=Pft,Pfa,Pfb,Pfc,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }


  //---------------Điện năng tiêu thụ ngày ----------------
  DTSU666_dienangtieuthu_today(): Observable<Array<DTSU666Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&Fields=A_sum,A_imp,A_exp,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }
  //------------------------------------PZEM017------------------------------
  //---------------Điện áp pha ----------------
  PZEM017_dienappha_today(): Observable<Array<Pzem017Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Fields1=U1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }

  //---------------Dòng điện ----------------
  PZEM017_dongdien_today(): Observable<Array<Pzem017Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Fields1=I1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  //---------------Công suất tiêu thụ ----------------
  PZEM017_ptieuthu_today(): Observable<Array<Pzem017Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Fields1=P1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  //---------------Điện năng tiêu thụ ----------------
  PZEM017_atieuthu_today(): Observable<Array<Pzem017Model>> {
    const startDate = moment().startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment().endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Fields1=A1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  //---------------------------------------------------------------------------Last Week-------------------------------------------------------
  
  //-------------------------------------DTSU666_LAST WEEK------------------------------
  getDTSU666Data(lastNDays: number): Observable<Array<DTSU666Model>> {
    const yesterday = moment().subtract(lastNDays, 'day'); // tính toán ngày trước đó
    const startDate = yesterday.startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = yesterday.endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Ua,Ub,Uc,Ia,Ib,Ic,Pft,Pfa,Pfb,Pfc,A_sum,A_imp,A_exp,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }

  DTSU666_last1day(): Observable<Array<DTSU666Model>> {
    return this.getDTSU666Data(1);
  }

  DTSU666_last2day(): Observable<Array<DTSU666Model>> {
    return this.getDTSU666Data(2);
  }

  DTSU666_last3day(): Observable<Array<DTSU666Model>> {
    return this.getDTSU666Data(3);
  }

  DTSU666_last4day(): Observable<Array<DTSU666Model>> {
    return this.getDTSU666Data(4);
  }

  DTSU666_last5day(): Observable<Array<DTSU666Model>> {
    return this.getDTSU666Data(5);
  }

  DTSU666_last6day(): Observable<Array<DTSU666Model>> {
    return this.getDTSU666Data(6);
  }

  DTSU666_last7day(): Observable<Array<DTSU666Model>> {
    return this.getDTSU666Data(7);
  }

  //-------------------------------------PZEM-017_LAST WEEK------------------------------
  getPZEM017Data(lastNDays: number): Observable<Array<Pzem017Model>> {
    const yesterday = moment().subtract(lastNDays, 'day'); // tính toán ngày trước đó
    const startDate = yesterday.startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = yesterday.endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Fields1=U1,I1,P1,A1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }

  PZEM017_last1day(): Observable<Array<Pzem017Model>> {
    return this.getPZEM017Data(1);
  }

  PZEM017_last2day(): Observable<Array<Pzem017Model>> {
    return this.getPZEM017Data(2);
  }

  PZEM017_last3day(): Observable<Array<Pzem017Model>> {
    return this.getPZEM017Data(3);
  }

  PZEM017_last4day(): Observable<Array<Pzem017Model>> {
    return this.getPZEM017Data(4);
  }

  PZEM017_last5day(): Observable<Array<Pzem017Model>> {
    return this.getPZEM017Data(5);
  }

  PZEM017_last6day(): Observable<Array<Pzem017Model>> {
    return this.getPZEM017Data(6);
  }

  PZEM017_last7day(): Observable<Array<Pzem017Model>> {
    return this.getPZEM017Data(7);
  }

  //----------------------------------------------------------------------- Custom------------------------------------------------------------------------------------
  //-------- DTSU666-FILTER DATE----------
  // Bảng chi tiết
  DTSU666_getalll(fields: string): Observable<Array<DTSU666Model>> {
    const url = `${this.BaseUrl}/dtsu666?Fields=${fields}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }
  DTSU666_bangcustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }
  // Điện áp pha 
  DTSU666_dienapphacustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Ua,Ub,Uc,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }
  // Dòng điện pha 
  DTSU666_dongienphacustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Ia,Ib,Ic,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }
  // Công suất tiêu thụ 
  DTSU666_cstieuthucustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=Pft,Pfa,Pfb,Pfc,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }
  // Điện năng tiêu thụ 
  DTSU666_atieuthucustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/dtsu666?Fields=A_sum,A_imp,A_exp,Date&start=${startDate}&end=${endDate}`;
    return this.http.get<Array<DTSU666Model>>(url);
  }

  //-------- PZEM017-FILTER DATE----------
  PZEM017_bangcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }

  // Điện áp DC 
  PZEM017_dienapDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=U1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  // Dòng điện DC 
  PZEM017_dongdienDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=I1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  // Công suất DC 
  PZEM017_conguatDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=P1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  // Điện năng DC 
  PZEM017_diennangDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
    const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
    const url = `${this.BaseUrl}/pzem017?Fields=A1,Date1&Start1=${startDate}&End1=${endDate}`;
    return this.http.get<Array<Pzem017Model>>(url);
  }
  //----------------------------------------------------------------------- Custom------------------------------------------------------------------------------------
  ////-------- DTSU666-FILTER DATE----------
  //// Bảng chi tiết
  //DTSU666_getalll(fields: string): Observable<Array<DTSU666Model>> {
  //  const url = `${this.BaseUrl}/dtsu666?Fields=${fields}`;
  //  return this.http.get<Array<DTSU666Model>>(url);
  //}
  //DTSU666_bangcustom(fields: string,date1: string, date2: string): Observable<Array<DTSU666Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/dtsu666?Fields=${fields}&start=${startDate}&end=${endDate}`;
  //  return this.http.get<Array<DTSU666Model>>(url);
  //}
  //// Điện áp pha 
  //DTSU666_dienapphacustom(date1: string, date2: string): Observable<Array<DTSU666Model>>{
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/dtsu666?Fields=Ua,Ub,Uc,Date&start=${startDate}&end=${endDate}`;
  //  return this.http.get<Array<DTSU666Model>>(url);
  //}
  //// Dòng điện pha 
  //DTSU666_dongienphacustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/dtsu666?Fields=Ia,Ib,Ic,Date&start=${startDate}&end=${endDate}`;
  //  return this.http.get<Array<DTSU666Model>>(url);
  //}
  //// Công suất tiêu thụ 
  //DTSU666_cstieuthucustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/dtsu666?Fields=Pft,Pfa,Pfb,Pfc,Date&start=${startDate}&end=${endDate}`;
  //  return this.http.get<Array<DTSU666Model>>(url);
  //}
  //// Điện năng tiêu thụ 
  //DTSU666_atieuthucustom(date1: string, date2: string): Observable<Array<DTSU666Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/dtsu666?Fields=A_sum,A_imp,A_exp,Date&start=${startDate}&end=${endDate}`;
  //  return this.http.get<Array<DTSU666Model>>(url);
  //}

  ////-------- PZEM017-FILTER DATE----------
  //PZEM017_bangcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/pzem017?&Start1=${startDate}&End1=${endDate}`;
  //  return this.http.get<Array<Pzem017Model>>(url);
  //}

  //// Điện áp DC 
  //PZEM017_dienapDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/pzem017?Fields=U1,Date1&Start1=${startDate}&End1=${endDate}`;
  //  return this.http.get<Array<Pzem017Model>>(url);
  //}
  //// Dòng điện DC 
  //PZEM017_dongdienDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/pzem017?Fields=I1,Date1&Start1=${startDate}&End1=${endDate}`;
  //  return this.http.get<Array<Pzem017Model>>(url);
  //}
  //// Công suất DC 
  //PZEM017_conguatDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/pzem017?Fields=P1,Date1&Start1=${startDate}&End1=${endDate}`;
  //  return this.http.get<Array<Pzem017Model>>(url);
  //}
  //// Điện năng DC 
  //PZEM017_diennangDCcustom(date1: string, date2: string): Observable<Array<Pzem017Model>> {
  //  const startDate = moment(date1).startOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const endDate = moment(date2).endOf('day').format("YYYY-MM-DDTHH:mm:ss");
  //  const url = `${this.BaseUrl}/pzem017?Fields=A1,Date1&Start1=${startDate}&End1=${endDate}`;
  //  return this.http.get<Array<Pzem017Model>>(url);
  //}

}
