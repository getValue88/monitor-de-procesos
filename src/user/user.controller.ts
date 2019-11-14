import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    public constructor(private readonly userService: UserService) { }

    @Post('/login')
    login(@Body() uData:any) {
        return this.userService.login(uData);
    }

}
