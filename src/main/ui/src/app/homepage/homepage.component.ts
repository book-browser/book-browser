import { Component, OnInit } from '@angular/core';
import { BookRelease } from '../entity/book-release';
import { ReleaseService } from '../service/release.service';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  releases: BookRelease[];

  constructor(private releaseService: ReleaseService) { }

  ngOnInit() { 
    this.releaseService.getReleases().subscribe((releases) => {
      this.releases = releases;
    })
  }
}
