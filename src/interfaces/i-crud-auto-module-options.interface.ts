import { ICrudRepository } from '@/crud.repository';
import { ICrudService } from '@/crud.service';
import { DeepPartial } from '@Helpers/mapped-types/deep-partial.interface';
import { IAutoCrudOptions } from '@Interfaces/i-crud-module-options.interface';
import { IEndpointsRecipe } from '@Interfaces/i-endpoints-recipe.interface';
import { IPaginatedResult } from '@Interfaces/i-paginated-result.interface';
import { AutomapperProfile } from '@automapper/nestjs';
import { DynamicModule, ForwardReference, Type } from '@nestjs/common';

export interface ICrudAutoModuleOptions extends IAutoCrudOptions {
  autoimportModules?: boolean;
  orm: {
    ormModule: Type<any>;
    ormModuleFor: <Entity>(
      entities: Array<Type<Entity>>,
    ) => Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference;
  };
  crudRepositoryFor: <Entity>(
    target: Type<Entity>,
  ) => Type<ICrudRepository<Entity>>;
  crudProfileFor?: <Entity>(target: Type<Entity>) => Type<AutomapperProfile>;
  crudServiceFor?: <
    Entity,
    TRepository extends ICrudRepository<Entity> = ICrudRepository<Entity>,
    CreateDto = any,
    UpdateDto extends DeepPartial<Entity> = any,
    ReturnDto = Entity,
    PaginatedResultDto extends IPaginatedResult<ReturnDto> = IPaginatedResult<ReturnDto>,
  >(
    target: Type<Entity>,
  ) => Type<
    ICrudService<Entity, CreateDto, UpdateDto, ReturnDto, PaginatedResultDto>
  >;
  crudControllerFor?: <
    Entity,
    CreateDto = any,
    UpdateDto extends DeepPartial<Entity> = any,
    ReturnDto = Entity,
    PaginatedResultDto extends IPaginatedResult<ReturnDto> = IPaginatedResult<ReturnDto>,
    Service extends ICrudService<
      Entity,
      CreateDto,
      UpdateDto,
      ReturnDto,
      PaginatedResultDto
    > = ICrudService<
      Entity,
      CreateDto,
      UpdateDto,
      ReturnDto,
      PaginatedResultDto
    >,
  >(
    target: Type<Entity>,
    endpointsRecipe?: IEndpointsRecipe,
  ) => Type<any>;
}
