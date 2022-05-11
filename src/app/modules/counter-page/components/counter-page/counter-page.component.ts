import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrls: ['./counter-page.component.scss'],
})
export class CounterPageComponent implements OnInit, OnDestroy {
  totalCounter$: Observable<number>;

  @ViewChildren(CounterComponent)
  counterComponents: QueryList<CounterComponent>;

  private destroy$ = new Subject();

  constructor() {}

  ngOnInit() {
    // this.totalCounter$ = this.counterComponent.counter$.pipe(
    //   takeUntil(this.destroy$)
    // );
  }

  ngAfterViewInit() {
    const counters$ = this.counterComponents.map((c) => c.counter$);
    this.totalCounter$ = combineLatest([...counters$]).pipe(
      map((res) =>
        res.reduce((acc, counter) => {
          return acc + counter;
        }, 0)
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
