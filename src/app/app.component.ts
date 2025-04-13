import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './core/components/banner/banner.component';
import { MoviesService } from './shared/services/movies.service';
import { MovieCuroselComponent } from './shared/components/movie-curosel/movie-curosel.component';
import { IVideoContent } from './shared/models/video-content.interface';
import { DescriptionPipe } from './shared/pipes/description.pipe';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    BannerComponent,
    MovieCuroselComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'netflix';
  movies = inject(MoviesService);

  constructor() {}
  myMovies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlaying: IVideoContent[] = [];
  popular: IVideoContent[] = [];
  topRated: IVideoContent[] = [];
  upComing: IVideoContent[] = [];
  sources = [
    this.movies.getMovies(),
    this.movies.getTvShows(),
    this.movies.getRatedMovies(),
    this.movies.getNowPlayingMovies(),
    this.movies.getUpcomingMovies(),
    this.movies.getPopularMovies(),
    this.movies.getTopRated(),
  ];

  ngOnInit(): void {
    this.movies.getMovies().subscribe(data => {
      console.log('🎬 Single call result:', data);
    });
    forkJoin(this.sources)
      .pipe(
        map(
          ([
            myMovies,
            tvShows,
            ratedMovies,
            nowPlaying,
            upComing,
            popular,
            topRated,
          ]) => {
            return {
              myMovies,
              tvShows,
              ratedMovies,
              nowPlaying,
              upComing,
              popular,
              topRated,
            };
          }
        )
      )
      .subscribe((res: any) => {
        this.myMovies = res.myMovies.results as any;
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.ratedMovies = res.ratedMovies.results as IVideoContent[];
        this.nowPlaying = res.nowPlaying.results as IVideoContent[];
        this.upComing = res.upComing.results as IVideoContent[];
        this.topRated = res.topRated.results as IVideoContent[];
        this.popular = res.popular.results as IVideoContent[];
        this.getMovieKey()
      });
  }

  getMovieKey() {
    this.movies.getBannerVideo(this.myMovies[0].id)
    .subscribe(res=>{
      console.log(res);
    })
  }
  // ngOnInit(): void {
  //   this.movies.getMovies().subscribe((res) => {
  //     this.myMovies = res.results;
  //   });
    
  // }
}
