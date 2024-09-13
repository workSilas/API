import { Express } from "express";
const api = Express() 

api.listen(3030, () => console.log('Api subiu na porta 3030') )

api.get('/')