import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RouteDriverService {
    constructor(private prismaService: PrismaService) {}

    async processRoute(dto: { route_id: string; lat: number; lng: number }) {
        return await this.prismaService.routeDriver.upsert({
            where: { route_id: dto.route_id },
            update: {
                points: {
                    push: {
                        location: {
                            lat: dto.lat,
                            lng: dto.lng,
                        },
                    },
                },
            },
            create: {
                route_id: dto.route_id,
                points: {
                    set: {
                        location: {
                            lat: dto.lat,
                            lng: dto.lng,
                        },
                    },
                },
            },
        });
    }
}
