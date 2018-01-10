import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Poll} from "../../models/poll";

@Component({
  selector: 'fcc-poll-chart',
  templateUrl: './poll-chart.component.html',
  styles: [`
    .chart-container {
      display: flex;
      justify-content: center;
    }
  `]
})
export class PollChartComponent implements OnInit, OnChanges {

  @ViewChild('chart')
  chart: ElementRef;

  @Input()
  poll: Poll;

  private pie;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    const content = this.poll.options
      .filter(option => option.votes > 0)
      .map(option => ({
        label: option.title,
        value: option.votes
      }));
    const canvasWidth = 500, canvasHeight = 350;
    if (content.length > 0) {
      if (this.pie) this.pie.destroy();
      this.pie = new (<any> window).d3pie(this.chart.nativeElement, {
        data: {content},
        size: {
          canvasWidth,
          canvasHeight
        },
        callbacks: {
          onload: () => {
            this.chart.nativeElement.querySelector('svg')
              .setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);
          }
        }
      });
    }
  }

}
