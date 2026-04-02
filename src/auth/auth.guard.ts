
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
  let authHeader = request.headers['authorization'];

  // If header is an array, take the first element
  if (Array.isArray(authHeader)) {
    authHeader = authHeader[0];
  }

  if (!authHeader) return undefined;

  // Now TypeScript knows authHeader is a string
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim(); // remove 'Bearer ' prefix
  }

  return undefined;
}
}