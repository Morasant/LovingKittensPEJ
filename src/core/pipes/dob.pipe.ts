import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dob',
})
export class DobPipe implements PipeTransform {
  transform(date: string) {
    let bornDate = new Date(date);
    let actualDate = new Date();

    let m = moment(actualDate);
    let years = m.diff(bornDate, 'years');
    m.add(-years, 'years');
    let months = m.diff(bornDate, 'months');
    m.add(-months, 'months');
    let days = m.diff(bornDate, 'days');

    let message = ''
    //Fecha con años, meses y días
    if(years > 0 && months > 0 && days > 0){
      message = `Nació hace ${years} años, ${months} meses y ${days} días.`;
    }
    //Fecha con años y meses
    else if(years > 0 && months > 0 && days == 0){
      message = `Nació hace ${years} años y ${months} meses.`;
    }
    //Fecha con años y días
    else if(years > 0 && months == 0 && days > 0){
      message = `Nació hace ${years} años y ${days} días.`;
    }
    //Fecha con años
    else if(years > 0 && months == 0 && days == 0){
      message = `Nació hace ${years} años.`;
    }
    //Fecha con meses y días
    else if(years == 0 && months > 0 && days > 0){
      message = `Nació hace ${months} meses y ${days} días.`;
    }
    //Fecha con días
    else if(years == 0 && months == 0 && days > 0){
      message = `Nació hace ${days} días.`;
    }

    return message;
  }
}
