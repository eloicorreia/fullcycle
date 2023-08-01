#!/bin/sh

npm run cti create './src/@seedwork/application' -- -i '*spec.ts' -q '"' -b && 
npm run cti create './src/@seedwork/domain' -- -i '*spec.ts' -e 'tests' -q '"' -b && 
npm run cti create './src/@seedwork/infra' -- -i '*spec.ts' -i 'migrator-cli.ts' -q '"' -b && 

npm run cti create './src/category/application' -- -i '*spec.ts' -q '"' -b && 
npm run cti create './src/category/domain' -- -i '*spec.ts' -q '"' -b && 
npm run cti create './src/category/infra' -- -i '*spec.ts' -q '"' -b

npm run cti create './src/cast-member/application' -- -i '*spec.ts' -q '"' -b && 
npm run cti create './src/cast-member/domain' -- -i '*spec.ts' -q '"' -b && 
npm run cti create './src/cast-member/infra' -- -i '*spec.ts' -q '"' -b

npm run cti create './src/genre/application' -- -i '*spec.ts' -q '"' -b && 
npm run cti create './src/genre/domain' -- -i '*spec.ts' -q '"' -b && 
npm run cti create './src/genre/infra' -- -i '*spec.ts' -q '"' -b