import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bookmark, Tag} from "../models";
import {
  animationFrameScheduler,
  auditTime,
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  exhaustMap,
  filter,
  finalize,
  from,
  fromEvent,
  map,
  merge,
  mergeMap,
  observeOn,
  of,
  Subject,
  startWith,
  takeUntil,
  tap,
  Subscription,
  forkJoin
} from "rxjs";
import {marked} from "marked";

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {
  constructor(private http: HttpClient) {}

  // UI state
  bookmarks: Bookmark[] = [];
  tags: Tag[] = [];
  selectedTag: Tag | null = null;
  
  
  private getTags() {
    return this.http.get<Tag[]>(`http://localhost:8800/bookmark/tags`);
  }
  private getAllBookmarkIds() {
    return this.http.get<number[]>(`http://localhost:8800/bookmark/bookmarks/ids`).pipe(
      catchError(() => of<number[]>([]))
    );
  }

  ngOnInit(): void {
    // Load tags and global bookmark ids for 'All' concurrently
    forkJoin({
      tags: this.getTags().pipe(catchError(() => of<Tag[]>([]))),
      allIds: this.getAllBookmarkIds()
    }).subscribe(({ tags, allIds }) => {
      const allTag: Tag = { id: -1, name: 'All', bookmarks: allIds };
      const latestIds = allIds.slice(-10); // Last 10 bookmarks as 'Latest'
      latestIds.sort((a, b) => b - a); // Sort descending by id
      const lastestTag: Tag = { id: -2, name: 'Latest', bookmarks: latestIds };
      this.tags = [allTag, lastestTag, ...tags];
      this.selectTag(lastestTag);
    });
  }

  selectTag(tag: Tag) {
    if (tag === this.selectedTag) return;
    this.selectedTag = tag;
    this.bookmarks = [];

    //convert tag.bookmarks from array to set to remove duplicates
    const uniqueBookmarks = Array.from(new Set(tag.bookmarks));

    // load bookmark by id for all ids in tag.bookmarks
    const bookmarkRequests = uniqueBookmarks.map(id => this.http.get<Bookmark>(`http://localhost:8800/bookmark/bookmarks/${id}`));
    forkJoin(bookmarkRequests).subscribe({
      next: bookmarks => {
        // Render markdown to HTML for each bookmark content
        this.bookmarks = bookmarks.map(b => {
          const rendered = marked.parse(b.content as string);
          // marked.parse might return string or Promise depending on config; normalize.
          if (typeof rendered === 'string') {
            return {...b, content: rendered};
          } else {
            // Fallback async resolution; optimistic empty placeholder first
            rendered.then(html => b.content = html);
            return b;
          }
        });
      },
      error: () => {}
    });
  }
}
