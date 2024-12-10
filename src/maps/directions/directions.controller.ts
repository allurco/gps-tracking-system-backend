import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
    constructor(private readonly directionsService: DirectionsService) {}

	@Get()
	getDirections(
		@Query('origin') origin: string,
		@Query('destination') destination: string,
	) {
		return this.directionsService.getDirections(origin, destination);
	}
}
