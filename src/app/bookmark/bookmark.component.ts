import {Component, OnInit} from '@angular/core';
import {GeekService} from "../geek.service";
import {HttpClient} from "@angular/common/http";
import {Bookmark} from "../models";
import {
  animationFrameScheduler,
  auditTime, BehaviorSubject,
  distinctUntilChanged,
  filter, finalize,
  fromEvent,
  map, merge,
  observeOn,
  startWith, Subject, switchMap, takeUntil, tap
} from "rxjs";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  constructor(private http: HttpClient){}
  bookmarks: Bookmark[] = [];
  private isNearBottom(): boolean {
    const threshold = 100; // Pixels from bottom
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    return position > height - threshold;
  }
  public loading$ = new BehaviorSubject<boolean>(false);
  public noMoreData$ = new Subject<void>();
  private destroy$ = new Subject<void>();
  private page = 0;
  private getbookmarks(page: number) {
    return this.http.get<Bookmark[]>(`http://localhost:8800/bookmark/bookmarks?page=${page}`);
  }
  ngOnInit(): void {


    const scrollEvent$ = fromEvent(window, 'scroll');

    scrollEvent$
      .pipe(
        startWith(null),
        auditTime(50), // Prevent excessive event triggering
        observeOn(animationFrameScheduler),
        map(() => this.isNearBottom()),
        distinctUntilChanged(), // Emit only when near-bottom state changes
        filter((isNearBottom) => isNearBottom && !this.loading$.value),
        tap(() => this.loading$.next(true)),
        switchMap(() =>
          this.getbookmarks(++this.page)
            .pipe(
              tap((bookmarks) => {
                if (bookmarks.length === 0) this.noMoreData$.next();
              }),
              finalize(() => this.loading$.next(false))
            )
        ),
        takeUntil(merge(this.destroy$, this.noMoreData$))
      )
      .subscribe((bookmarks) => {
        bookmarks.sort((a, b) => b.id - a.id);
        this.bookmarks = [...this.bookmarks, ...bookmarks];
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  refreshAndScrollToTop() {
    this.page = 1;
    this.bookmarks = [];
    this.loading$.next(true);
    this.noMoreData$.complete();
    window.scrollTo(0, 0);
    this.getbookmarks(this.page).subscribe((bookmarks) => {
      this.loading$.next(false);
      this.bookmarks = bookmarks;
    });
  }


}
