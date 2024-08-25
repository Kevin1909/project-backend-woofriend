import { PartialType } from '@nestjs/mapped-types';
import { CreateFormAdoptionDto } from './create-form-adoption.dto';

export class UpdateFormAdoptionDto extends PartialType(CreateFormAdoptionDto) {}
