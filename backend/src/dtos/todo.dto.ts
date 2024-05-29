import { IsBoolean, IsOptional, IsString } from "class-validator"
import { Todo } from "../models/todo.model";

export class TodoCreationDTO implements Omit<Todo, 'id' | 'done'> {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class TodoUpdateDTO implements Omit<Todo, 'id'> {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    done?: boolean;
}