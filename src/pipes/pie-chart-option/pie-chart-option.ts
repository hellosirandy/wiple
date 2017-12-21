import { Pipe, PipeTransform } from '@angular/core';
import { Piece } from '../../models/models';

@Pipe({
  name: 'pieChartOption',
})
export class PieChartOptionPipe implements PipeTransform {
  
  transform(value: Piece[], parentDiv) {
    const width = parentDiv.getBoundingClientRect().width * 0.75;
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        width: width,
        height: width,
        style: {
          margin: 'auto',
          maxWidth: '400px',
          maxHeight: '400px'
        }
      },
      title: {
        text: '',
      },
      tooltip: {
        headerFormat: '<h3 style="text-transform: capitalize;">{point.key}</h3><br>',
        pointFormat: '<b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          borderWidth: 1
        }
      },
      series: [{
        name: 'percentage',
        colorByPoint: true,
        data: value
      }],
      credits: {
        enabled: false
      }
    };
  }
}
