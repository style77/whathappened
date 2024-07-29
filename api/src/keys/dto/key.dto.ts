import { IsNotEmpty, IsArray, IsUrl } from 'class-validator'

export class CreateKeyDto {
    @IsNotEmpty()
    @IsArray()
    @IsUrl({}, { each: true })
    allowed_domains: string[];
}

export class UpdateKeyDto {
    @IsNotEmpty()
    key: string;

    @IsArray()
    @IsUrl({}, { each: true })
    allowed_domains: string[];
}