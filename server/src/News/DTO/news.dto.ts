import { IsNotEmpty, MaxLength, max } from "class-validator"

export class CreateNewsDTO {
    @IsNotEmpty()
    readonly  url : string
    
    @IsNotEmpty()
    readonly title: string
    
    @IsNotEmpty()
    @MaxLength(400)
   readonly text : string

   @IsNotEmpty()
   readonly classId : number

   @IsNotEmpty()
   readonly school : string

   @IsNotEmpty()
   readonly schoolClass : string

   @IsNotEmpty()
   readonly departmant : string

   @IsNotEmpty()
   readonly city : string

    @IsNotEmpty()
    readonly user : object

}