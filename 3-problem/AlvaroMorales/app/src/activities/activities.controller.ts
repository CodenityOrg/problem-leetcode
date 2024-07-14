import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
    Req,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation } from '@nestjs/swagger';

  @ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
    
    //post create
    @Post()
    @ApiOperation({summary: "create a new activities"})
    create(){}

    // get optener todas la actividades
    @Get()
    @ApiOperation({summary: "all activities"})
    findAll(){}

    // get optener el detalle de la actividad
    @Get(":id")
    @ApiOperation({summary: "one activities"})
    findOne(@Param('id') id: string){}

    // put actualizar la actividad
    @Put(":id")
    @ApiOperation({summary: "update activities"})
    update(){}

    //  delete eliminar la actividad
    @Delete(":id")
    @ApiOperation({summary: "update activities"})
    delete(@Param('id') id: string){}
}
