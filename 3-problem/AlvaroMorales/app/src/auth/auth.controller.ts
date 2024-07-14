import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  @ApiOperation({summary: "login of user"})
  @Post('login')
  async login(@Request() req) {
    // return this.authService.login(req.user);
  }

  @ApiOperation({summary: "register of user"})
  @Post('register')
  async register(@Body() body: { username: string, password: string }) {
    // return this.authService.register(body.username, body.password);
  }
}
