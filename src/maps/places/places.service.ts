import { Injectable } from '@nestjs/common';
import {
  Client as GoogleMapsClient,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';

@Injectable()
export class PlacesService {
  constructor(private googleMapsClient: GoogleMapsClient) {}
  async findPlaces(text: string) {
    console.log(text);
    try {
      const { data } = await this.googleMapsClient.findPlaceFromText({
        params: {
          input: text,
          inputtype: PlaceInputType.textQuery,
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          key: 'AIzaSyBAl7zi3y37oDv0mTBKKU4dyT7S2mmPwTA',
        },
      });

      return data;
    } catch (error) {
      console.log(error);
      if (error.response.status == '404') {
        return error;
      }
    }
  }
}
