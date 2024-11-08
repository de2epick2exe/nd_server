import request from 'supertest'
import  app  from '../main'

describe('/',()=>{
    it('Check connection ', async()=>{
        const res = await request(app.callback()).get('/')        
        expect(res.statusCode).toBe(200)
                
    })
})
 