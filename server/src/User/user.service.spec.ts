import {Test} from "@nestjs/testing"
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";

const mockUserRepository = () => ({
    recievedNewPass : jest.fn()
})
const mockUser = {
    email : "Test@test.com"
}
const mockDb = {
    email : "Test@test.com"
}
describe("UserServices", ()=>{
let userRepository;
let userService;

beforeEach(async()=>{
    const module = await Test.createTestingModule({
        providers: [UserService, {provide : userRepository, useFactory: mockUserRepository}],
    }).compile();
    userService = await module.get<UserService>(UserService)
    userRepository : await module.get<UserEntity>(userRepository)
})
describe("recievedNewPass", ()=>{
it("user does not exist", ()=> {
    userService.recievedNewPass(mockUser.email)
    expect(userRepository.recievedNewPass).toBeTruthy()
})
})


})