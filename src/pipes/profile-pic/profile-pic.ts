import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../models/models';

@Pipe({
  name: 'profilePic',
})
export class ProfilePicPipe implements PipeTransform {
  
  transform(value: User, size) {
    if (value) {
      if (value.photoURL) {
        if (size === 'large') {
          if (value.providerData && value.providerData.providerId === 'facebook.com') {
            return `https://graph.facebook.com/${value.providerData.uid}/picture?type=large`;
          }
        } else if (typeof size === 'number') {
          return `https://graph.facebook.com/${value.providerData.uid}/picture?width=${size}`;
        }
        return value.photoURL;
      } else if (value.gender && value.gender === 'female') {
        return '/assets/imgs/girl.svg';
      } else {
        return '/assets/imgs/boy.svg';
      }
    } else {
      return '/assets/imgs/boy.svg';
    }
  }
}
