import { IsNotEmpty, IsArray, IsUrl } from 'class-validator';

export class CreateKeyDto {
  @IsNotEmpty()
  @IsArray()
  @IsUrl({ require_protocol: false }, { each: true })
  allowed_domains: string[];
}

export class UpdateKeyDto {
  @IsNotEmpty()
  key: string;

  @IsArray()
  @IsUrl({ require_protocol: false }, { each: true })
  allowed_domains: string[];
}
