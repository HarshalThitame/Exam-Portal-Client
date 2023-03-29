import { Injectable } from '@angular/core';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private images: Image[] = [
    {
      imageDesciption: 'Haruhi Suzumiya',
      image:
        'https://vignette.wikia.nocookie.net/suzumiya-sos-brigade/images/7/7f/Longhairharuhi.png/revision/latest?cb=20090824171015&path-prefix=de',
    },
    {
      imageDesciption: 'Yuki Nagato',
      image:
        'https://i.pinimg.com/originals/b9/46/40/b9464001356a32be3dd5120dbddd73de.jpg',
    },
    {
      imageDesciption: 'Fuyuno Haruaki',
      image:
        'https://cutewallpaper.org/21/waifu-background/Cant-hear-anything-must-be-that-deaf-bitch-again-.png',
    },
  ];

  getImages() {
    return this.images.slice();
  }

  constructor() {}
}
