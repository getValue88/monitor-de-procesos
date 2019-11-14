import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    public constructor(private readonly userService: UserService) { }

    @Post('/login')
    login(@Body() uData:any) {
        return this.userService.login(uData);
    }

    @Get('company/:userId')
    getCompany(@Param('userId') userId) {
        return this.userService.getCompany(userId);
    }
}
