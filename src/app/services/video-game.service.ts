import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VideoGame {
  _id: string;
  title: string;
  genre: string;
  platform: string;
  releaseYear: number;
  rating: number;
  description: string;
  imageUrl: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {
  private readonly API_URL = 'http://evaluacion.ctradmin.com/video-games';

  constructor(private http: HttpClient) {}

  // Como los endpoints no existen, simulamos las respuestas
  getVideoGames(): Observable<VideoGame[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const mockGames: VideoGame[] = [
          {
            _id: '1',
            title: 'The Legend of Zelda: Breath of the Wild',
            genre: 'Action-Adventure',
            platform: 'Nintendo Switch',
            releaseYear: 2017,
            rating: 9.3,
            description: 'An epic adventure in the kingdom of Hyrule.',
            imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
            price: 59.99
          },
          {
            _id: '2',
            title: 'God of War',
            genre: 'Action',
            platform: 'PlayStation 4',
            releaseYear: 2018,
            rating: 9.1,
            description: 'Kratos and his son embark on a journey through Norse mythology.',
            imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
            price: 49.99
          },
          {
            _id: '3',
            title: 'Cyberpunk 2077',
            genre: 'RPG',
            platform: 'PC',
            releaseYear: 2020,
            rating: 7.8,
            description: 'An open-world RPG set in the futuristic Night City.',
            imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
            price: 39.99
          },
          {
            _id: '4',
            title: 'Super Mario Odyssey',
            genre: 'Platform',
            platform: 'Nintendo Switch',
            releaseYear: 2017,
            rating: 9.2,
            description: 'Mario embarks on a massive, globe-trotting 3D adventure.',
            imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400',
            price: 54.99
          },
          {
            _id: '5',
            title: 'Elden Ring',
            genre: 'Action RPG',
            platform: 'Multi-platform',
            releaseYear: 2022,
            rating: 9.5,
            description: 'A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R.R. Martin.',
            imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
            price: 69.99
          }
        ];
        observer.next(mockGames);
        observer.complete();
      }, 800);
    });
  }

  getVideoGameById(id: string): Observable<VideoGame> {
    return new Observable(observer => {
      setTimeout(() => {
        // Simulamos la búsqueda por ID
        const allGames: VideoGame[] = [
          {
            _id: '1',
            title: 'The Legend of Zelda: Breath of the Wild',
            genre: 'Action-Adventure',
            platform: 'Nintendo Switch',
            releaseYear: 2017,
            rating: 9.3,
            description: 'An epic adventure in the kingdom of Hyrule where Link awakens from a deep slumber to a world in ruins. Players can explore vast landscapes, solve puzzles, and battle enemies in this masterpiece.',
            imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
            price: 59.99
          },
          {
            _id: '2',
            title: 'God of War',
            genre: 'Action',
            platform: 'PlayStation 4',
            releaseYear: 2018,
            rating: 9.1,
            description: 'Kratos and his son Atreus embark on a deeply personal journey through the Norse realms. This reboot brings emotional depth and stunning visuals to the beloved franchise.',
            imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
            price: 49.99
          },
          {
            _id: '3',
            title: 'Cyberpunk 2077',
            genre: 'RPG',
            platform: 'PC',
            releaseYear: 2020,
            rating: 7.8,
            description: 'An open-world RPG set in the futuristic Night City. Customize your character and make choices that shape the story in this immersive cyberpunk world.',
            imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
            price: 39.99
          },
          {
            _id: '4',
            title: 'Super Mario Odyssey',
            genre: 'Platform',
            platform: 'Nintendo Switch',
            releaseYear: 2017,
            rating: 9.2,
            description: 'Mario embarks on a massive, globe-trotting 3D adventure with his new ally Cappy. Explore amazing worlds and possess enemies and objects with Cappy\'s power.',
            imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400',
            price: 54.99
          },
          {
            _id: '5',
            title: 'Elden Ring',
            genre: 'Action RPG',
            platform: 'Multi-platform',
            releaseYear: 2022,
            rating: 9.5,
            description: 'A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R.R. Martin. Explore the Lands Between and uncover its mysteries.',
            imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400',
            price: 69.99
          }
        ];

        const game = allGames.find(g => g._id === id);
        if (game) {
          observer.next(game);
        } else {
          observer.error('Game not found');
        }
        observer.complete();
      }, 600);
    });
  }
}
