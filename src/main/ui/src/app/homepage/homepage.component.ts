import { Component, OnInit } from '@angular/core';
import { BookRelease } from '../entity/book-release';
import { ReleaseService } from '../service/release.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  releases: BookRelease[][];

  constructor(private releaseService: ReleaseService) { }

  ngOnInit() { 
    this.releaseService.getReleases().subscribe((releases) => {
      this.releases = [];
      for (var i = 0; i < releases.length / 15; i++) {
        this.releases.push(releases.slice(i * 15, (i + 1) * 15));
      }
    })
  }
}
