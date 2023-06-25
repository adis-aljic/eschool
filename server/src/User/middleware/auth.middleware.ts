import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { ExpressRequest } from "../globalType/expressRequest.interface";
import { verify } from "jsonwebtoken";
import { JWT } from "src/config";
import { UserService } from "../user.service";

@Injectable()
export class AuthMidleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }
    async use(req: ExpressRequest, _: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }
        const token = req.headers.authorization

        try {

            const decode = verify(token, JWT) as any
            const user = await this.userService.findById(decode.id)
            req.user = user
            next()

        } catch (error) {
            req.user = null
            next()
        }

    }
}
