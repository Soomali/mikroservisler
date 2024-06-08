import sys
import os
SIMPLE = 'simple'
COMPLEX = 'complex'
class ResourceGenerator():

  def __init__(self,name:str):
    self.mode = SIMPLE
    if ' ' in name or '-' in name: 
      
      self.mode = COMPLEX
    
    self.lowerName = name.lower()
    self.lowerFileName = name.lower().replace(' ','-') 
    self.lowervariableName = name.replace(' ','-').split('-')[0].lower() + ''.join([i.capitalize() for i in name.replace(' ','-').split('-')[1:]])
    self.capitalizedName = self.lowervariableName[0].upper() +  ''.join(self.lowervariableName[1:])

    self.name = name.replace(' ','-')
    

  def createController(self):
    controllerContent = f"""
import {{ Controller, Get, Post, Body, Patch, Param, Delete }} from '@nestjs/common';
import {{{self.capitalizedName}Service}} from './{self.lowerFileName}.service';
import {{ Create{self.capitalizedName}Dto }} from './dto/create-{self.lowerFileName}.dto';
import {{ Update{self.capitalizedName}Dto }} from './dto/update-{self.lowerFileName}.dto';

@Controller('{self.lowerFileName}')
export class {self.capitalizedName}Controller {{
  constructor(private readonly {self.lowervariableName}Service: {self.capitalizedName}Service) {{}}

  @Post()
  create(@Body() create{self.capitalizedName}Dto: Create{self.capitalizedName}Dto) {{
    return this.{self.lowervariableName}Service.create(create{self.capitalizedName}Dto);
  }}

  @Get()
  findAll() {{
    return this.{self.lowervariableName}Service.findAll();
  }}

  @Get(':id')
  findOne(@Param('id') id: string) {{
    return this.{self.lowervariableName}Service.findOne(id);
  }}

  @Patch(':id')
  update(@Param('id') id: string, @Body() update{self.capitalizedName}Dto: Update{self.capitalizedName}Dto) {{
    return this.{self.lowervariableName}Service.update(id, update{self.capitalizedName}Dto);
  }}

  @Delete(':id')
  remove(@Param('id') id: string) {{
    return this.{self.lowervariableName}Service.remove(id);
  }}
}}   
    """
    return controllerContent

  def createCreateDto(self):
    content = f"""
export class Create{self.capitalizedName}Dto {{}}
    """
    return content

  def createUpdateDto(self):
    content = f"""
import {{ PartialType }} from '@nestjs/mapped-types';
import {{ Create{self.capitalizedName}Dto }} from './create-{self.lowerName}.dto';

export class Update{self.capitalizedName}Dto extends PartialType(Create{self.capitalizedName}Dto) {{}}

    """
    return content
  def createService(self):
    content = f"""
    import {{ Injectable }} from "@nestjs/common";
import {{ Create{self.capitalizedName}Dto }} from "./dto/create-{self.lowerFileName}.dto";
import {{ Update{self.capitalizedName}Dto }} from "./dto/update-{self.lowerFileName}.dto";
import {{ InjectModel }} from "@nestjs/mongoose";
import {{{self.capitalizedName}}} from "./schema/{self.lowerFileName}.schema";
import {{ Model }} from "mongoose";

@Injectable()
export class {self.capitalizedName}Service {{

  constructor(@InjectModel({self.capitalizedName}.name) private readonly {self.lowervariableName}Model: Model<{self.capitalizedName}>) {{ }}

  create(create{self.capitalizedName}Dto: Create{self.capitalizedName}Dto) {{
    return this.{self.lowervariableName}Model.create(create{self.capitalizedName}Dto);
  }}

  findAll() {{
    return this.{self.lowervariableName}Model.find({{}});
  }}

  findOne(id: string) {{
    return this.{self.lowervariableName}Model.findById(id);
  }}

  update(id: string, update{self.capitalizedName}Dto: Update{self.capitalizedName}Dto) {{
    return this.{self.lowervariableName}Model.findByIdAndUpdate(id, update{self.capitalizedName}Dto);
  }}

  remove(id: string) {{
    return this.{self.lowervariableName}Model.findByIdAndDelete(id);
  }}
}} 
    """
    return content
  def createModule(self):
    content = f"""
import {{ Module }} from "@nestjs/common";
import {{ MongooseModule }} from "@nestjs/mongoose";
import {{ {self.capitalizedName}Controller }} from "./{self.lowerFileName}.controller";
import {{ {self.capitalizedName}Service }} from "./{self.lowerFileName}.service";
import {{ {self.capitalizedName}, {self.capitalizedName}Schema }} from "./schema/{self.lowerFileName}.schema";

@Module({{
  controllers: [{self.capitalizedName}Controller],
  imports: [
    MongooseModule.forFeature([{{ name: {self.capitalizedName}.name, schema: {self.capitalizedName}Schema }}])
  ],
  providers: [{self.capitalizedName}Service],
}})
export class {self.capitalizedName}Module {{ }}
    
    """
    return content
  def createSchema(self):
    content = f"""
import {{ Schema, SchemaFactory }} from '@nestjs/mongoose';
import {{ HydratedDocument }} from 'mongoose';

export type {self.capitalizedName}Document = HydratedDocument<{self.capitalizedName}>;


@Schema()
export class {self.capitalizedName} {{
  
}}

export const {self.capitalizedName}Schema = SchemaFactory.createForClass({self.capitalizedName});

    
    """
    return content 
  

  def updateTestModuleContent(self,content):
    
    sp = content.split('imports: [')
    testModuleAddedContent = sp[0] + f'imports: [ \n      {self.capitalizedName}Module,' + 'imports: ['.join(sp[1:])
    sp2 = testModuleAddedContent.split('@Module')
    updatedModuleContent = sp2[0].strip() + f"\nimport {{{self.capitalizedName}Module}} from './{self.name}/{self.name}.module'\n\n @Module" + ''.join(sp2[1])
    return updatedModuleContent 
  


class FileWriter():
  def __init__(self,name,generator:ResourceGenerator):
    self.name = name.replace(' ','-')
    self.generator = generator
  
  def create(self):
    os.chdir('src')
    os.mkdir(self.name)
    os.chdir(self.name)
    os.mkdir('dto')
    os.mkdir('schema')
    self.createSchema()
    self.createCreateDto()
    self.createUpdateDto()
    self.createService()
    self.createModule()
    self.createController()
    os.chdir('..')
    self.updateAppModule()

  def createService(self):
    with open(f'{self.name}.service.ts','w') as f:
      f.write(self.generator.createService())
  def createModule(self):
    with open(f'{self.name}.module.ts','w') as f:
      f.write(self.generator.createModule())
  def createController(self):
    with open(f'{self.name}.controller.ts','w') as f:
      f.write(self.generator.createController())
  def createSchema(self):
    with open(f'schema/{self.name}.schema.ts','w') as f:
      f.write(self.generator.createSchema())
  def createCreateDto(self):
    with open(f'dto/create-{self.name}.dto.ts','w') as f:
      f.write(self.generator.createCreateDto())
  def createUpdateDto(self):
    with open(f'dto/update-{self.name}.dto.ts','w') as f:
      f.write(self.generator.createUpdateDto())
  
  def updateAppModule(self):
    content = ''
    with open('app.module.ts','r') as f:
      content = f.read()
    with open('app.module.ts','w') as f:
      f.write(self.generator.updateTestModuleContent(content))

if __name__ == '__main__':
  name = ' '.join(sys.argv[1:])
  generator = ResourceGenerator(name)
  writer = FileWriter(name,generator)

  writer.create()