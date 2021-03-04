import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { map, mapTo, takeUntil } from "rxjs/operators";

@Directive({
  selector: "[matTableResponsive]"
})
export class MatTableResponsiveDirective implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<boolean>();

  private thead: HTMLTableSectionElement;
  private tbody: HTMLTableSectionElement;

  private theadChanged$ = new BehaviorSubject(true);
  private tbodyChanged$ = new Subject<boolean>();

  private theadObserver = new MutationObserver(() => this.theadChanged$.next(true));
  private tbodyObserver = new MutationObserver(() => this.tbodyChanged$.next(true));

  constructor(private table: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.thead = this.table.nativeElement.querySelector("thead");
    this.tbody = this.table.nativeElement.querySelector("tbody");

    this.theadObserver.observe(this.thead, { characterData: true, subtree: true });
    this.tbodyObserver.observe(this.tbody, { childList: true });
  }

  ngOnDestroy(): void {
    this.theadObserver.disconnect();
    this.tbodyObserver.disconnect();

    this.onDestroy$.next(true);
  }
}
