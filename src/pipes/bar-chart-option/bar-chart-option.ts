import { Pipe, PipeTransform } from '@angular/core';
import { Piece } from '../../models/models';

@Pipe({
  name: 'barChartOption',
})
export class BarChartOptionPipe implements PipeTransform {
  
  transform(value: Piece[], parentDiv) {
    const width = parentDiv.getBoundingClientRect().width;
    return {
      chart: {
        type: 'bar',
        width: width,
      },
      title: {
        text: ''
      },
      xAxis: {
        labels: {
          enabled: false
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          enabled: false
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          },
          pointPadding: 0,
          pointWidth: 30
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:15px;font-weight:bold">{point.name}</span><br>',
        pointFormat: '<span style="color:{point.color};text-transform: capitalize;">{point.name}</span>'
      },
      series: [{
        colorByPoint: true,
        data: value
      }],
      credits: {
        enabled: false
      }
    }
  }
}
